import React, { useState } from 'react';
import { ImageIcon, Upload, RefreshCw, Briefcase, Copy } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ImageToComment = () => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState('Graphic Designer'); 

  const professions = [
    'Graphic Designer',
    'Video Editor',
    'Web Developer',
    'SEO Specialist',
    'Digital Marketer'
  ];

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setComment(''); 
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
          Context: I am a professional ${profession}. 
          Task: Analyze this video thumbnail or image from the perspective of a ${profession}.
          
          Guidelines for the Comment:
          1. Praise a specific visual element (composition, lighting, or UI).
          2. As a ${profession}, mention how this visual impacts the audience (e.g., branding, CTR, or storytelling).
          3. Offer a very subtle professional suggestion or collaboration hint.
          4. Tone: Professional and admiring. Max 2-3 sentences. No generic "Nice work".
        `;

        const result = await model.generateContent([
          prompt,
          { inlineData: { data: base64Data, mimeType: file.type } }
        ]);
        
        setComment(result.response.text());
        setLoading(false);
      };
      reader.readAsDataURL(file);
      setImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Image analysis failed. Please try again.");
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(comment);
    alert("Copied! 🚀");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl animate__animated animate__fadeIn">
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
            <ImageIcon /> Image to Comment
          </h2>
          <p className="text-slate-400">Upload a thumbnail to get an expert critique & comment.</p>
        </header>

        {/* Profession Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-300">
            <Briefcase size={16} className="text-green-400" /> My Profession:
          </label>
          <select 
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
          >
            {professions.map((p) => (
              <option key={p} value={p} className="bg-slate-900">{p}</option>
            ))}
          </select>
        </div>
        
        {/* Upload Area */}
        <label className="cursor-pointer w-full h-72 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all mb-6 overflow-hidden relative group">
          {image ? (
            <>
              <img src={image} className="h-full w-full object-cover rounded-2xl" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white font-semibold">Change Image</p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <Upload size={48} className="text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400 font-medium">Click to upload Thumbnail/Screenshot</p>
              <p className="text-slate-600 text-xs mt-1">Supports JPG, PNG, WEBP</p>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center gap-2 mb-6">
            <RefreshCw className="animate-spin text-green-400" size={32} />
            <p className="text-green-400 text-sm animate-pulse">Analyzing visuals as a {profession}...</p>
          </div>
        )}
        
        {/* Result Area */}
        {comment && (
          <div className="p-6 bg-slate-900/80 border border-green-500/30 rounded-2xl animate__animated animate__fadeInUp relative group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">Generated Comment</span>
              <button onClick={copyToClipboard} className="text-slate-500 hover:text-white transition-colors">
                <Copy size={16} />
              </button>
            </div>
            <p className="text-slate-200 italic leading-relaxed">
              "{comment}"
            </p>
          </div>
        )}
      </div>

      <footer className="mt-8 text-slate-600 text-[10px] uppercase tracking-widest">
        Powered by Gemini 1.5 Flash Vision
      </footer>
    </div>
  );
};

export default ImageToComment;