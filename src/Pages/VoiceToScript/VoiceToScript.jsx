import React, { useState } from 'react';
import { Mic, Upload, RefreshCw, FileText } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';
import usePermissionCheck from '@/lib/usePermissionCheck';

const VoiceToScript = () => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const { handleClick } = usePermissionCheck("VoiceToScript");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent([
          "Please transcribe this audio file accurately. If it's a conversation, format it properly.",
          { inlineData: { data: base64Data, mimeType: file.type } }
        ]);
        
        setTranscript(result.response.text());
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Transcription failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 bg-slate-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 p-8 rounded-3xl text-center">
        <h2 className="text-xl md:text-3xl font-bold text-red-400 mb-6 flex items-center justify-center gap-2">
          <Mic /> Voice to Script AI
        </h2>

        <label onClick={handleClick} className="cursor-pointer w-full h-48 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all mb-6">
          <Upload size={48} className="text-slate-500 mb-2" />
          <p className="text-slate-400">{fileName ? fileName : "Upload Audio File (MP3, WAV, etc.)"}</p>
          <input type="file" className="hidden" onChange={handleAudioUpload} accept="audio/*" />
        </label>

        {loading && <div className="flex items-center justify-center gap-2 text-red-400 mb-6">
          <RefreshCw className="animate-spin" /> Transcribing Audio...
        </div>}

        {transcript && (
          <div className="text-left p-6 bg-slate-800 rounded-2xl border border-red-500/20">
            <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2"><FileText size={16}/> Transcript:</h3>
            <p className="text-slate-200 whitespace-pre-wrap italic leading-relaxed">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceToScript;