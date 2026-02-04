import React, { useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { posts } = useBlog();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  useEffect(() => {
    document.title = "AI Blog IL - הבלוג המוביל לבינה מלאכותית";
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section>
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">ברוכים הבאים לעתיד</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            סקירות מעמיקות, מדריכים טכניים וחדשות מעולם הבינה המלאכותית.
            נכתב על ידי מומחים, מגובה במקורות.
          </p>
        </div>
        
        {featuredPost && <PostCard post={featuredPost} featured={true} />}
      </section>

      {/* Recent Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            פוסטים אחרונים
          </h2>
          <Link to="/category/טכנולוגיה" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            לכל המאמרים
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      {/* Newsletter / CTA Section */}
      <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">רוצים להישאר מעודכנים?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          הצטרפו לאלפי מנויים שמקבלים סיכום שבועי של ההתפתחויות החשובות ביותר בעולם ה-AI. ללא ספאם.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="האימייל שלך" 
            className="px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <button className="bg-primary hover:bg-blue-600 px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
            הרשמה
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;