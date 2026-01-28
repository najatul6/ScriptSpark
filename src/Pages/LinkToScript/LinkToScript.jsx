import React, { useState } from 'react';
import { Send, Sparkles, Copy, RefreshCw, Link as LinkIcon, FileText } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const LinkToScript = () => {
  const [videoLink, setVideoLink] = useState(''); 
  const [script, setScript] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleExtractScript = async () => {
    if (!videoLink) return alert("Please paste a video link first!");
    
    setIsExtracting(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        I am providing a video link: ${videoLink}. 
        Please provide a detailed transcript or a summary of the script of this video. 
        If you cannot access the link, explain the key topics usually found in such videos based on the URL context.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setScript(response.text()); 
    } catch (error) {
      console.error("Link Error:", error);
      alert("AI could not access this link directly. Try pasting the script manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerateComment = async () => {
    if (!script) return alert("Script is empty!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this script: "${script}". Write a professional and impressive comment for the creator.`;
      const result = await model.generateContent(prompt);
      setComment(result.response.text());
    } catch (error) {
      alert("Comment generation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 flex flex-col items-center font-sans">
      
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-3">
          <Sparkles size={40} className="text-blue-400" /> ScriptSpark
        </h1>
        <p className="text-slate-400 mt-2">Get Client-Ready Comments from Video Links or Scripts</p>
      </header>

      <main className="w-full max-w-3xl space-y-6">
        
        {/* Link Input Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <LinkIcon size={18} className="text-blue-400" /> Video URL (YouTube/Other)
          </label>
          <div className="flex gap-2">
            <input 
              type="text"
              className="flex-1 bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://youtube.com/watch?v=..."
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <button 
              onClick={handleExtractScript}
              disabled={isExtracting}
              className="bg-blue-600 hover:bg-blue-500 px-6 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isExtracting ? <RefreshCw className="animate-spin" size={18} /> : "Get Script"}
            </button>
          </div>
        </div>

        {/* Script TextArea Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <FileText size={18} className="text-purple-400" /> Video Script
          </label>
          <textarea
            className="w-full h-40 bg-slate-800/50 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
            placeholder="Script will appear here or paste manually..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
          
          <button
            onClick={handleGenerateComment}
            disabled={loading || !script}
            className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-30"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Send size={20} />}
            Generate Magic Comment
          </button>
        </div>

        {/* Comment Result */}
        {comment && (
          <div className="bg-slate-900/90 border border-purple-500/40 p-6 rounded-2xl animate__animated animate__fadeInUp">
             <div className="flex justify-between mb-3 text-purple-400 font-bold uppercase text-xs tracking-widest">
                <span>AI Generated Comment</span>
                <button onClick={() => {navigator.clipboard.writeText(comment); alert("Copied!")}} className="hover:text-white transition-colors flex items-center gap-1 text-[10px]">
                  <Copy size={14} /> COPY
                </button>
             </div>
             <p className="text-slate-200 italic leading-relaxed font-light">"{comment}"</p>
          </div>
        )}

      </main>
      
      <footer className="mt-8 text-slate-500 text-[12px]">© 2024 ScriptSpark AI | Effortless Freelancing</footer>
    </div>
  );
};

export default LinkToScript;