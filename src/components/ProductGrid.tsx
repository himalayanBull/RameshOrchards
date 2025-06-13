import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductGrid: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<string>('all');

  const fruitTypes = [
    { value: 'all', label: 'All Fruits' },
    { value: 'apple', label: 'Apples' },
    { value: 'pear', label: 'Pears' },
    { value: 'plum', label: 'Plums' },
    { value: 'peach', label: 'Peaches' },
    { value: 'apricot', label: 'Apricots' },
    { value: 'cherry', label: 'Cherries' },
  ];

  const filteredProducts = selectedFruit === 'all' 
    ? products 
    : products.filter(product => product.fruitType === selectedFruit);

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Premium <span className="text-green-700">Fruit Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our carefully curated selection of fresh fruits, each variety offering its own unique 
            flavor profile and perfect for different occasions.
          </p>

          {/* Fruit Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {fruitTypes.map((fruit) => (
              <button
                key={fruit.value}
                onClick={() => setSelectedFruit(fruit.value)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedFruit === fruit.value
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {fruit.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;