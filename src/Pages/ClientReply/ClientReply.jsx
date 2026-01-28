import React, { useState } from 'react';
import { MessageSquare, Send, Copy, RefreshCw } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ClientReply = () => {
  const [clientMsg, setClientMsg] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleReply = async () => {
    if (!clientMsg) return alert("Paste client message!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `A client sent me this message: "${clientMsg}". I am a freelancer. Write a professional, polite, and persuasive reply that keeps the conversation going and increases my chances of getting the job.`;
      const result = await model.generateContent(prompt);
      setReply(result.response.text());
    } catch (error) {
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center gap-2">
          <MessageSquare /> Client Reply Master
        </h2>
        <textarea
          className="w-full h-40 bg-slate-800/50 border border-slate-700 p-4 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 outline-none mb-4"
          placeholder="Paste the message from your client (e.g., 'Your price is too high')..."
          value={clientMsg}
          onChange={(e) => setClientMsg(e.target.value)}
        />
        <button
          onClick={handleReply}
          disabled={loading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <Send size={20} />}
          Generate Perfect Reply
        </button>

        {reply && (
          <div className="mt-8 p-6 bg-slate-900/80 border border-purple-500/30 rounded-2xl">
            <p className="text-slate-200">{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientReply;