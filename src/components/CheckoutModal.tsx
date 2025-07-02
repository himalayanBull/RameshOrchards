import React, { useState } from 'react';
import { X, CreditCard, Lock, User, Mail, MapPin, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { stripePromise } from '../lib/stripe';
import { supabase } from '../lib/supabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Himachal Pradesh',
    pincode: '',
  });

  if (!isOpen) return null;

  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `RO${timestamp}${random}`;
  };

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.pincode) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone number (Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      setError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }

    // Validate pincode (Indian pincode)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(customerInfo.pincode)) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    setStep('payment');
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Check if Stripe is configured
      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey || stripePublishableKey === 'pk_test_placeholder') {
        throw new Error('Payment system is not configured. Please contact support.');
      }

      // Generate invoice number
      const invoice = generateInvoiceNumber();

      // Create order in database first (with pending status)
      const orderData = {
        invoice_number: invoice,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        delivery_address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`,
        total_amount: getTotalPrice() * 83, // Convert to INR
        status: 'pending',
        order_items: items.map(item => ({
          product_name: item.product.name,
          product_id: item.product.id,
          price_per_kg: item.product.pricePerKg * 83,
          package_size: item.packageSize,
          quantity: item.quantity,
          subtotal: item.product.pricePerKg * item.packageSize * item.quantity * 83
        }))
      };

      // Create checkout session via Supabase Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          orderData,
          items: items.map(item => ({
            product_id: item.product.id,
            name: item.product.name,
            price: item.product.pricePerKg * item.packageSize * 83, // INR price
            quantity: item.quantity,
            package_size: item.packageSize,
          })),
          customer_info: customerInfo,
        },
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // If we reach here, payment was successful
      setInvoiceNumber(invoice);
      clearCart();
      setStep('success');

    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const resetModal = () => {
    setStep('details');
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'Himachal Pradesh',
      pincode: '',
    });
    setError('');
    setInvoiceNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={resetModal} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'details' && 'Delivery Details'}
                {step === 'payment' && 'Secure Payment'}
                {step === 'success' && 'Order Confirmed!'}
              </h2>
              {step !== 'success' && (
                <p className="text-sm text-gray-600 mt-1">
                  Step {step === 'details' ? '1' : '2'} of 2
                </p>
              )}
            </div>
            <button
              onClick={resetModal}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Customer Details */}
          {step === 'details' && (
            <form onSubmit={handleCustomerInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Required for order tracking and delivery updates</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Order confirmation and invoice will be sent here</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="House/Flat number, Street name, Landmark"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    value={customerInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Chandigarh">Chandigarh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="6-digit PIN"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Order Summary</h3>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.packageSize}`} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-gray-500 ml-2">
                        ({item.packageSize}kg × {item.quantity})
                      </span>
                    </div>
                    <span className="font-semibold">
                      ₹{(item.product.pricePerKg * item.packageSize * item.quantity * 83).toFixed(0)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-green-700">
                    ₹{(getTotalPrice() * 83).toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Customer Details Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Details</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {customerInfo.name}</p>
                  <p><strong>Phone:</strong> +91 {customerInfo.phone}</p>
                  <p><strong>Email:</strong> {customerInfo.email}</p>
                  <p><strong>Address:</strong> {customerInfo.address}, {customerInfo.city}, {customerInfo.state} - {customerInfo.pincode}</p>
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="text-green-700 text-sm font-medium mt-2 hover:text-green-800"
                >
                  Edit Details
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Final Order Summary</h3>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.packageSize}`} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({item.packageSize}kg × {item.quantity})
                      </span>
                    </div>
                    <span className="font-semibold">
                      ₹{(item.product.pricePerKg * item.packageSize * item.quantity * 83).toFixed(0)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount:</span>
                  <span className="text-lg font-bold text-green-700">
                    ₹{(getTotalPrice() * 83).toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Secure Payment</h4>
                <p className="text-sm text-blue-700">
                  You will be redirected to Stripe's secure payment page. Your payment information is encrypted and secure.
                  After successful payment, you'll receive an email confirmation with your invoice number.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-700 text-white py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>{loading ? 'Redirecting to Payment...' : 'Pay Securely with Stripe'}</span>
                <Lock className="h-4 w-4" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                By proceeding, you agree to our terms of service. Payment will only be processed after successful verification.
              </p>
            </div>
          )}

          {/* Step 3: Success (This will rarely be shown as user gets redirected to Stripe) */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your order has been confirmed and we'll start preparing your fresh fruits.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Your Invoice Number</h4>
                <div className="text-3xl font-bold text-green-700 mb-4">{invoiceNumber}</div>
                <p className="text-sm text-green-700">
                  Save this invoice number along with your mobile number to track your order. 
                  Confirmation email has been sent to {customerInfo.email}.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• Email confirmation sent to {customerInfo.email}</li>
                  <li>• SMS updates will be sent to +91 {customerInfo.phone}</li>
                  <li>• Order will be processed within 24 hours</li>
                  <li>• Track your order using invoice number + mobile number</li>
                  <li>• Delivery partner will contact you before delivery</li>
                </ul>
              </div>

              <button
                onClick={resetModal}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;