import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

interface SuccessPageProps {
  sessionId?: string;
  invoiceNumber?: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ sessionId, invoiceNumber }) => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch order details using the session ID
    // For now, we'll simulate this
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setOrderDetails({
          invoiceNumber: invoiceNumber || 'RO123456ABC',
          customerEmail: 'customer@example.com',
          customerPhone: '9876543210',
          totalAmount: 2490,
        });
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId, invoiceNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. Your fresh fruits are on their way!
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <Package className="w-6 h-6 mr-2" />
              Order Confirmation
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Invoice Number:</span>
                <span className="font-bold text-green-800 text-lg">{orderDetails?.invoiceNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-700">Total Amount:</span>
                <span className="font-bold text-green-800">₹{orderDetails?.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Confirmation email sent to {orderDetails?.customerEmail}</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>SMS updates will be sent to +91 {orderDetails?.customerPhone}</span>
                </li>
                <li className="flex items-start">
                  <Package className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Order will be processed and packed within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Delivery partner will contact you before delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">Track Your Order</h3>
              <p className="text-yellow-700 mb-3">
                Use your invoice number <strong>{orderDetails?.invoiceNumber}</strong> and mobile number 
                <strong> +91 {orderDetails?.customerPhone}</strong> to track your order status.
              </p>
              <button 
                onClick={() => window.location.href = '/#track'}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Track Order Now
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Continue Shopping
              </button>
              
              <button
                onClick={() => window.print()}
                className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-colors"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;