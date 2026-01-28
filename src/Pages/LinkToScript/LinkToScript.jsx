import React, { useState } from 'react';
import { Send, Sparkles, Copy, RefreshCw, Link as LinkIcon, FileText, Briefcase } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';

const LinkToScript = () => {
  const [videoLink, setVideoLink] = useState(''); 
  const [script, setScript] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [profession, setProfession] = useState('Video Editor');

  const professions = [
    'Video Editor', 
    'Web Developer', 
    'SEO Specialist', 
    'Graphic Designer', 
    'Digital Marketer'
  ];

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleExtractScript = async () => {
    if (!videoLink) return toast.error("Please paste a video link first!");
    
    setIsExtracting(true);
    setScript('');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Context: I am a ${profession}. I am providing a video link: ${videoLink}. 
        Task: 
        1. Please provide a detailed transcript or a clear summary of the script of this video. 
        2. If you cannot access the link directly, analyze the video title and metadata from the URL and provide a structured script summary that a ${profession} would find useful.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setScript(response.text()); 
    } catch (error) {
      console.error("Link Error:", error);
      toast.error("AI could not access this link directly. Try pasting the script manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerateComment = async () => {
    if (!script) return toast.error("Script is empty!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Context: I am a professional ${profession}. 
        Script Content: "${script}"
        
        Task: Write a high-value, professional, and impressive comment for the creator.
        Guidelines:
        1. Show that I have watched/analyzed the content as a ${profession}.
        2. Mention a specific technical or creative point from the script.
        3. End with a strategic question or suggestion that positions me as an expert ${profession}.
        4. Tone: Appreciative but professional. Max 3 sentences.
      `;

      const result = await model.generateContent(prompt);
      setComment(result.response.text());
    } catch (error) {
      toast.error("Comment generation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 flex flex-col items-center font-sans">
      
      <header className="mb-8 text-center animate__animated animate__fadeInDown">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-3">
          <Sparkles size={40} className="text-blue-400" /> ScriptSpark
        </h1>
        <p className="text-slate-400 mt-2">Extract Scripts & Generate Expert Comments as a <span className="text-blue-400 font-bold">{profession}</span></p>
      </header>

      <main className="w-full max-w-3xl space-y-6">

        {/* Profession Selector */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Briefcase size={18} className="text-blue-400" /> Select Your Profession
          </label>
          <select 
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
          >
            {professions.map((p) => (
              <option key={p} value={p} className="bg-slate-900">{p}</option>
            ))}
          </select>
        </div>
        
        {/* Link Input Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <LinkIcon size={18} className="text-blue-400" /> Video URL (YouTube/Other)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
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
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
            >
              {isExtracting ? <RefreshCw className="animate-spin" size={18} /> : "Get Script"}
            </button>
          </div>
        </div>

        {/* Script TextArea Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <FileText size={18} className="text-purple-400" /> Analyzed Script / Summary
          </label>
          <textarea
            className="w-full h-48 bg-slate-800/50 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-slate-200"
            placeholder="Script will appear here after clicking 'Get Script'..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
          
          <button
            onClick={handleGenerateComment}
            disabled={loading || !script}
            className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Send size={20} />}
            Generate Magic Comment as {profession}
          </button>
        </div>

        {/* Comment Result */}
        {comment && (
          <div className="bg-slate-900/90 border border-purple-500/40 p-6 rounded-2xl animate__animated animate__fadeInUp">
             <div className="flex justify-between mb-3 text-purple-400 font-bold uppercase text-xs tracking-widest">
                <span>AI Expert Response</span>
                <button onClick={() => {navigator.clipboard.writeText(comment); toast.success("Copied! 🚀")}} className="hover:text-white transition-colors flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded">
                  <Copy size={14} /> COPY
                </button>
             </div>
             <p className="text-slate-200 italic leading-relaxed">"{comment}"</p>
          </div>
        )}

      </main>
      
      <footer className="mt-8 text-slate-500 text-[12px]">© 2024 ScriptSpark AI | Effortless Freelancing</footer>
    </div>
  );
};

export default LinkToScript;