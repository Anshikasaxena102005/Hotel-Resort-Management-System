import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

export default function FacilityHero({ onExploreClick }) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#151515]">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2400&q=90"
          alt="Auraveil Holistic Spa and Wellness Pavilion"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Editorial gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/65 to-[#151515]/40" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 border border-[#C8B89A]/30 bg-[#181715]/60 backdrop-blur-sm mb-6 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#C8B89A]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8B89A] font-medium">
            RESORT PROVISIONS & WELLNESS
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#FAF9F5] font-light tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
          Facilities & Experiences
        </h1>

        {/* Decorative Gold Bar */}
        <div className="w-16 h-[1.5px] bg-[#C8B89A] mb-8" />

        {/* Subheading */}
        <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#FAF9F5]/90 font-light leading-relaxed tracking-wide mb-10">
          Every detail has been considered to make your stay effortless, restorative and unforgettable.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 pb-6 text-xs uppercase tracking-[0.2em] text-[#8A877F] border-t border-[#C8B89A]/20 max-w-2xl w-full">
          <span>Aquatics</span>
          <span className="text-[#C8B89A]">·</span>
          <span>Holistic Spa</span>
          <span className="text-[#C8B89A]">·</span>
          <span>Signature Dining</span>
          <span className="text-[#C8B89A]">·</span>
          <span>Secluded Coast</span>
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={onExploreClick}
          className="mt-6 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#FAF9F5]/80 hover:text-[#C8B89A] transition-colors group cursor-pointer"
        >
          <span>Discover Experiences</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
