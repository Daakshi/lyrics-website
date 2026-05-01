"use client";

import Container from './Container';
import { useState, useRef } from 'react';

const Hero = ({ songs, search, loading }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className='relative max-w-7xl mx-auto px-6 py-12 md:py-20'>
      {!search && (
        <div className='relative overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl shadow-black/40 min-h-[500px] flex flex-col justify-center px-8 md:px-20 bg-gradient-to-br from-[#2D1A1A] via-[#3D1A1A] to-[#1A0E0E]'>
          {/* Decorative Light Elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full"></div>

          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=2574&auto=format&fit=crop" 
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className='relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20 animate-fadeInScale'>
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-amber-400 blur-3xl rounded-full opacity-30"></div>
              <img
                src='https://paintwaint.in/cdn/shop/files/Untitled_53_dff00bc8-73b6-4230-b199-3b1ff8916894.png?v=1729090546'
                className='relative rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-8 border-white/10 shadow-2xl transition-transform duration-700 hover:scale-105 select-none'
                alt='logo'
              />
            </div>
            
            <div 
              className="text-center md:text-left max-w-2xl relative"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
            >
              {/* Sharp Text (hides where mouse is) */}
              <h1 
                className='text-white text-5xl md:text-7xl font-serif font-black tracking-tight leading-tight transition-all duration-75'
                style={{
                  WebkitMaskImage: mousePos.x !== -1000 ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)` : 'none',
                  maskImage: mousePos.x !== -1000 ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)` : 'none',
                }}
              >
                Feel the devotion. <br />
                <span className="text-amber-400">Live the bhajans.</span>
              </h1>

              {/* Blurred Text (appears where mouse is) */}
              <h1 
                className='absolute top-0 left-0 text-white text-5xl md:text-7xl font-serif font-black tracking-tight leading-tight pointer-events-none blur-[8px] transition-all duration-75'
                style={{
                  WebkitMaskImage: mousePos.x !== -1000 ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)` : 'none',
                  maskImage: mousePos.x !== -1000 ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)` : 'none',
                  opacity: mousePos.x === -1000 ? 0 : 1
                }}
                aria-hidden="true"
              >
                Feel the devotion. <br />
                <span className="text-amber-400">Live the bhajans.</span>
              </h1>

              <p className='text-white/70 text-lg md:text-xl font-medium leading-relaxed mt-6'>
                Explore the divine collection of bhajans, lyrics and meanings. Immerse in devotion with every verse.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={search ? 'mt-4' : 'mt-20'}>
        <h2 className="text-[#5D1E1E] font-serif text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4">
          {search ? (
            <>Search Results for <span className="text-amber-600">"{search}"</span></>
          ) : (
            <>Bhajan <span className="text-amber-600">Lyrics</span></>
          )}
          <div className="h-0.5 grow bg-red-900/10 rounded-full"></div>
        </h2>
        <Container songs={songs} search={search} loading={loading} />
      </div>
    </div>
  );
};

export default Hero;
