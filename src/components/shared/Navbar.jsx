import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, Link2, FileText, Image as ImageIcon, 
  MessageSquare, Menu, X, HomeIcon, Mic, 
  UserCircle, Settings, ShieldCheck, LogOut, ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const [isSuperAdmin, setIsSuperAdmin] = useState(true); 

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Link to Script', path: '/link-to-script', icon: <Link2 size={18} /> },
    { name: 'Script to Comment', path: '/script-to-comment', icon: <FileText size={18} /> },
    { name: 'Image to Comment', path: '/image-to-comment', icon: <ImageIcon size={18} /> },
    { name: 'Client Reply', path: '/client-reply', icon: <MessageSquare size={18} /> },
    { name: 'Voice to Script', path: '/voice-to-script', icon: <Mic size={18} /> },
    { name: 'Proposal Generator', path: '/proposal-generator', icon: <Sparkles size={18} /> },
  ];

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-400 shrink-0">
            <Sparkles className="fill-blue-400 w-6 h-6" /> 
            <span className="hidden sm:inline">ScriptSpark</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-medium transition-all ${
                  location.pathname === item.path 
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </div>

          {/* User Profile & SuperAdmin Dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full bg-slate-800 border border-white/10 hover:border-blue-500/50 transition-all text-slate-300 hover:text-white"
              >
                <UserCircle size={24} />
                <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-2 animate__animated animate__fadeIn animate__faster">
                  <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">User@ScriptSpark.ai</p>
                  </div>

                  {/* SuperAdmin Only Items */}
                  {isSuperAdmin && (
                    <div className="bg-blue-500/5 mx-2 rounded-lg mb-2">
                      <p className="px-3 pt-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">Admin Panel</p>
                      <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors">
                        <ShieldCheck size={16} className="text-blue-400" /> User Management
                      </Link>
                      <Link to="/admin/analytics" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors pb-3">
                        <Settings size={16} className="text-blue-400" /> AI Usage Logs
                      </Link>
                    </div>
                  )}

                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-400 hover:text-white p-2 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`xl:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-slate-900 border-b border-white/10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                location.pathname === item.path 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;