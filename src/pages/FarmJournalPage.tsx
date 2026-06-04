import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const FarmJournalPage: React.FC = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">Farm Journal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stories from our orchards — the seasons, the harvests, the science of growing great fruit, and the life of a Himalayan farming family.
          </p>
        </div>

        {/* Featured Post */}
        <Link to={`/farm-journal/${featured.slug}`} className="block mb-16 group">
          <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest-600 bg-forest-50 px-3 py-1 rounded-full">
                  {featured.category}
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-forest-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center text-forest-700 font-medium">
                Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map(post => (
            <Link key={post.id} to={`/farm-journal/${post.slug}`} className="group">
              <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center text-[10px] text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-xs text-forest-600 font-medium">Read &rarr;</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmJournalPage;
