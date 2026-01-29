import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react'; // Install with: npm install lucide-react framer-motion

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-slate-900/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/10">
        
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="bg-red-500/20 p-5 rounded-full"
          >
            <ShieldAlert size={64} className="text-red-500" />
          </motion.div>
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
        <p className="text-slate-400 mb-8 text-sm">
          It looks like you've reached a restricted area. <br />
          If you need access, please reach out to us.
        </p>

        <div className="flex flex-col gap-3">
          <a href="/" className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all">
            Back to Home
          </a>
          
          <a 
            href="https://wa.me/8801581205392" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-green-500/10 text-green-500 border border-green-500/50 font-bold rounded-xl hover:bg-green-500 hover:text-white transition-all"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;