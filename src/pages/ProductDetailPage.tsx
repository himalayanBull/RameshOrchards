import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, Leaf, Minus, Plus, ChevronRight } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';
import ProductCard from '../components/product/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'shipping'>('details');

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-forest-700 font-medium hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-forest-700">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-forest-700">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-forest-700 capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-forest-600 text-sm font-medium uppercase tracking-wider mb-2">
                {product.subcategory || product.category.replace(/-/g, ' ')}
              </p>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3">{product.name}</h1>

              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              )}

              <p className="text-gray-600 leading-relaxed">{product.longDescription || product.description}</p>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-gray-500">{product.unit}</span>
            </div>

            {/* Origin */}
            <div className="bg-forest-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-forest-800">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Origin: {product.origin}</span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    showToast(`${product.name} added to cart`);
                  }}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:bg-gray-200 disabled:text-gray-500"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    wishlisted ? 'border-apple-500 text-apple-500' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-forest-600 mb-1" />
                <span className="text-xs text-gray-600">Free Shipping 1kg+</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-forest-600 mb-1" />
                <span className="text-xs text-gray-600">Freshness Guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Leaf className="h-5 w-5 text-forest-600 mb-1" />
                <span className="text-xs text-gray-600">Sustainably Grown</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {(['details', 'nutrition', 'shipping'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                    activeTab === tab ? 'border-forest-700 text-forest-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'nutrition' ? 'Nutritional Info' : tab === 'shipping' ? 'Shipping & Storage' : 'Details & Benefits'}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-8">
                {product.healthBenefits && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Health Benefits</h3>
                    <ul className="space-y-2">
                      {product.healthBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-forest-500 rounded-full flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Weight</dt>
                        <dd className="text-gray-900">{product.weight}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Origin</dt>
                        <dd className="text-gray-900">{product.origin}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Category</dt>
                        <dd className="text-gray-900 capitalize">{product.category.replace(/-/g, ' ')}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && product.nutritionalInfo && (
              <div className="max-w-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Nutritional Information (per 100g)</h3>
                <dl className="space-y-3">
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <dt className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                      <dd className="text-sm font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-lg">
                {product.shippingInfo && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
                    <p className="text-sm text-gray-600">{product.shippingInfo}</p>
                  </div>
                )}
                {product.storageInstructions && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Storage Instructions</h3>
                    <p className="text-sm text-gray-600">{product.storageInstructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
