import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const prevCartCount = useRef(getTotalItems());
  const location = useLocation();

  useEffect(() => {
    const currentCount = getTotalItems();
    if (currentCount > prevCartCount.current) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 300);
    }
    prevCartCount.current = currentCount;
  }, [getTotalItems()]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/track-your-tree', label: 'Track Your Tree' },
    { path: '/our-orchard', label: 'Our Orchard' },
    { path: '/farm-journal', label: 'Farm Journal' },
    { path: '/visit', label: 'Visit Us' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-forest-700 rounded-full flex items-center justify-center">
              <span className="text-white font-display text-lg font-bold">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-forest-900">Ramesh Orchards</h1>
              <p className="text-[10px] text-forest-600 -mt-1 tracking-wider uppercase">Theog, Shimla</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-forest-700 ${
                  location.pathname === link.path ? 'text-forest-700' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-forest-700 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-forest-700 transition-colors">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-apple-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className={`relative p-2 text-gray-600 hover:text-forest-700 transition-all ${cartBounce ? 'scale-125' : 'scale-100'}`}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className={`absolute -top-1 -right-1 bg-forest-700 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center transition-transform ${cartBounce ? 'scale-125' : 'scale-100'}`}>
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-forest-700 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-1 pt-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/corporate-gifting"
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Corporate Gifting
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
