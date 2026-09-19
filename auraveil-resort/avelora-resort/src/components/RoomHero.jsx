import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function RoomHero({ onExploreClick, onBookClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#151515]">
      {/* Background Image with Cinematic Palace / Resort Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=90"
          alt="Auraveil Luxury Resort & Spa Estate"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/40 to-black/55" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-28 pb-20 flex flex-col items-center">
        {/* Eyebrow matching image */}
        <div className="mb-6 animate-in fade-in duration-700">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C8B89A] font-semibold">
            EST. 1998 · PRIVATE TROPICAL SANCTUARY
          </span>
        </div>

        {/* Main Heading matching image: Where Luxury Finds Its Meaning */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#FAF9F5] font-normal tracking-tight leading-[1.05] mb-6 drop-shadow-md">
          Where Luxury <br />
          <span className="italic font-light">Finds Its Meaning</span>
        </h1>

        {/* Subheading matching image */}
        <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-[#FAF9F5]/90 font-light leading-relaxed tracking-wide mb-10">
          Immerse yourself in a world of unhurried elegance — bespoke suites, curated experiences, and timeless service woven into every moment of your stay.
        </p>

        {/* Dual Hero Buttons matching image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-all duration-300 shadow-xl cursor-pointer"
          >
            Explore Rooms
          </button>
          
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-black/40 backdrop-blur-sm border border-[#FAF9F5]/40 text-[#FAF9F5] hover:border-[#C8B89A] hover:text-[#C8B89A] transition-all duration-300 cursor-pointer"
          >
            Book Your Stay
          </button>
        </div>

        {/* SCROLL Indicator matching image */}
        <div
          onClick={onExploreClick}
          className="flex flex-col items-center space-y-2 cursor-pointer group"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#8A877F] group-hover:text-[#C8B89A] transition-colors">
            SCROLL
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#C8B89A] to-transparent group-hover:h-12 transition-all duration-300" />
        </div>
      </div>
    </section>
  );
}
