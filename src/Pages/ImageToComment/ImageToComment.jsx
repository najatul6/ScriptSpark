import React, { useState } from 'react';
import { ImageIcon, Upload, RefreshCw } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ImageToComment = () => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent([
          "Analyze this video thumbnail or image and write a professional comment to the creator praising their visual work and offering collaboration.",
          { inlineData: { data: base64Data, mimeType: file.type } }
        ]);
        
        setComment(result.response.text());
        setLoading(false);
      };
      reader.readAsDataURL(file);
      setImage(URL.createObjectURL(file));
    } catch (error) {
      alert("Image analysis failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 p-8 rounded-3xl text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-6 flex items-center justify-center gap-2">
          <ImageIcon /> Image to Comment
        </h2>
        
        <label className="cursor-pointer w-full h-64 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all mb-6">
          {image ? <img src={image} className="h-full rounded-2xl object-cover" /> : (
            <>
              <Upload size={48} className="text-slate-500 mb-2" />
              <p className="text-slate-400">Click to upload Thumbnail/Screenshot</p>
            </>
          )}
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>

        {loading && <RefreshCw className="animate-spin mx-auto text-green-400" size={32} />}
        
        {comment && (
          <div className="p-6 bg-slate-900/80 border border-green-500/30 rounded-2xl text-left">
            <p className="text-slate-200 italic">"{comment}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToComment;