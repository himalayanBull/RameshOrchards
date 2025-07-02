import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  customerName: string;
  totalAmount: number;
  orderDate: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
    packageSize: number;
  }>;
  trackingSteps: Array<{
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }>;
}

const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrackOrder = async () => {
    if (!invoiceNumber.trim()) {
      setError('Please enter your invoice number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call to fetch order status
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock order data - replace with actual API call
      const mockOrder: OrderStatus = {
        id: invoiceNumber,
        status: 'shipped',
        customerName: 'John Doe',
        totalAmount: 2490,
        orderDate: '2024-01-15',
        estimatedDelivery: '2024-01-18',
        items: [
          { name: 'Royal Delicious Apples', quantity: 2, packageSize: 5 },
          { name: 'Santa Rosa Plums', quantity: 1, packageSize: 10 },
        ],
        trackingSteps: [
          {
            status: 'Order Placed',
            description: 'Your order has been received and confirmed',
            timestamp: '2024-01-15 10:30 AM',
            completed: true,
          },
          {
            status: 'Processing',
            description: 'Fresh fruits are being carefully selected and packed',
            timestamp: '2024-01-15 02:15 PM',
            completed: true,
          },
          {
            status: 'Shipped',
            description: 'Your order is on the way with our delivery partner',
            timestamp: '2024-01-16 09:45 AM',
            completed: true,
          },
          {
            status: 'Out for Delivery',
            description: 'Your order will be delivered today',
            timestamp: 'Expected: 2024-01-18 11:00 AM',
            completed: false,
          },
        ],
      };

      setOrderStatus(mockOrder);
    } catch (err) {
      setError('Order not found. Please check your invoice number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    }

    switch (status) {
      case 'Order Placed':
        return <Package className="h-6 w-6 text-blue-600" />;
      case 'Processing':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'Shipped':
      case 'Out for Delivery':
        return <Truck className="h-6 w-6 text-orange-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-orange-600 bg-orange-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const resetModal = () => {
    setInvoiceNumber('');
    setOrderStatus(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={resetModal} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Track Your Order</h2>
            <button
              onClick={resetModal}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!orderStatus ? (
            /* Search Form */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your invoice number (e.g., RO123456ABC)"
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You can find your invoice number in the confirmation email or receipt.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleTrackOrder}
                disabled={loading || !invoiceNumber.trim()}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>{loading ? 'Searching...' : 'Track Order'}</span>
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-700">
                  If you can't find your invoice number or need assistance, please contact us at{' '}
                  <a href="mailto:hello@rameshorchards.com" className="underline">
                    hello@rameshorchards.com
                  </a>{' '}
                  or call us directly.
                </p>
              </div>
            </div>
          ) : (
            /* Order Status Display */
            <div className="space-y-6">
              {/* Order Header */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Invoice #{orderStatus.id}</h3>
                    <p className="text-sm text-gray-600">Ordered on {orderStatus.orderDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(orderStatus.status)}`}>
                    {orderStatus.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <p className="font-medium">{orderStatus.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <p className="font-medium">₹{orderStatus.totalAmount}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <p className="font-medium">{orderStatus.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {orderStatus.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">{item.packageSize}kg × {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Order Timeline</h4>
                <div className="space-y-4">
                  {orderStatus.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(step.status, step.completed)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.status}
                            </h5>
                            <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                              {step.description}
                            </p>
                          </div>
                          <span className={`text-xs ${step.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                            {step.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setOrderStatus(null)}
                  className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-colors"
                >
                  Track Another Order
                </button>
                <button
                  onClick={resetModal}
                  className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;