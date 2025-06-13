import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedPackage, setSelectedPackage] = useState(5);
  const [quantity, setQuantity] = useState(1);

  const packageOptions = [5, 10, 20];
  const totalPrice = product.pricePerKg * selectedPackage * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedPackage);
    }
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-w-4 aspect-h-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-700">
            ${product.pricePerKg}<span className="text-base text-gray-500">/kg</span>
          </div>
          <div className="text-sm text-gray-500">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>

        {/* Package Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Package Size</label>
          <div className="flex space-x-2">
            {packageOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedPackage(size)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  selectedPackage === size
                    ? 'border-green-700 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-sm font-medium">{size}kg</div>
                <div className="text-xs text-gray-500">${(product.pricePerKg * size).toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;