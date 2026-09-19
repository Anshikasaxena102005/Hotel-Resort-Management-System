import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#151515] text-[#FAF9F5] flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-[#C8B89A]">404 ERROR</span>
      <h1 className="font-serif text-5xl sm:text-6xl text-[#FAF9F5]">Sanctuary Not Located</h1>
      <p className="text-xs sm:text-sm text-[#8A877F] max-w-md leading-relaxed">
        The retreat page you are seeking is either secluded or does not exist. Let us guide you back to our curated accommodations.
      </p>
      <div className="pt-2">
        <Link
          to="/rooms"
          className="inline-flex items-center space-x-2 px-6 py-3 text-xs uppercase tracking-[0.2em] bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Rooms & Suites</span>
        </Link>
      </div>
    </div>
  );
}
