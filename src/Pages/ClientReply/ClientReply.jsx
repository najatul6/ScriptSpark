import React, { useState } from "react";
import { MessageSquare, Send, Copy, RefreshCw, Briefcase } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import usePermissionCheck from "@/lib/usePermissionCheck";

const ClientReply = () => {
  const [clientMsg, setClientMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState("Web Developer");
  const { handleClick } = usePermissionCheck("ClientReply");
  const professions = [
    "Video Editor",
    "Web Developer",
    "SEO Specialist",
    "Graphic Designer",
    "Digital Marketer",
  ];

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleReply = async () => {
    if (!clientMsg)
      return toast.error("Please paste the client's message first!");

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Context: I am a professional ${profession} freelancer. 
        Client Message: "${clientMsg}"
        
        Task: Write a highly professional, polite, and persuasive reply from a ${profession}'s perspective.
        Guidelines:
        1. Address the client's core point or concern effectively.
        2. If the client mentions budget, emphasize the quality and ROI of ${profession} services.
        3. Keep the tone confident but helpful.
        4. End with a subtle "Call to Action" that keeps the conversation alive.
        5. Style: Clear, concise, and expert-level.
      `;

      const result = await model.generateContent(prompt);
      setReply(result.response.text());
    } catch (error) {
      console.error("Reply Error:", error);
      toast.error("Failed to generate a reply. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply);
    toast.success("Reply copied to clipboard! 📋");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-900 flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl animate__animated animate__fadeIn">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-purple-400 flex items-center gap-2">
            <MessageSquare /> Client Reply Master
          </h2>
          <p className="text-slate-400 mt-1">
            Transform tough client messages into winning opportunities.
          </p>
        </header>

        {/* Profession Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-300">
            <Briefcase size={16} className="text-purple-400" /> My Role:
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          >
            {professions.map((p) => (
              <option key={p} value={p} className="bg-slate-900">
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Client Message Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            The Client Said:
          </label>
          <textarea
            onClick={handleClick}
            className="w-full h-40 bg-slate-800/50 border border-slate-700 p-4 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-600"
            placeholder="Example: 'Your price is too high' or 'Can you finish this in 2 hours?'"
            value={clientMsg}
            onChange={(e) => setClientMsg(e.target.value)}
          />
        </div>

        {/* Action Button */}
        
          <button
            onClick={handleReply}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-purple-900/20"
          >
            {loading ? (
              <RefreshCw className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            {loading ? "Thinking of a reply..." : "Generate Perfect Reply"}
          </button>
        

        {/* AI Result Area */}
        {reply && (
          <div className="mt-8 animate__animated animate__fadeInUp">
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-purple-400 text-sm font-semibold">
                Recommended Response:
              </h3>
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors"
              >
                <Copy size={14} /> Copy Reply
              </button>
            </div>
            <div className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-2xl text-slate-200 leading-relaxed whitespace-pre-line shadow-inner">
              {reply}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ClientReply;
