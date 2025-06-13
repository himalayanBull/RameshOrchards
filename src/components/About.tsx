import React from 'react';
import { Users, Leaf, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-700">Family Legacy</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Since 1984, the Ramesh family has been dedicated to growing the finest fruits 
                in our beautiful orchards nestled in the scenic hills of NagJubbar, Matiana, Theog, 
                Himachal Pradesh. What started as a small family farm has grown into a 
                sustainable operation that supplies premium fruits to families across the region.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Located in the pristine environment of Himachal Pradesh at an elevation that provides 
                ideal growing conditions, our orchards benefit from the perfect climate and soil 
                conditions. We believe in responsible farming methods that protect our crops while 
                maintaining the natural quality of our fruits.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We use targeted pest control measures when necessary to ensure healthy harvests, 
                but avoid unnecessary chemicals to preserve the natural goodness of our produce. 
                Every fruit is hand-picked at peak ripeness to ensure the best flavor and quality 
                for your family.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-700 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">40+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Leaf className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Fruit Types</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Varieties</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Family in fruit orchard in Himachal Pradesh"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;