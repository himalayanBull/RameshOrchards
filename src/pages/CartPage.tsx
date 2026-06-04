import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some delicious orchard products to get started!</p>
        <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-forest-700 text-white rounded-lg font-medium hover:bg-forest-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-gray-900">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 flex gap-4">
                <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-forest-700 transition-colors line-clamp-1">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500">{item.product.unit}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center text-sm text-forest-700 font-medium hover:text-forest-900 mt-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)</span>
                  <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-forest-600 font-medium">{getTotalPrice() >= 999 ? 'Free' : '₹99'}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-forest-700">
                    ₹{(getTotalPrice() + (getTotalPrice() >= 999 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>
              </div>

              {getTotalPrice() < 999 && (
                <p className="text-xs text-gray-400 mt-3">Add ₹{(999 - getTotalPrice()).toLocaleString()} more for free shipping</p>
              )}

              <button className="w-full mt-6 py-3.5 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Truck className="h-4 w-4 text-forest-600" />
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Shield className="h-4 w-4 text-forest-600" />
                  <span>100% freshness guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
