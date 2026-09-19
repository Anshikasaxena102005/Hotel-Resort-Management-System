import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FacilityCard({ facility, index, onSelect }) {
  return (
    <div
      onClick={() => onSelect(facility.slug)}
      className="group relative bg-[#181715] border border-[#C8B89A]/15 hover:border-[#C8B89A]/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-500 hover:-translate-y-1"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A]">
            0{index + 1}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A877F]">
            {facility.category}
          </span>
        </div>

        <div className="aspect-16/9 overflow-hidden luxury-image-wrapper border border-[#C8B89A]/10">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        <h3 className="font-serif text-2xl text-[#FAF9F5] group-hover:text-[#C8B89A] transition-colors">
          {facility.name}
        </h3>

        <p className="text-xs text-[#8A877F] line-clamp-2 leading-relaxed">
          {facility.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#C8B89A]/10 flex items-center justify-between text-xs text-[#C8B89A]">
        <span className="text-[11px] uppercase tracking-[0.18em] group-hover:underline">Explore Details</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}
