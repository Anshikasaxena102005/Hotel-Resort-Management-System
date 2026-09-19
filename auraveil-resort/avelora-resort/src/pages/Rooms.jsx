import React, { useState } from 'react';
import RoomHero from '../components/RoomHero';
import RoomGrid from '../components/RoomGrid';
import ReservationModal from '../components/ReservationModal';
import { Compass, Award, Droplets } from 'lucide-react';

export default function Rooms() {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleExploreClick = () => {
    const section = document.getElementById('rooms-listing');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickReserve = (roomId) => {
    setSelectedRoomId(roomId);
    setReserveModalOpen(true);
  };

  return (
    <div className="bg-[#151515] text-[#FAF9F5] min-h-screen">
      {/* Hero Section matching visual reference */}
      <RoomHero
        onExploreClick={handleExploreClick}
        onBookClick={() => setReserveModalOpen(true)}
      />

      {/* Brand Philosophy Editorial Strip */}
      <section className="py-20 sm:py-28 bg-[#181715] border-y border-[#C8B89A]/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold block">
                THE AURAVEIL PROMISE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] leading-tight">
                Architectural Harmony Meets Secluded Coastal Wilderness
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs text-[#8A877F] leading-relaxed border-t lg:border-t-0 lg:border-l border-[#C8B89A]/15 pt-8 lg:pt-0 lg:pl-12">
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-none bg-[#201F1C] border border-[#C8B89A]/30 flex items-center justify-center text-[#C8B89A]">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base text-[#FAF9F5] tracking-wide">Pristine Orientation</h3>
                <p>Every residence is positioned to capture optimal natural sunlight, coastal breezes, and uninterrupted views.</p>
              </div>

              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-none bg-[#201F1C] border border-[#C8B89A]/30 flex items-center justify-center text-[#C8B89A]">
                  <Droplets className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base text-[#FAF9F5] tracking-wide">Holistic Comfort</h3>
                <p>Organic materials, hypoallergenic bedding, and bespoke aromatherapy notes tailored to soothe the senses.</p>
              </div>

              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-none bg-[#201F1C] border border-[#C8B89A]/30 flex items-center justify-center text-[#C8B89A]">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base text-[#FAF9F5] tracking-wide">Intuitive Hospitality</h3>
                <p>Discreet, anticipatory 24-hour butler and host attention without compromising your sense of solitude.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Rooms Listing Grid */}
      <RoomGrid onQuickReserve={handleQuickReserve} />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        preselectedRoomId={selectedRoomId}
      />
    </div>
  );
}
