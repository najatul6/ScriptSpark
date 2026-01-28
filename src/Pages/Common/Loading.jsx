import React from 'react';
import { Sparkles } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-20 animate-ping"></div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-white/10 shadow-2xl relative z-10">
            <Sparkles className="w-12 h-12 text-blue-400 animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Script<span className="text-blue-400">Spark</span>
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Igniting your creativity...</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-10 text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        Preparing AI Workspace
      </div>
    </div>
  );
};

export default Loading;