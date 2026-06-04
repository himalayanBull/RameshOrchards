import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Droplets, Sun, Users, Leaf, Mountain, ArrowRight } from 'lucide-react';

const OurOrchardPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
            alt="Ramesh Orchards aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-950/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Our Orchard</h1>
          <p className="text-xl text-forest-100 max-w-2xl mx-auto">
            Nestled at 7,000 feet in Theog, Shimla — where the Himalayas meet the sky and apples taste like they should.
          </p>
        </div>
      </section>

      {/* Family Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-forest-600 text-sm font-medium uppercase tracking-wider">Since 1984</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900">
                Four Generations of Growing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In 1984, in NagJubbar village near Matiana, Theog — when Shimla's apple industry was still young — the Ramesh family planted their first orchard. It wasn't a business plan. It was a way of life.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What started as 50 trees on a hillside has grown into a thriving operation with over 500 trees across multiple varieties — Royal Delicious, Red Delicious, Golden Delicious, Granny Smith, cherries, plums, apricots, and pears.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, the third generation manages the day-to-day, but the founding principles remain: grow it right, pick it at peak, never compromise quality for quantity. Every single fruit is still hand-picked by family and trusted neighbors who've worked these hillsides for decades.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                alt="Ramesh family in their orchard"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Location */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Theog Grows the Best Fruit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Location isn't just an address — it's our most important ingredient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mountain, title: '7,000 ft Elevation', desc: 'The altitude creates massive day-night temperature swings that concentrate sugars in our fruit.' },
              { icon: Sun, title: 'Intense Himalayan Sun', desc: 'More UV at altitude means deeper color, more antioxidants, and richer flavor compounds.' },
              { icon: Droplets, title: 'Natural Rainfall', desc: 'Monsoon rains provide natural irrigation. We supplement with precision drip systems only when needed.' },
              { icon: Leaf, title: 'Pristine Air', desc: 'No industrial pollution for hundreds of kilometers. Our fruit breathes clean mountain air.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <item.icon className="h-8 w-8 text-forest-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growing Practices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                alt="Sustainable farming practices"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <p className="text-forest-600 text-sm font-medium uppercase tracking-wider">Our Approach</p>
              <h2 className="text-3xl font-display font-bold text-gray-900">Sustainable Growing Practices</h2>
              <div className="space-y-4">
                {[
                  { title: 'Integrated Pest Management', desc: 'We monitor pest populations with traps and only intervene when necessary. 70% fewer chemical applications than conventional orchards.' },
                  { title: 'Composting & Soil Health', desc: 'All organic waste returns to the soil. Vermicomposting produces rich amendments for our trees.' },
                  { title: 'Water Conservation', desc: 'Drip irrigation reduces water use by 40%. We work with nature\'s rainfall, not against it.' },
                  { title: 'Zero Waste Processing', desc: 'Fruit that doesn\'t meet fresh standards becomes ACV, dried fruit, or preserves. Nothing goes to waste.' },
                  { title: 'Biodiversity', desc: 'Cover crops between rows fix nitrogen and shelter beneficial insects that naturally control pests.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-forest-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harvest Process */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">From Tree to Your Table</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Our harvest-to-delivery process ensures maximum freshness.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Hand-Picked', desc: 'Every fruit selected individually at peak ripeness.' },
              { step: '2', title: 'Sorted & Graded', desc: 'Quality checked by experienced eyes. Only the best proceed.' },
              { step: '3', title: 'Packed Fresh', desc: 'Protective packaging within hours of picking.' },
              { step: '4', title: 'Cold Chain', desc: 'Temperature-controlled logistics preserve freshness.' },
              { step: '5', title: 'At Your Door', desc: 'Delivered within 2-4 days of harvest. No cold storage.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-lg p-5 text-center shadow-sm">
                <div className="w-10 h-10 bg-forest-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Fruit Trees' },
              { value: '25+', label: 'Varieties Grown' },
              { value: '40+', label: 'Years Experience' },
              { value: '5,000+', label: 'Families Served' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl font-display font-bold text-forest-200">{stat.value}</div>
                <div className="text-forest-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Taste the Difference</h2>
          <p className="text-gray-600 mb-6">Experience fruit that's grown right, picked at peak, and delivered fresh from our family to yours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors">
              Shop Our Products
            </Link>
            <Link to="/visit" className="inline-flex items-center justify-center px-8 py-3 border-2 border-forest-700 text-forest-700 rounded-lg font-semibold hover:bg-forest-50 transition-colors">
              Plan a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurOrchardPage;
