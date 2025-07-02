import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle, Clock, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderStatus {
  id: string;
  invoice_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  total_amount: number;
  created_at: string;
  estimated_delivery: string;
  items: Array<{
    product_name: string;
    quantity: number;
    package_size: number;
    price_per_kg: number;
    subtotal: number;
  }>;
  tracking_updates: Array<{
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }>;
}

const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrackOrder = async () => {
    if (!invoiceNumber.trim()) {
      setError('Please enter your invoice number');
      return;
    }

    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    // Validate mobile number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
        // Mock data for demo when Supabase is not configured
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockOrder: OrderStatus = {
          id: '1',
          invoice_number: invoiceNumber,
          status: 'shipped',
          customer_name: 'Demo Customer',
          customer_phone: mobileNumber,
          customer_email: 'demo@example.com',
          delivery_address: 'Demo Address, Demo City, Demo State - 123456',
          total_amount: 2490,
          created_at: '2024-01-15T10:30:00Z',
          estimated_delivery: '2024-01-18',
          items: [
            { 
              product_name: 'Royal Delicious Apples', 
              quantity: 2, 
              package_size: 5,
              price_per_kg: 830,
              subtotal: 8300
            },
            { 
              product_name: 'Santa Rosa Plums', 
              quantity: 1, 
              package_size: 10,
              price_per_kg: 1080,
              subtotal: 10800
            },
          ],
          tracking_updates: [
            {
              status: 'Order Placed',
              description: 'Your order has been received and confirmed',
              timestamp: '2024-01-15T10:30:00Z',
              completed: true,
            },
            {
              status: 'Processing',
              description: 'Fresh fruits are being carefully selected and packed',
              timestamp: '2024-01-15T14:15:00Z',
              completed: true,
            },
            {
              status: 'Shipped',
              description: 'Your order is on the way with our delivery partner',
              timestamp: '2024-01-16T09:45:00Z',
              completed: true,
            },
            {
              status: 'Out for Delivery',
              description: 'Your order will be delivered today between 10 AM - 6 PM',
              timestamp: '2024-01-18T08:00:00Z',
              completed: false,
            },
          ],
        };

        setOrderStatus(mockOrder);
        return;
      }

      // Real API call to fetch order
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('invoice_number', invoiceNumber.toUpperCase())
        .eq('customer_phone', mobileNumber)
        .single();

      if (fetchError || !data) {
        throw new Error('Order not found. Please check your invoice number and mobile number.');
      }

      // Transform data to match our interface
      const transformedOrder: OrderStatus = {
        id: data.id,
        invoice_number: data.invoice_number,
        status: data.status,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email,
        delivery_address: data.delivery_address,
        total_amount: data.total_amount,
        created_at: data.created_at,
        estimated_delivery: data.estimated_delivery || calculateEstimatedDelivery(data.created_at),
        items: data.order_items.map((item: any) => ({
          product_name: item.product_name,
          quantity: item.quantity,
          package_size: item.package_size,
          price_per_kg: item.price_per_kg,
          subtotal: item.subtotal,
        })),
        tracking_updates: generateTrackingUpdates(data.status, data.created_at),
      };

      setOrderStatus(transformedOrder);

    } catch (err) {
      console.error('Order tracking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateEstimatedDelivery = (orderDate: string) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 3); // Add 3 days for delivery
    return date.toISOString().split('T')[0];
  };

  const generateTrackingUpdates = (currentStatus: string, orderDate: string) => {
    const baseDate = new Date(orderDate);
    
    const updates = [
      {
        status: 'Order Placed',
        description: 'Your order has been received and confirmed',
        timestamp: baseDate.toISOString(),
        completed: true,
      },
    ];

    if (['processing', 'shipped', 'out_for_delivery', 'delivered'].includes(currentStatus)) {
      const processingDate = new Date(baseDate);
      processingDate.setHours(processingDate.getHours() + 4);
      updates.push({
        status: 'Processing',
        description: 'Fresh fruits are being carefully selected and packed',
        timestamp: processingDate.toISOString(),
        completed: true,
      });
    }

    if (['shipped', 'out_for_delivery', 'delivered'].includes(currentStatus)) {
      const shippedDate = new Date(baseDate);
      shippedDate.setDate(shippedDate.getDate() + 1);
      updates.push({
        status: 'Shipped',
        description: 'Your order is on the way with our delivery partner',
        timestamp: shippedDate.toISOString(),
        completed: true,
      });
    }

    if (['out_for_delivery', 'delivered'].includes(currentStatus)) {
      const outForDeliveryDate = new Date(baseDate);
      outForDeliveryDate.setDate(outForDeliveryDate.getDate() + 2);
      updates.push({
        status: 'Out for Delivery',
        description: 'Your order will be delivered today between 10 AM - 6 PM',
        timestamp: outForDeliveryDate.toISOString(),
        completed: currentStatus === 'delivered',
      });
    }

    if (currentStatus === 'delivered') {
      const deliveredDate = new Date(baseDate);
      deliveredDate.setDate(deliveredDate.getDate() + 3);
      updates.push({
        status: 'Delivered',
        description: 'Your order has been successfully delivered',
        timestamp: deliveredDate.toISOString(),
        completed: true,
      });
    }

    return updates;
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
      case 'out_for_delivery':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const resetModal = () => {
    setInvoiceNumber('');
    setMobileNumber('');
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
                  Invoice Number *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your invoice number (e.g., RO123456ABC)"
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
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your 10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the mobile number used during order placement for security verification.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleTrackOrder}
                disabled={loading || !invoiceNumber.trim() || !mobileNumber.trim()}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>{loading ? 'Searching...' : 'Track Order'}</span>
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Security Notice</h3>
                <p className="text-sm text-blue-700">
                  Both invoice number and mobile number are required to protect your order information. 
                  This ensures only you can access your order details.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-700">
                  Can't find your invoice number? Check your email confirmation or SMS. 
                  For assistance, contact us at{' '}
                  <a href="mailto:hello@rameshorchards.com" className="text-green-700 underline">
                    hello@rameshorchards.com
                  </a>
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
                    <h3 className="text-lg font-semibold text-gray-900">Invoice #{orderStatus.invoice_number}</h3>
                    <p className="text-sm text-gray-600">Ordered on {formatDate(orderStatus.created_at)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(orderStatus.status)}`}>
                    {orderStatus.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <p className="font-medium">{orderStatus.customer_name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Mobile:</span>
                    <p className="font-medium">+91 {orderStatus.customer_phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <p className="font-medium">₹{orderStatus.total_amount.toFixed(0)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <p className="font-medium">{new Date(orderStatus.estimated_delivery).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-gray-600 text-sm">Delivery Address:</span>
                  <p className="font-medium text-sm">{orderStatus.delivery_address}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {orderStatus.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">{item.product_name}</h5>
                          <p className="text-sm text-gray-600">
                            {item.package_size}kg × {item.quantity} = {item.package_size * item.quantity}kg total
                          </p>
                          <p className="text-sm text-gray-500">₹{item.price_per_kg}/kg</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{item.subtotal.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Order Timeline</h4>
                <div className="space-y-4">
                  {orderStatus.tracking_updates.map((step, index) => (
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
                            {step.completed ? formatDate(step.timestamp) : 'Pending'}
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