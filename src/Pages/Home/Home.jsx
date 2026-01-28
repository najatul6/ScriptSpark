import React, { useState } from 'react';
import { Send, Sparkles, Copy, RefreshCw } from 'lucide-react';
// ১. নিচের ইমপোর্টটি অবশ্যই লাগবে
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [script, setScript] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // ২. API Key লোড করা (আপনার .env ফাইলে VITE_GEMINI_API_KEY থাকতে হবে)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleGenerate = async () => {
    if (!script) return alert("Please paste a script first!");
    
    setLoading(true);
    try {
      // ৩. Gemini Model কনফিগারেশন
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Context: You are a professional freelancer helper tool named ScriptSpark. 
        Input: A video script provided by a potential client.
        Task: Analyze the script and write a short, high-value, and engaging comment (2-3 sentences). 
        Goal: The comment should show that I understand their vision and make them want to reply or hire me. 
        Style: Professional, appreciative, and insightful. No generic phrases like "Great video".
        
        Video Script: ${script}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setComment(response.text());
    } catch (error) {
      console.error("AI Error:", error);
      alert("Something went wrong. Please check your API Key or Network!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!comment) return;
    navigator.clipboard.writeText(comment);
    alert("Copied to clipboard! 🚀");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 flex flex-col items-center">
      
      {/* Header */}
      <header className="mb-10 text-center animate__animated animate__fadeInDown">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          <Sparkles className="text-blue-400 w-10 h-10" /> ScriptSpark
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Turn video scripts into client-winning comments in seconds.</p>
      </header>

      <main className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-slate-300">Paste Video Script</label>
          <textarea
            className="w-full h-48 p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500 text-white"
            placeholder="Insert the video script here to analyze..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <Send size={20} />}
          {loading ? "AI is Crafting..." : "Generate Magic Comment"}
        </button>

        {/* Result Section */}
        {comment && (
          <div className="mt-8 animate__animated animate__fadeInUp">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-purple-400 font-semibold">Perfect Response for your Client:</h3>
              <button 
                onClick={copyToClipboard} 
                className="text-slate-400 hover:text-white flex items-center gap-1 text-sm transition-colors bg-white/5 px-3 py-1 rounded-md border border-white/10"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <div className="p-5 bg-slate-900/80 border border-purple-500/30 rounded-xl text-slate-200 leading-relaxed italic">
              "{comment}"
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-slate-500 text-sm">
        Built for Freelance Pros 🚀
      </footer>
    </div>
  );
};

export default Home;