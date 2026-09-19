import React from 'react';
import { Bed, Bath, Coffee, Tv, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function RoomAmenities({ amenities = [] }) {
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'comfort & rest':
        return <Bed className="w-4 h-4 text-[#C8B89A]" />;
      case 'bathroom & spa':
        return <Bath className="w-4 h-4 text-[#C8B89A]" />;
      case 'refreshments & bar':
        return <Coffee className="w-4 h-4 text-[#C8B89A]" />;
      case 'technology & entertainment':
        return <Tv className="w-4 h-4 text-[#C8B89A]" />;
      case 'services & convenience':
        return <ShieldCheck className="w-4 h-4 text-[#C8B89A]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#C8B89A]" />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
          ELEVATED COMFORTS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] tracking-tight">
          Room Amenities & Provisions
        </h2>
        <p className="text-xs sm:text-sm text-[#8A877F] max-w-xl leading-relaxed">
          Every amenity is selected to elevate your stay, blending thoughtful convenience with sensory indulgence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {amenities.map((group, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-[#181715] border border-[#C8B89A]/15 hover:border-[#C8B89A]/30 transition-colors space-y-4"
          >
            <div className="flex items-center space-x-3 pb-3 border-b border-[#C8B89A]/15">
              <div className="p-2 bg-[#201F1C] border border-[#C8B89A]/20">
                {getCategoryIcon(group.category)}
              </div>
              <h3 className="font-serif text-lg text-[#FAF9F5] tracking-wide">
                {group.category}
              </h3>
            </div>

            <ul className="space-y-2.5">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start space-x-2.5 text-xs text-[#FAF9F5]/75 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8B89A] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
