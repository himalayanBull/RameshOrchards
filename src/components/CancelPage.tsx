import React from 'react';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

interface CancelPageProps {
  invoiceNumber?: string;
}

const CancelPage: React.FC<CancelPageProps> = ({ invoiceNumber }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Cancel Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-lg text-gray-600">
              Your payment was cancelled. No charges have been made to your account.
            </p>
          </div>

          {/* Information */}
          {invoiceNumber && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Order Status</h2>
              <p className="text-yellow-700">
                Order <strong>{invoiceNumber}</strong> has been cancelled due to payment cancellation. 
                Your items are still available in our inventory.
              </p>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Need Help?
            </h3>
            <div className="text-blue-700 space-y-2">
              <p>If you experienced any issues during payment, please:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Check your internet connection and try again</li>
                <li>Ensure your payment method has sufficient funds</li>
                <li>Contact your bank if the payment was declined</li>
                <li>Reach out to our support team for assistance</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">Contact Support</h3>
            <div className="text-gray-700 space-y-2">
              <p><strong>Email:</strong> hello@rameshorchards.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Hours:</strong> Monday - Saturday, 9 AM - 6 PM</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Shopping
            </button>
            
            <button
              onClick={() => window.location.href = '/#contact'}
              className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;