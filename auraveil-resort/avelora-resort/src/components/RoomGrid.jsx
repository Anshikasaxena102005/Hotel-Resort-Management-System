import React, { useState } from 'react';
import RoomCard from './RoomCard';
import { rooms } from '../data/rooms';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function RoomGrid({ onQuickReserve }) {
  const [filter, setFilter] = useState('all');

  const filterCategories = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'suites', label: 'Suites & Penthouse' },
    { id: 'villas', label: 'Private Villas' },
    { id: 'ocean', label: 'Ocean View' },
    { id: 'garden', label: 'Garden Retreat' },
  ];

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'all') return true;
    if (filter === 'suites') return room.name.includes('Suite') || room.name.includes('Residence');
    if (filter === 'villas') return room.name.includes('Villa');
    if (filter === 'ocean') return room.view.toLowerCase().includes('ocean');
    if (filter === 'garden') return room.view.toLowerCase().includes('garden');
    return true;
  });

  return (
    <section id="rooms-listing" className="py-24 sm:py-32 bg-[#151515] text-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Accommodations</span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FAF9F5] tracking-tight">
            Stay Somewhere Extraordinary
          </h2>
          
          <p className="text-xs sm:text-sm text-[#8A877F] leading-relaxed max-w-xl mx-auto">
            Each of our six distinct sanctuaries offers seamless indoor-outdoor living, refined artisanal craftsmanship, and uncompromising seclusion.
          </p>

          <div className="w-12 h-[1px] bg-[#C8B89A]/60 mx-auto mt-6" />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-[#C8B89A]/15 pb-8">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 sm:px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-[#C8B89A] text-[#151515] font-semibold shadow-md'
                  : 'bg-[#1C1B19] text-[#8A877F] hover:text-[#FAF9F5] hover:bg-[#252420] border border-[#C8B89A]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rooms Listing Cards */}
        <div className="space-y-16 sm:space-y-24">
          {filteredRooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              onQuickReserve={onQuickReserve}
            />
          ))}
        </div>

        {/* Bottom Editorial Quote / Callout */}
        <div className="p-8 sm:p-14 bg-[#181715] border border-[#C8B89A]/20 text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A]">Personalized Stay Planning</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF9F5]">
            Looking for customized multi-villa bookings or extended private retreats?
          </h3>
          <p className="text-xs text-[#8A877F] max-w-lg mx-auto">
            Our private host concierge coordinates adjoining residences, private chef catering, and helicopter charters tailored to your party.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onQuickReserve(null)}
              className="inline-flex items-center px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-transparent text-[#C8B89A] border border-[#C8B89A] hover:bg-[#C8B89A] hover:text-[#151515] transition-all duration-300"
            >
              Inquire with Concierge
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
