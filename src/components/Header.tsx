import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Apple, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import OrderTrackingModal from './OrderTrackingModal';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Apple className="h-8 w-8 text-green-700" />
              <h1 className="text-2xl font-bold text-gray-900">
                Ramesh<span className="text-green-700">Orchards</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Fruits
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Our Story
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Contact
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Order Tracking */}
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                <Search className="h-5 w-5" />
                <span>Track Order</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-green-700 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="px-4 py-2 text-left text-gray-700 hover:text-green-700 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="px-4 py-2 text-left text-gray-700 hover:text-green-700 transition-colors"
                >
                  Fruits
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="px-4 py-2 text-left text-gray-700 hover:text-green-700 transition-colors"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-4 py-2 text-left text-gray-700 hover:text-green-700 transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    setIsTrackingOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left text-gray-700 hover:text-green-700 transition-colors"
                >
                  Track Order
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <OrderTrackingModal isOpen={isTrackingOpen} onClose={() => setIsTrackingOpen(false)} />
    </>
  );
};

export default Header;