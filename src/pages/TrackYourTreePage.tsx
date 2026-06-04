import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Camera, Truck, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { treeAdoptions } from '../data/treeAdoptions';
import { useCart } from '../contexts/CartContext';

const TrackYourTreePage: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-forest-800 rounded-full text-forest-200 text-sm mb-6">
            <TreePine className="h-4 w-4 mr-2" />
            A Unique Orchard Experience
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Track Your Tree
          </h1>
          <p className="text-xl text-forest-200 max-w-2xl mx-auto mb-8">
            Adopt an apple tree in our Himalayan orchards. Watch it grow through the seasons with photo updates, then receive your tree's harvest at your door.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Four simple steps to owning a piece of the Himalayas.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: TreePine, title: 'Choose Your Tree', desc: 'Select a single tree, a mini grove, or a seasonal subscription.' },
              { icon: Camera, title: 'Get Updates', desc: 'Receive monthly photos and status updates of your tree via WhatsApp.' },
              { icon: Calendar, title: 'Watch It Grow', desc: 'Follow along as blossoms turn to fruit through spring, summer, and autumn.' },
              { icon: Truck, title: 'Receive Harvest', desc: 'When harvest day comes, your tree\'s yield is shipped directly to your door.' },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-forest-200" />
                )}
                <div className="w-16 h-16 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="h-7 w-7 text-forest-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Every plan includes photo updates and harvest delivery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {treeAdoptions.map((plan, i) => (
              <div key={plan.id} className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${i === 1 ? 'border-forest-500 relative' : 'border-gray-100'}`}>
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-forest-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm ml-2">{plan.priceLabel}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-forest-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => addToCart({
                    id: plan.id,
                    name: plan.name,
                    slug: plan.slug,
                    description: plan.description,
                    image: plan.image,
                    price: plan.price,
                    unit: plan.priceLabel,
                    category: 'track-your-tree',
                    inStock: true,
                    origin: 'Theog, Shimla, Himachal Pradesh',
                  })}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    i === 1
                      ? 'bg-forest-700 text-white hover:bg-forest-800'
                      : 'border-2 border-forest-700 text-forest-700 hover:bg-forest-50'
                  }`}
                >
                  Adopt Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Updates Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">What Updates Look Like</h2>
            <p className="text-gray-600">Here's a sample timeline from one of our adopted trees.</p>
          </div>

          <div className="space-y-8">
            {treeAdoptions[0].updates.map((update, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-forest-600 rounded-full" />
                  </div>
                  {i < treeAdoptions[0].updates.length - 1 && (
                    <div className="w-0.5 flex-1 bg-forest-100 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs text-forest-600 font-medium uppercase tracking-wider mb-1">
                    {new Date(update.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                  {update.image && (
                    <img src={update.image} alt={update.title} className="w-full max-w-sm rounded-lg shadow-sm" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'How much fruit will my tree produce?', a: 'A single mature apple tree in our orchards typically yields 20-35 kg per season, depending on variety and weather. All of it is delivered to you.' },
              { q: 'What if there\'s a bad harvest year?', a: 'Nature is unpredictable. If your tree\'s yield is below 15 kg, we supplement from our other trees to ensure you receive at least 15 kg. If the entire orchard has a bad year, we extend your subscription by one season free.' },
              { q: 'Can I visit my tree?', a: 'Absolutely! All tree adoption plans include an annual visit invitation (September-October is the best time). Five-tree adopters get a private tour for up to 4 guests.' },
              { q: 'Is this a good corporate gift?', a: 'Yes! Companies adopt groves for their teams. Each team member gets individual updates. Contact us for corporate bulk pricing.' },
              { q: 'How do I receive updates?', a: 'Updates are sent via WhatsApp (photos, voice notes) and email (detailed monthly report with photos). You choose your preference during sign-up.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Ready to Own a Himalayan Apple Tree?</h2>
          <p className="text-forest-200 mb-6">Join hundreds of families who already have a tree with their name on it in Theog.</p>
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center px-8 py-3 bg-white text-forest-900 rounded-lg font-semibold hover:bg-forest-50 transition-colors">
            Choose Your Plan <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default TrackYourTreePage;
