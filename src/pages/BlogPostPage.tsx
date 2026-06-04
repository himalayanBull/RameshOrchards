import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link to="/farm-journal" className="text-forest-700 font-medium hover:underline">Back to Farm Journal</Link>
      </div>
    );
  }

  return (
    <article className="py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/farm-journal" className="inline-flex items-center text-sm text-gray-500 hover:text-forest-700 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Farm Journal
        </Link>

        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-600 bg-forest-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mt-4 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>
        </header>

        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-video object-cover rounded-xl mb-10"
        />

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace(/\*\*/g, '')}</h3>;
            }
            if (paragraph.startsWith('**')) {
              const [bold, ...rest] = paragraph.split('**').filter(Boolean);
              return (
                <div key={i} className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{bold}</h3>
                  <p className="text-gray-600 leading-relaxed">{rest.join('')}</p>
                </div>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').filter(l => l.startsWith('- '));
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-600">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Enjoyed this article? Share it with someone who loves fresh fruit.</p>
          <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-forest-700 text-white rounded-lg font-medium hover:bg-forest-800 transition-colors text-sm">
            Shop Our Products
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
