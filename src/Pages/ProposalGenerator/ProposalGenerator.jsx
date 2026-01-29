import React, { useState } from "react";
import {
  Send,
  Copy,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import usePermissionCheck from "@/lib/usePermissionCheck";

const ProposalGenerator = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState("Video Editor");
  const { handleClick } = usePermissionCheck("ProposalGenerator");
  const professions = [
    "Video Editor",
    "Web Developer",
    "SEO Specialist",
    "Graphic Designer",
    "Content Writer",
  ];
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleGenerate = async () => {
    if (!jobDesc) return toast.error("Please paste the job description!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Context: I am a professional ${profession}. 
        Job Description: "${jobDesc}"
        Task: Write a high-converting, personalized freelance proposal for this job.
        Guidelines:
        1. Start with a strong hook that shows I read the job description.
        2. Briefly mention my expertise as a ${profession}.
        3. Explain how I will solve the client's specific problem.
        4. Include a clear Call to Action (CTA) and keep it under 200 words.
        5. Tone: Professional and confident.
      `;
      const result = await model.generateContent(prompt);
      setProposal(result.response.text());
    } catch (error) {
      toast.error("Error generating proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 flex items-center gap-2">
          <Sparkles /> Project Proposal AI
        </h2>

        <div className="mb-6">
          <label className="text-slate-300 text-sm mb-2 block">
            Your Profession:
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white outline-none"
          >
            {professions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <textarea
          onClick={handleClick}
          className="w-full h-48 bg-slate-800/50 border border-slate-700 p-4 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none mb-4"
          placeholder="Paste the Job Description here (from Upwork, Fiverr, etc.)..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          {loading ? (
            <RefreshCw className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
          Generate Winning Proposal
        </button>

        {proposal && (
          <div className="mt-8 p-6 bg-slate-900/80 border border-orange-500/30 rounded-2xl relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(proposal);
                toast.success("Copied!");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <Copy size={18} />
            </button>
            <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
              {proposal}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalGenerator;
