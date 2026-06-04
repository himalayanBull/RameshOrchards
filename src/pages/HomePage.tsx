import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Truck, Users, Leaf, Award, TreePine, ShieldCheck, Star, ArrowRight, ChevronRight } from 'lucide-react';
import { products, getBestSellers, getSeasonalProducts } from '../data/products';
import { useNewsletter } from '../hooks/useNewsletter';
import { testimonials } from '../data/testimonials';
import { treeAdoptions } from '../data/treeAdoptions';
import ProductCard from '../components/product/ProductCard';

const HomePage: React.FC = () => {
  const bestSellers = getBestSellers().slice(0, 4);
  const seasonalProducts = getSeasonalProducts().slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
            alt="Ramesh Orchards in Theog, Shimla"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-900/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-forest-200 text-sm uppercase tracking-widest mb-4 font-medium">Since 1984 — Theog, Shimla</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Fresh From Our
              <span className="block text-forest-300">Himalayan Orchards</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-lg">
              Handpicked apples, cherries, apricots and handcrafted orchard products delivered directly from Theog, Shimla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest-900 rounded-lg font-semibold hover:bg-forest-50 transition-all shadow-lg hover:shadow-xl group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/visit"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Visit Our Orchards
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-12 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold">40+</div>
            <div className="text-xs uppercase tracking-wider">Years</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">25+</div>
            <div className="text-xs uppercase tracking-wider">Varieties</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">7,000ft</div>
            <div className="text-xs uppercase tracking-wider">Elevation</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">5,000+</div>
            <div className="text-xs uppercase tracking-wider">Families Served</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you buy from Ramesh Orchards, you're buying directly from the family that grows your food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: Truck, title: 'Direct From Orchard', desc: 'No middlemen, no cold storage. Tree to door in 48 hours.' },
              { icon: Users, title: 'Family Owned', desc: 'Four generations of orchard expertise since 1984.' },
              { icon: Leaf, title: 'Sustainable Farming', desc: 'Integrated pest management, zero-waste processing.' },
              { icon: Award, title: 'Premium Produce', desc: 'Grown at 7,000 ft elevation for superior flavor.' },
              { icon: ShieldCheck, title: 'No Middlemen', desc: 'Fair prices because you buy directly from the grower.' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-forest-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-forest-100 transition-colors">
                  <item.icon className="h-7 w-7 text-forest-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              From Our Orchards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything we sell starts in our orchards. Fresh fruits, handcrafted products, and curated gift boxes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Fresh Fruits', category: 'fresh-fruits', emoji: '🍎' },
              { name: 'Dried Fruits', category: 'dried-fruits', emoji: '🍇' },
              { name: 'Apple Cider Vinegar', category: 'apple-cider-vinegar', emoji: '🍶' },
              { name: 'Healthy Snacks', category: 'healthy-snacks', emoji: '🍪' },
              { name: 'Preserves & Jams', category: 'preserves-jams', emoji: '🫙' },
              { name: 'Gift Boxes', category: 'gift-boxes', emoji: '🎁' },
            ].map((cat) => (
              <Link
                key={cat.category}
                to={`/shop?category=${cat.category}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Products */}
      {seasonalProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-forest-600 text-sm font-medium uppercase tracking-wider mb-1">Limited Availability</p>
                <h2 className="text-3xl font-display font-bold text-gray-900">Seasonal Picks</h2>
              </div>
              <Link to="/shop?seasonal=true" className="hidden sm:flex items-center text-forest-700 font-medium hover:text-forest-900 transition-colors">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Track Your Tree CTA */}
      <section className="py-20 bg-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-forest-800 rounded-full text-forest-200 text-sm">
                <TreePine className="h-4 w-4 mr-2" />
                Unique to Ramesh Orchards
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold leading-tight">
                Adopt a Tree.<br />
                <span className="text-forest-300">Watch It Grow.</span><br />
                Taste the Harvest.
              </h2>
              <p className="text-forest-200 text-lg max-w-md">
                Adopt an apple tree in our Theog orchard. Receive photo updates throughout the year and get your tree's harvest delivered to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/track-your-tree"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest-900 rounded-lg font-semibold hover:bg-forest-50 transition-colors"
                >
                  Explore Track Your Tree
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <p className="text-forest-400 text-sm">Starting from ₹4,999/year — includes harvest delivery</p>
            </div>
            <div className="space-y-4">
              {treeAdoptions[0].features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-start space-x-3 bg-forest-800/50 rounded-lg p-4">
                  <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-forest-100">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-orchard-600 text-sm font-medium uppercase tracking-wider mb-1">Customer Favorites</p>
              <h2 className="text-3xl font-display font-bold text-gray-900">Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-forest-700 font-medium hover:text-forest-900 transition-colors">
              Shop All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1760020627779-77f4c78f9e46?w=800&h=600&fit=crop"
                alt="Apple orchardist picking apples"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-forest-700 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold">Since</div>
                  <div className="text-4xl font-display font-bold">1984</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-forest-600 text-sm font-medium uppercase tracking-wider">Our Story</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900">
                A Family, An Orchard, A Mountain
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In 1984, in the quiet village of NagJubbar near Theog, Shimla, the Ramesh family planted their first apple trees. What began as a few dozen saplings on a Himalayan hillside has grown into one of Theog's finest orchards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Four decades later, we still hand-pick every fruit, still know every tree by its quirks and its yield. We've expanded from fresh fruit to dried fruits, apple cider vinegar, preserves, and wellness products — but the philosophy hasn't changed: grow it right, pick it at peak, get it to you fast.
              </p>
              <p className="text-gray-600 leading-relaxed">
                No middlemen. No cold storage warehouses. Just fruit that travels from our hands to yours.
              </p>
              <Link to="/our-orchard" className="inline-flex items-center text-forest-700 font-semibold hover:text-forest-900 transition-colors">
                Read Our Full Story <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Real reviews from real families who buy from our orchards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location} — {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const { status, errorMessage, subscribe } = useNewsletter('homepage');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      if (status !== 'error') setEmail('');
    }
  };

  return (
    <section className="py-16 bg-orchard-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Stay Connected to the Orchard</h2>
        <p className="text-gray-600 mb-6">Get seasonal harvest alerts, exclusive discounts, and orchard stories delivered to your inbox.</p>
        {status === 'success' ? (
          <div className="bg-forest-50 border border-forest-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-forest-800 font-medium">Thank you for subscribing!</p>
            <p className="text-forest-600 text-sm mt-1">We'll send you orchard updates and seasonal offers.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-forest-700 text-white rounded-lg font-medium hover:bg-forest-800 transition-colors text-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
        )}
      </div>
    </section>
  );
};

export default HomePage;
