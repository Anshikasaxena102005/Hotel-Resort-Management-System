import React from 'react';
import { Sparkles, Clock, MapPin, Check, ArrowRight } from 'lucide-react';

export default function FacilitySection({ facility, index, onInquire }) {
  const isEven = index % 2 === 0;
  // Alternate section themes: mostly dark luxury charcoal, with occasional warm ivory/cream editorial section
  const isLightSection = index === 1 || index === 4; // Spa & Private Beach on warm cream!

  return (
    <section
      id={facility.slug}
      className={`py-20 sm:py-28 transition-colors ${
        isLightSection
          ? 'bg-[#F4F0E8] text-[#151515]'
          : 'bg-[#151515] text-[#FAF9F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column (7 cols) */}
          <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative overflow-hidden group border border-[#C8B89A]/25">
              <div className="aspect-16/10 w-full overflow-hidden luxury-image-wrapper">
                <img
                  src={facility.image}
                  alt={`${facility.name} at Auraveil Luxury Resort`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className={`px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-medium border backdrop-blur-md ${
                  isLightSection
                    ? 'bg-[#FAF9F5]/90 text-[#151515] border-[#151515]/20'
                    : 'bg-[#151515]/85 text-[#C8B89A] border-[#C8B89A]/30'
                }`}>
                  0{index + 1} · {facility.category}
                </span>
              </div>
            </div>

            {/* Supporting Image & Pull Quote Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
              {facility.secondaryImage && (
                <div className="sm:col-span-5 relative overflow-hidden border border-[#C8B89A]/20">
                  <div className="aspect-4/3 overflow-hidden luxury-image-wrapper">
                    <img
                      src={facility.secondaryImage}
                      alt={`${facility.name} Detail`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              <div className={facility.secondaryImage ? "sm:col-span-7" : "sm:col-span-12"}>
                <blockquote className={`font-serif italic text-base sm:text-lg leading-relaxed border-l-2 pl-4 ${
                  isLightSection
                    ? 'text-[#44423C] border-[#A89574]'
                    : 'text-[#C8B89A] border-[#C8B89A]/60'
                }`}>
                  "{facility.quote}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Text & Content Column (5 cols) */}
          <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="space-y-3">
              <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold block ${
                isLightSection ? 'text-[#8C764E]' : 'text-[#C8B89A]'
              }`}>
                {facility.tagline}
              </span>
              
              <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight ${
                isLightSection ? 'text-[#151515]' : 'text-[#FAF9F5]'
              }`}>
                {facility.name}
              </h2>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${
              isLightSection ? 'text-[#4A4740]' : 'text-[#8A877F]'
            }`}>
              {facility.description}
            </p>

            <p className={`text-xs sm:text-sm leading-relaxed ${
              isLightSection ? 'text-[#5E5A52]' : 'text-[#A8A59E]'
            }`}>
              {facility.longDescription}
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-2">
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium block ${
                isLightSection ? 'text-[#8C764E]' : 'text-[#8A877F]'
              }`}>
                Distinctive Provisions
              </span>
              <ul className="space-y-2">
                {facility.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2.5 text-xs">
                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      isLightSection ? 'text-[#8C764E]' : 'text-[#C8B89A]'
                    }`} />
                    <span className={isLightSection ? 'text-[#33312C]' : 'text-[#FAF9F5]/85'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metadata (Hours & Location) */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t text-xs ${
              isLightSection ? 'border-[#151515]/15 text-[#5E5A52]' : 'border-[#C8B89A]/15 text-[#8A877F]'
            }`}>
              <div className="flex items-start space-x-2">
                <Clock className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isLightSection ? 'text-[#8C764E]' : 'text-[#C8B89A]'}`} />
                <div>
                  <span className="block font-medium text-[10px] uppercase tracking-wider">Operating Hours</span>
                  <span>{facility.hours}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isLightSection ? 'text-[#8C764E]' : 'text-[#C8B89A]'}`} />
                <div>
                  <span className="block font-medium text-[10px] uppercase tracking-wider">Location</span>
                  <span>{facility.location}</span>
                </div>
              </div>
            </div>

            {/* Inquire Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onInquire}
                className={`inline-flex items-center space-x-2 px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  isLightSection
                    ? 'bg-[#151515] text-[#FAF9F5] hover:bg-[#33312D]'
                    : 'bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE]'
                }`}
              >
                <span>Reserve Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
