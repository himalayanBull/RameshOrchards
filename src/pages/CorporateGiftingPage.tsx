import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, Truck, Palette, TreePine, Phone } from 'lucide-react';

const CorporateGiftingPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-orchard-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900">
                Corporate Gifting That<br />
                <span className="text-orchard-600">People Remember</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Skip the generic dry fruit boxes. Gift premium Himalayan orchard products that tell a story — from a family farm, not a warehouse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#enquiry" className="inline-flex items-center justify-center px-8 py-4 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors">
                  Get a Quote
                </a>
                <Link to="/shop?category=gift-boxes" className="inline-flex items-center justify-center px-8 py-4 border-2 border-forest-700 text-forest-700 rounded-lg font-semibold hover:bg-forest-50 transition-colors">
                  View Gift Boxes
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=600&fit=crop"
                alt="Corporate gift hamper"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Corporate Gifts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Companies Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Gift, title: 'Meaningful Gifts', desc: 'Real food from a real family farm beats mass-produced hampers. Your recipients will notice the difference.' },
              { icon: Palette, title: 'Custom Branding', desc: 'Add your company logo to packaging, include custom notes, select specific products for your brand story.' },
              { icon: Truck, title: 'Pan-India Delivery', desc: 'We handle individual shipping to each recipient. Send us your list, we handle the rest.' },
              { icon: Users, title: 'Bulk Pricing', desc: '10+ hampers: 10% off. 50+ hampers: 15% off. 100+ hampers: custom quote with dedicated manager.' },
              { icon: TreePine, title: 'Tree Adoptions', desc: 'Gift each team member a tree. They receive updates all year and harvest at home. Unique, memorable, sustainable.' },
              { icon: Phone, title: 'Dedicated Support', desc: 'Corporate orders get a dedicated account manager for ordering, customization, and tracking.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-100">
                <item.icon className="h-7 w-7 text-orchard-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Options */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Popular Corporate Options</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Orchard Gift Box', price: 'From ₹1,999', desc: '5 kg premium seasonal fruits in a wooden crate with personalized note.', best: 'Best for: Diwali, client appreciation' },
              { name: 'Wellness Gift Box', price: 'From ₹2,499', desc: 'ACV, dried fruits, apple chips, and preserves — a complete wellness package.', best: 'Best for: New Year, health-conscious teams' },
              { name: 'Tree Adoption (Corporate)', price: 'From ₹4,999/tree', desc: 'Each recipient gets a named tree with year-round updates and harvest delivery.', best: 'Best for: Employee milestones, premium clients' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-forest-700 font-semibold mb-3">{item.price}</p>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <p className="text-xs text-orchard-600 font-medium">{item.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Request a Corporate Quote</h2>
            <p className="text-gray-600">Tell us about your gifting needs and we'll put together a custom proposal within 24 hours.</p>
          </div>

          <form className="space-y-6 bg-cream-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white" />
              <input type="text" placeholder="Company Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="email" placeholder="Work Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white">
                <option value="">Number of Recipients</option>
                <option value="10-25">10 — 25</option>
                <option value="25-50">25 — 50</option>
                <option value="50-100">50 — 100</option>
                <option value="100-500">100 — 500</option>
                <option value="500+">500+</option>
              </select>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white">
                <option value="">Budget per Hamper</option>
                <option value="1500-2500">₹1,500 — ₹2,500</option>
                <option value="2500-4000">₹2,500 — ₹4,000</option>
                <option value="4000-7000">₹4,000 — ₹7,000</option>
                <option value="7000+">₹7,000+</option>
              </select>
            </div>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white">
              <option value="">Occasion</option>
              <option value="diwali">Diwali</option>
              <option value="new-year">New Year</option>
              <option value="employee-milestone">Employee Milestone</option>
              <option value="client-appreciation">Client Appreciation</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Any specific requirements? (custom branding, specific products, dietary needs...)" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white" />
            <button type="submit" className="w-full py-4 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors">
              Request Quote
            </button>
            <p className="text-xs text-gray-500 text-center">We'll respond within 24 hours with a custom proposal.</p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CorporateGiftingPage;
