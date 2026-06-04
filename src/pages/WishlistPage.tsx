import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/product/ProductCard';

const WishlistPage: React.FC = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <Heart className="h-16 w-16 text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-8">Save your favorite products to buy later.</p>
        <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-forest-700 text-white rounded-lg font-medium hover:bg-forest-800 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-8">
          Your Wishlist ({items.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
