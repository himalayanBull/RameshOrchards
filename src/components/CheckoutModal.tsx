import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onAuthRequired }) => {
  const { items, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    // Check if Stripe is properly configured
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    
    if (!stripeKey || stripeKey === 'pk_test_placeholder' || !supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
      setError('Payment system is not configured yet. Please set up Stripe and Supabase first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This will be implemented once Supabase is properly connected
      setError('Checkout will be available once Supabase and Stripe are configured.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.packageSize}`} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({item.packageSize}kg × {item.quantity})
                    </span>
                  </div>
                  <span className="font-semibold">
                    ${(item.product.pricePerKg * item.packageSize * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-green-700">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!user && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
              Please sign in to continue with checkout.
            </div>
          )}

          {/* Setup Notice */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">
              <strong>Setup Required:</strong> Connect to Supabase and configure Stripe to enable payments.
            </p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={loading || !user}
            className="w-full bg-green-700 text-white py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>{loading ? 'Processing...' : 'Setup Payment System'}</span>
            <Lock className="h-4 w-4" />
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment will be powered by Stripe once configured.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;