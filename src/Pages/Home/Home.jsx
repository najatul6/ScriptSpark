import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Link2, FileText, Image as ImageIcon, MessageSquare, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description, link }) => (
  <Link 
    to={link} 
    className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:bg-blue-600/10 hover:border-blue-500/50 shadow-lg group"
  >
    <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white">{title}</h3>
    <p className="text-slate-400 text-sm group-hover:text-slate-200">{description}</p>
    <div className="mt-4 text-blue-400 flex items-center gap-1 group-hover:text-blue-300 transition-colors">
      Explore <ArrowRight size={16} />
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 flex flex-col items-center justify-center font-sans">
      
      {/* Hero Section */}
      <section className="text-center mb-16 max-w-4xl animate__animated animate__fadeInUp">
        <h1 className="text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Supercharge Your Freelance Game with ScriptSpark AI
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Craft irresistible comments, generate powerful scripts, and master client communication – all with the magic of AI.
        </p>
        <Link 
          to="/script-to-comment" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-lg font-bold shadow-lg transition-transform active:scale-95"
        >
          Get Started <Sparkles size={20} />
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard 
          icon={<Link2 size={40} />}
          title="Link to Script"
          description="Convert any video URL into a detailed script or summary."
          link="/link-to-script"
        />
        <FeatureCard 
          icon={<FileText size={40} />}
          title="Script to Comment"
          description="Turn video scripts into engaging comments that win clients."
          link="/script-to-comment"
        />
        <FeatureCard 
          icon={<ImageIcon size={40} />}
          title="Image to Comment"
          description="Generate comments by analyzing video thumbnails or screenshots."
          link="/image-to-comment"
        />
        <FeatureCard 
          icon={<MessageSquare size={40} />}
          title="Client Reply Master"
          description="Craft professional and persuasive replies to client messages."
          link="/client-reply"
        />
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-3xl animate__animated animate__fadeInUp animate__delay-1s">
        <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Ready to Elevate Your Freelance Business?
        </h2>
        <p className="text-lg text-slate-300 mb-6">
          ScriptSpark is your secret weapon to stand out, impress, and secure more projects.
        </p>
        <Link 
          to="/script-to-comment" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full text-lg font-semibold transition-transform active:scale-95"
        >
          Start Winning Clients <ArrowRight size={20} />
        </Link>
      </section>

      <footer className="mt-16 text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} ScriptSpark AI. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;