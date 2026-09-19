import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function RoomGallery({ gallery = [], roomName = '' }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
          VISUAL PERSPECTIVE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] tracking-tight">
          Inside Your Stay
        </h2>
        <p className="text-xs sm:text-sm text-[#8A877F] max-w-xl leading-relaxed">
          Explore the bespoke architectural nuances, materials, and private vistas that define this residence.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {gallery.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative cursor-pointer bg-[#181715] border border-[#C8B89A]/15 overflow-hidden transition-all duration-500 hover:border-[#C8B89A]/50"
          >
            <div className="aspect-4/3 w-full overflow-hidden luxury-image-wrapper">
              <img
                src={item.url}
                alt={item.caption || `${roomName} Photo ${index + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Hover overlay with caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-serif text-[#FAF9F5] tracking-wide">
                  {item.caption}
                </p>
                <div className="p-2 bg-[#151515]/80 text-[#C8B89A] rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-[#FAF9F5] hover:text-[#C8B89A] transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 text-[#FAF9F5]/70 hover:text-[#FAF9F5] bg-[#181715]/60 border border-[#C8B89A]/30 transition-all z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 text-[#FAF9F5]/70 hover:text-[#FAF9F5] bg-[#181715]/60 border border-[#C8B89A]/30 transition-all z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[activeImageIndex].url}
              alt={gallery[activeImageIndex].caption}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-[#C8B89A]/30"
            />
            <div className="text-center space-y-1">
              <p className="font-serif text-lg text-[#FAF9F5]">
                {gallery[activeImageIndex].caption}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A877F]">
                {roomName} — Image {activeImageIndex + 1} of {gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
