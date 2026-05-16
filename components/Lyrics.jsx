"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import Link from "next/link";

const Lyrics = ({ song }) => {
  const [copied, setCopied] = useState(false);

  const copyLyrics = async () => {
    try {
      await navigator.clipboard.writeText(song.lyrics);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed: ", err);
    }
  };
  return (
    <div className="max-w-6xl mx-auto animate-fadeInScale px-4">
      <Link
        href="/"
        className="text-[#5D1E1E] font-serif font-bold flex items-center gap-2 mb-10 hover:text-[#C07A2B] transition-colors inline-flex"
      >
        <ArrowLeft size={24} />
        <span>Back to Collection</span>
      </Link>

      <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-6 md:p-16 border border-red-900/5 shadow-2xl shadow-red-900/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          {/* Side Artwork Placeholder */}
          <div className="shrink-0 w-full md:w-80 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={song.image || "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=600&auto=format&fit=crop"} 
                alt={song.title} 
                className="w-full h-full object-cover"
              />
          </div>

          <div className="flex-grow">
            <h2 className="text-[#5D1E1E] font-serif font-black text-5xl md:text-7xl mb-4 leading-tight">
              {song.title}
            </h2>
            {song.artist && (
              <p className="text-[#C07A2B] font-serif text-xl mb-4 font-medium">
                {song.artist}
              </p>
            )}
            <div className="h-1 w-24 bg-amber-500 rounded-full mb-10"></div>
            
            <div className="flex flex-wrap gap-4 mb-12 items-center">
              <button
                onClick={copyLyrics}
                className="bg-red-900 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all flex items-center gap-3"
              >
                {copied ? "✓ Copied!" : "Copy Lyrics"}
              </button>

              {song.youtubeUrl && (
                <div className="flex items-center gap-2 text-[#5D1E1E] font-serif font-bold">
                  <span>To listen:</span>
                  <a 
                    href={song.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#C07A2B] hover:underline"
                  >
                    Click Here
                  </a>
                </div>
              )}
            </div>

            <div className="bg-[#FDF8F1] border border-red-900/5 rounded-[2rem] p-6 md:p-12 shadow-inner mb-8">
               <pre className="whitespace-pre-wrap font-serif text-xl md:text-2xl leading-relaxed text-[#2D1A1A]">
                  {song.lyrics}
               </pre>
            </div>

            {song.youtubeUrl && (
              <div className="flex items-center gap-2 text-[#5D1E1E] font-serif font-bold text-lg md:text-xl">
                <span>To listen:</span>
                <a 
                  href={song.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#C07A2B] hover:underline flex items-center gap-1"
                >
                  Click Here <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lyrics;
