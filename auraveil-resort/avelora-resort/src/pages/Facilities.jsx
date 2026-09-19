import React, { useState } from 'react';
import FacilityHero from '../components/FacilityHero';
import FacilitySection from '../components/FacilitySection';
import FacilityCard from '../components/FacilityCard';
import ReservationModal from '../components/ReservationModal';
import { facilities } from '../data/facilities';
import { Sparkles, ArrowRight, Grid, ListFilter } from 'lucide-react';

export default function Facilities() {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleExploreClick = () => {
    const section = document.getElementById('facilities-directory');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFacility = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#151515] text-[#FAF9F5] min-h-screen">
      {/* Hero Section */}
      <FacilityHero onExploreClick={handleExploreClick} />

      {/* Directory & Fast-Jump Navigation Bar */}
      <section id="facilities-directory" className="py-16 sm:py-20 bg-[#181715] border-y border-[#C8B89A]/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8B89A]/15 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
                RESORT DIRECTORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5]">
                Estate Amenities & Curated Experiences
              </h2>
            </div>

            <p className="text-xs text-[#8A877F] max-w-md leading-relaxed">
              Explore our ten dedicated facilities designed to ensure complete rejuvenation, privacy, and effortless indulgence.
            </p>
          </div>

          {/* Grid Overview for Quick Discovery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {facilities.map((fac, idx) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                index={idx}
                onSelect={scrollToFacility}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Editorial Long-form Facilities Sections */}
      <div className="divide-y divide-[#C8B89A]/10">
        {facilities.map((facility, index) => (
          <FacilitySection
            key={facility.id}
            facility={facility}
            index={index}
            onInquire={() => setReserveModalOpen(true)}
          />
        ))}
      </div>

      {/* Final Bespoke Concierge Callout */}
      <section className="py-24 sm:py-32 bg-[#121110] border-t border-[#C8B89A]/20 text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
            BESPOKE ITINERARIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF9F5]">
            Tailored Experiences Beyond the Expected
          </h2>
          <p className="text-xs sm:text-sm text-[#8A877F] leading-relaxed max-w-xl mx-auto">
            From private sandbank dinners to helicopter excursions and specialized wellness immersions, allow our concierge team to handcraft your days.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setReserveModalOpen(true)}
              className="inline-flex items-center space-x-2 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-all duration-300 shadow-xl"
            >
              <span>Consult with Private Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Reservation & Inquiry Modal */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
      />
    </div>
  );
}
