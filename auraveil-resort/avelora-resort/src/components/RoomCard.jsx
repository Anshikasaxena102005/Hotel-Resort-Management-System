import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize2, Bed, Eye, ArrowRight, Sparkles, Check } from 'lucide-react';

export default function RoomCard({ room, index, onQuickReserve }) {
  const isEven = index % 2 === 0;

  return (
    <article
      id={room.slug}
      className="group relative bg-[#181715] border border-[#C8B89A]/15 overflow-hidden transition-all duration-700 hover:border-[#C8B89A]/40"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* Editorial Image Column (7 cols on desktop) */}
        <div className={`lg:col-span-7 relative overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="absolute inset-0 luxury-image-wrapper">
            <img
              src={room.image}
              alt={`${room.name} - Luxury Interior at Auraveil Resort`}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
          </div>
          
          {/* Subtle Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
          
          {/* Floating Tag */}
          <div className="absolute top-6 left-6 z-10">
            <span className="inline-flex items-center px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#151515]/85 backdrop-blur-md text-[#C8B89A] border border-[#C8B89A]/30">
              {room.view}
            </span>
          </div>

          {/* Quick Price Badge for Mobile */}
          <div className="absolute bottom-6 left-6 z-10 lg:hidden text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Starting from</span>
            <span className="font-serif text-2xl text-[#FAF9F5] font-light">{room.formattedPrice} <span className="text-xs text-[#8A877F] font-sans">/ night</span></span>
          </div>
        </div>

        {/* Editorial Information Column (5 cols on desktop) */}
        <div className={`lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Top Info: Tagline, Title & Description */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">
                Sanctuary 0{index + 1}
              </span>
              <span className="hidden lg:inline-block text-xs uppercase tracking-[0.15em] text-[#8A877F]">
                {room.size}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] tracking-tight group-hover:text-[#C8B89A] transition-colors duration-300">
              <Link to={`/rooms/${room.id}`}>
                {room.name}
              </Link>
            </h3>

            <p className="text-xs sm:text-sm text-[#8A877F] leading-relaxed line-clamp-3">
              {room.shortDescription}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-3.5 py-4 border-y border-[#C8B89A]/15 text-xs text-[#FAF9F5]/80">
            <div className="flex items-center space-x-2.5">
              <Users className="w-4 h-4 text-[#C8B89A] shrink-0" />
              <span>{room.guests} Guests</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Bed className="w-4 h-4 text-[#C8B89A] shrink-0" />
              <span>{room.bed}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Maximize2 className="w-4 h-4 text-[#C8B89A] shrink-0" />
              <span>{room.size}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Eye className="w-4 h-4 text-[#C8B89A] shrink-0" />
              <span className="truncate">{room.view}</span>
            </div>
          </div>

          {/* Highlighted Amenities Chips */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A877F] block">
              Highlighted Amenities
            </span>
            <div className="flex flex-wrap gap-2">
              {room.highlightAmenities.map((amenity, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-[11px] bg-[#201F1C] border border-[#C8B89A]/15 text-[#FAF9F5]/85"
                >
                  <Check className="w-3 h-3 text-[#C8B89A]" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions: Price & Explore Button */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#C8B89A]/15">
            <div className="hidden lg:block">
              <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Nightly Rate</span>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-3xl text-[#FAF9F5] font-light">{room.formattedPrice}</span>
                <span className="text-xs text-[#8A877F]">/ night</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onQuickReserve(room.id)}
                className="px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[#C8B89A] hover:text-[#FAF9F5] border border-[#C8B89A]/30 hover:border-[#C8B89A] transition-colors"
                title="Quick Reserve"
              >
                Reserve
              </button>

              <Link
                to={`/rooms/${room.id}`}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-all duration-300 group/btn flex-1 sm:flex-none"
              >
                <span>Explore Room</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
