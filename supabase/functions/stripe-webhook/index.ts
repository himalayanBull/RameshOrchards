import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')
  const body = await request.text()
  
  let receivedEvent
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message)
    return new Response(err.message, { status: 400 })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  console.log(`🔔  Webhook received: ${receivedEvent.type}`)

  if (receivedEvent.type === 'checkout.session.completed') {
    const session = receivedEvent.data.object as Stripe.Checkout.Session
    
    try {
      // Update order status to processing
      const { error: updateError } = await supabaseClient
        .from('orders')
        .update({ 
          status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_session_id', session.id)

      if (updateError) {
        console.error('Error updating order:', updateError)
        return new Response('Error updating order', { status: 500 })
      }

      // Send confirmation email (you can implement this using a service like Resend)
      const invoiceNumber = session.metadata?.invoice_number
      const customerEmail = session.customer_email
      
      if (invoiceNumber && customerEmail) {
        // TODO: Implement email sending
        console.log(`📧 Should send confirmation email to ${customerEmail} for invoice ${invoiceNumber}`)
        
        // You can integrate with email services like:
        // - Resend
        // - SendGrid
        // - Amazon SES
        // - Mailgun
        
        // Example with Resend:
        // await sendConfirmationEmail(customerEmail, invoiceNumber, orderDetails)
      }

      console.log(`✅  Order updated for session: ${session.id}`)
    } catch (error) {
      console.error('Error processing webhook:', error)
      return new Response('Error processing webhook', { status: 500 })
    }
  }

  if (receivedEvent.type === 'checkout.session.expired') {
    const session = receivedEvent.data.object as Stripe.Checkout.Session
    
    // Update order status to cancelled if payment session expired
    const { error } = await supabaseClient
      .from('orders')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_session_id', session.id)

    if (error) {
      console.error('Error cancelling expired order:', error)
    } else {
      console.log(`❌  Order cancelled for expired session: ${session.id}`)
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})