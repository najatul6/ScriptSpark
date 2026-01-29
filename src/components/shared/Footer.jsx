import React from 'react';
import { Github, Linkedin,  Terminal, Cpu, Globe, ArrowRight, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] text-slate-300 pt-20 pb-10 overflow-hidden">
      {/* Decorative Spark Effect - Background Glow */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="group-hover:scale-110 transition-transform">
                <Sparkles size={40} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Script<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Spark</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering developers with lightning-fast automation scripts and modern web solutions. Sparking innovation through clean, scalable code.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Globe].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Tech Stack Focused */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Terminal size={14} className="text-blue-500" /> Scripts</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Cpu size={14} className="text-blue-500" /> API Access</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Globe size={14} className="text-blue-500" /> Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Open Source</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="md:col-span-4 space-y-6 bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm">Join the Spark newsletter</h4>
              <p className="text-xs text-slate-500 font-medium">Get the latest automation tips & tools.</p>
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="developer@email.com" 
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-blue-500 transition-all pr-12"
              />
              <button className="absolute right-2 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all">
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-[10px] text-slate-600">Zero spam. Only high-voltage code.</p>
          </div>

        </div>

        {/* Final Footer Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>© {currentYear} ScriptSpark.</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span className="flex items-center gap-1">
              Made by <a href="https://najatul-islam.vercel.app/" className="text-slate-300 hover:text-blue-400 font-bold underline decoration-blue-500/30">Najatul Islam</a>
            </span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-white transition-colors">System Status</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;