import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../types/Product';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useToast } from '../../contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-orchard-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {product.isSeasonal && (
            <span className="bg-forest-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Seasonal
            </span>
          )}
          {product.isNew && (
            <span className="bg-apple-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'text-apple-500 fill-current' : 'text-gray-400'}`} />
        </button>
      </Link>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-[10px] text-forest-600 font-medium uppercase tracking-wider mb-1">
            {product.subcategory || product.category.replace(/-/g, ' ')}
          </p>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 hover:text-forest-700 transition-colors line-clamp-1">{product.name}</h3>
          </Link>
        </div>

        {product.rating && (
          <div className="flex items-center space-x-1">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>
        )}

        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 ml-1">{product.unit}</span>
          </div>
          <button
            onClick={() => {
              addToCart(product);
              showToast(`${product.name} added to cart`);
            }}
            disabled={!product.inStock}
            className="p-2.5 bg-forest-700 text-white rounded-lg hover:bg-forest-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
