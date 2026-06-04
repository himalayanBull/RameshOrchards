import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useNewsletter } from '../../hooks/useNewsletter';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { status, errorMessage, subscribe } = useNewsletter('footer');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      if (status !== 'error') setEmail('');
    }
  };

  return (
    <footer className="bg-forest-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-forest-900 font-display text-lg font-bold">R</span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold">Ramesh Orchards</h3>
                <p className="text-[10px] text-forest-300 tracking-wider uppercase">Est. 1984</p>
              </div>
            </div>
            <p className="text-forest-300 text-sm leading-relaxed">
              Four generations of passion for growing the finest Himalayan fruits. From our family orchards in Theog, Shimla to your table.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-forest-900 rounded-lg hover:bg-forest-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-forest-900 rounded-lg hover:bg-forest-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="p-2 bg-forest-900 rounded-lg hover:bg-forest-800 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-200">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=fresh-fruits" className="text-forest-300 hover:text-white text-sm transition-colors">Fresh Fruits</Link></li>
              <li><Link to="/shop?category=dried-fruits" className="text-forest-300 hover:text-white text-sm transition-colors">Dried Fruits</Link></li>
              <li><Link to="/shop?category=apple-cider-vinegar" className="text-forest-300 hover:text-white text-sm transition-colors">Apple Cider Vinegar</Link></li>
              <li><Link to="/shop?category=healthy-snacks" className="text-forest-300 hover:text-white text-sm transition-colors">Healthy Snacks</Link></li>
              <li><Link to="/shop?category=preserves-jams" className="text-forest-300 hover:text-white text-sm transition-colors">Preserves & Jams</Link></li>
              <li><Link to="/shop?category=gift-boxes" className="text-forest-300 hover:text-white text-sm transition-colors">Gift Boxes</Link></li>
              <li><Link to="/track-your-tree" className="text-forest-300 hover:text-white text-sm transition-colors">Track Your Tree</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-200">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/our-orchard" className="text-forest-300 hover:text-white text-sm transition-colors">Our Orchard</Link></li>
              <li><Link to="/farm-journal" className="text-forest-300 hover:text-white text-sm transition-colors">Farm Journal</Link></li>
              <li><Link to="/visit" className="text-forest-300 hover:text-white text-sm transition-colors">Visit Us</Link></li>
              <li><Link to="/corporate-gifting" className="text-forest-300 hover:text-white text-sm transition-colors">Corporate Gifting</Link></li>
              <li><Link to="/faq" className="text-forest-300 hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-forest-300 hover:text-white text-sm transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-200">Newsletter</h4>
              {status === 'success' ? (
                <p className="text-forest-300 text-sm">Thank you for subscribing! We'll send you orchard updates and exclusive offers.</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <p className="text-forest-300 text-sm">Get harvest updates, seasonal offers, and orchard stories.</p>
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 bg-forest-900 border border-forest-700 rounded-l-lg text-sm text-white placeholder:text-forest-500 focus:outline-none focus:border-forest-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-4 py-2 bg-forest-600 hover:bg-forest-500 rounded-r-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {status === 'loading' ? '...' : 'Join'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-200">Contact</h4>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="flex items-center space-x-2 text-forest-300 hover:text-white text-sm transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@rameshorchards.com" className="flex items-center space-x-2 text-forest-300 hover:text-white text-sm transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>hello@rameshorchards.com</span>
                </a>
                <div className="flex items-start space-x-2 text-forest-300 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>NagJubbar, Matiana, Theog<br />Shimla, HP 171212, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-forest-400 text-xs">
              &copy; 2026 Ramesh Orchards. All rights reserved. Farm-to-home since 1984.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-forest-400 hover:text-white text-xs transition-colors">Privacy</Link>
              <Link to="/terms" className="text-forest-400 hover:text-white text-xs transition-colors">Terms</Link>
              <Link to="/refunds" className="text-forest-400 hover:text-white text-xs transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/919876543210?text=Hi%20Ramesh%20Orchards!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </footer>
  );
};

export default Footer;
