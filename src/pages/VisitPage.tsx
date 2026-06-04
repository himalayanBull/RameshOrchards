import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Camera, Apple, Home, MapPin, Calendar, Phone } from 'lucide-react';

const VisitPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
            alt="Visit Ramesh Orchards"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-950/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Visit Our Orchards</h1>
          <p className="text-xl text-forest-100 max-w-2xl mx-auto">
            Walk through our orchards, pick your own fruit, and experience life at 7,000 feet in the Himalayas.
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Experiences We Offer</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Come be a part of orchard life. Whether for a few hours or a few days, there's something magical about being among the trees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: TreePine,
                title: 'Orchard Walks',
                desc: 'Guided walk through our orchards learning about different apple varieties, growing methods, and the science of altitude fruit growing. 1.5 hours.',
                price: '₹500 per person',
                available: true,
              },
              {
                icon: Apple,
                title: 'Fruit Picking Experience',
                desc: 'Pick your own apples, cherries, or plums (seasonal). Keep 2 kg of whatever you pick. A wonderful family activity.',
                price: '₹800 per person (includes 2 kg fruit)',
                available: true,
              },
              {
                icon: Camera,
                title: 'Photography Sessions',
                desc: 'The orchard as your backdrop. Whether it\'s blossom season or harvest time, our orchards offer stunning visuals. We provide basic guidance on the best spots.',
                price: '₹1,500 per session (up to 2 hours)',
                available: true,
              },
              {
                icon: Home,
                title: 'Farm Stays',
                desc: 'Stay in our guest cottage surrounded by apple trees. Wake up to mountain views, enjoy fresh orchard breakfasts, and experience rural Himachal life.',
                price: 'Coming 2027',
                available: false,
              },
            ].map((exp, i) => (
              <div key={i} className={`rounded-xl p-8 border-2 ${exp.available ? 'bg-white border-gray-100' : 'bg-gray-50 border-dashed border-gray-200'}`}>
                <exp.icon className={`h-8 w-8 mb-4 ${exp.available ? 'text-forest-600' : 'text-gray-400'}`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{exp.desc}</p>
                <div className={`text-sm font-semibold ${exp.available ? 'text-forest-700' : 'text-gray-400'}`}>
                  {exp.price}
                </div>
                {!exp.available && (
                  <span className="inline-block mt-3 text-xs bg-orchard-100 text-orchard-700 px-3 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Visit */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Best Times to Visit</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { season: 'Spring', months: 'March — April', highlight: 'Apple blossoms transform the orchard into a sea of white-pink flowers.', best: 'Photography, walking' },
              { season: 'Early Summer', months: 'May — June', highlight: 'Cherry and apricot season. The orchard is lush and green.', best: 'Cherry picking, tasting' },
              { season: 'Late Summer', months: 'July — August', highlight: 'Early apples start ripening. Plums are at their peak.', best: 'Fruit picking, tours' },
              { season: 'Autumn', months: 'September — October', highlight: 'Peak apple harvest. The most rewarding time to visit.', best: 'Apple picking, full experience' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">{item.season}</h3>
                <p className="text-xs text-forest-600 font-medium mb-3">{item.months}</p>
                <p className="text-sm text-gray-600 mb-3">{item.highlight}</p>
                <p className="text-xs text-gray-400">Best for: {item.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Getting There */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-gray-900">Getting Here</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-sm text-gray-600">NagJubbar, Matiana, Theog, Shimla District, Himachal Pradesh 171212</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Visiting Season</h4>
                    <p className="text-sm text-gray-600">March to October. Advance booking required (minimum 2 days notice).</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Book a Visit</h4>
                    <p className="text-sm text-gray-600">Call or WhatsApp: +91 98765 43210</p>
                    <p className="text-sm text-gray-600">Email: visit@rameshorchards.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-cream-100 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-2">How to Reach</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>From Shimla:</strong> 1.5 hours drive via NH-5. Regular buses from Shimla ISBT to Theog.</li>
                  <li><strong>From Delhi:</strong> 8-9 hours drive or overnight bus to Shimla, then local transport.</li>
                  <li><strong>From Chandigarh:</strong> 4-5 hours drive via NH-5 through Shimla.</li>
                  <li><strong>Nearest Airport:</strong> Shimla (Jubbarhatti) — 45 km</li>
                  <li><strong>Nearest Railway:</strong> Shimla — 30 km</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-forest-50 rounded-2xl p-8 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Book Your Visit</h3>
                <p className="text-gray-600 mb-6">
                  All visits require advance booking. We keep group sizes small (max 8 people) to ensure a personal experience.
                </p>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                  <input type="tel" placeholder="Phone / WhatsApp" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                  <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent">
                    <option value="">Select Experience</option>
                    <option value="walk">Orchard Walk</option>
                    <option value="picking">Fruit Picking</option>
                    <option value="photography">Photography Session</option>
                  </select>
                  <textarea placeholder="Any special requests or questions?" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                  <button type="submit" className="w-full py-3 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors">
                    Request Booking
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-3">We'll confirm your booking within 24 hours via WhatsApp or email.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitPage;
