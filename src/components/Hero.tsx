import React from 'react';
import { Leaf, Heart, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-green-50 to-orange-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh <span className="text-green-700">Premium</span> Fruits
                <br />
                <span className="text-orange-600">From Our Family</span> to Yours
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Four decades of passion for growing the finest fruits. 
                Handpicked from our sustainable orchards in the heart of nature since 1984.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Sustainably Grown</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-gray-700 font-medium">Family Grown</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <span className="text-gray-700 font-medium">Premium Quality</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors transform hover:scale-105"
              >
                Shop Our Fruits
              </button>
              <button 
                onClick={scrollToAbout}
                className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-colors"
              >
                Our Story
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh fruits in orchard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">6</div>
                <div className="text-gray-600 font-medium">Fruit Varieties</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold">Est.</div>
                <div className="text-lg font-bold">1984</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;