import React, { useState } from "react";
import { Send, Sparkles, Copy, RefreshCw, Briefcase } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import usePermissionCheck from "@/lib/usePermissionCheck";

const ScriptToComment = () => {
  const [script, setScript] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState("Web Developer");
  const { handleClick } = usePermissionCheck("ScriptToComment");
  const professions = [
    "Video Editor",
    "Web Developer",
    "SEO Specialist",
    "Graphic Designer",
    "Digital Marketer",
  ];

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleGenerate = async () => {
    if (!script) return toast.error("Please paste a script first!");

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Context: You are a professional ${profession} helper tool named ScriptSpark. 
        Input Script: "${script}"
        
        Task: Write a high-value, engaging comment from the perspective of a ${profession}.
        Guidelines:
        1. Show expert insight related to ${profession} (e.g., if Video Editor, mention pacing/visuals; if Web Dev, mention UI/conversion).
        2. Identify a specific hook in the script and praise it intelligently.
        3. End with a strategic question that makes the client want to discuss their project with a ${profession}.
        4. Tone: Professional, appreciative, and concise (2-3 sentences).
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setComment(response.text());
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Something went wrong. Please check your API Key!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!comment) return;
    navigator.clipboard.writeText(comment);
    toast.success("Copied to clipboard! 🚀");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 flex flex-col items-center">
      {/* Header */}
      <header className="mb-10 text-center animate__animated animate__fadeInDown">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          <Sparkles className="text-blue-400 w-10 h-10" /> ScriptSpark
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Generate expert comments as a{" "}
          <span className="text-blue-400">{profession}</span>
        </p>
      </header>

      <main className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        {/* Profession Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-300">
            <Briefcase size={16} className="text-blue-400" /> Select Your
            Profession
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
          >
            {professions.map((p) => (
              <option key={p} value={p} className="bg-slate-900">
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-slate-300">
            Paste Video Script
          </label>
          <textarea
            onClick={handleClick}
            className="w-full h-48 p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500 text-white"
            placeholder={`As a ${profession}, what do you think of this script? Paste it here...`}
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
          {loading ? (
            <RefreshCw className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
          {loading ? "AI is Crafting..." : "Generate Magic Comment"}
        </button>

        {/* Result Section */}
        {comment && (
          <div className="mt-8 animate__animated animate__fadeInUp">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-purple-400 font-semibold italic underline">
                Perfect Response as a {profession}:
              </h3>
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
    </div>
  );
};

export default ScriptToComment;
