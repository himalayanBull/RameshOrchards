import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    })

    const { orderData, items, customer_info } = await req.json()

    // Create order in database first
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        invoice_number: orderData.invoice_number,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        delivery_address: orderData.delivery_address,
        total_amount: orderData.total_amount,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Create order items
    const orderItems = orderData.order_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price_per_kg: item.price_per_kg,
      package_size: item.package_size,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }))

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      throw new Error(`Failed to create order items: ${itemsError.message}`)
    }

    // Create line items for Stripe (convert INR to USD for Stripe)
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} (${item.package_size}kg)`,
          description: `Fresh ${item.name} from RameshOrchards - Premium Quality`,
        },
        unit_amount: Math.round((item.price / 83) * 100), // Convert INR to USD cents
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: customer_info.email,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&invoice=${orderData.invoice_number}`,
      cancel_url: `${req.headers.get('origin')}/cancel?invoice=${orderData.invoice_number}`,
      metadata: {
        order_id: order.id,
        invoice_number: orderData.invoice_number,
        customer_phone: customer_info.phone,
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
    })

    // Update order with Stripe session ID
    await supabaseClient
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Checkout session error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})