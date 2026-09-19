import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import RoomAmenities from '../components/RoomAmenities';
import RoomGallery from '../components/RoomGallery';
import ReservationModal from '../components/ReservationModal';
import {
  ArrowLeft,
  Users,
  Maximize2,
  Bed,
  Eye,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserveModalOpen, setReserveModalOpen] = useState(false);

  // Find room by id or slug
  const room = rooms.find((r) => r.id === id || r.slug === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#151515] text-[#FAF9F5] flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="font-serif text-4xl text-[#C8B89A]">Sanctuary Not Found</h1>
        <p className="text-xs text-[#8A877F] max-w-md text-center">
          The requested room or suite could not be located in our registry.
        </p>
        <Link
          to="/rooms"
          className="inline-flex items-center space-x-2 px-6 py-3 text-xs uppercase tracking-[0.2em] bg-[#C8B89A] text-[#151515]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Rooms</span>
        </Link>
      </div>
    );
  }

  // Find other rooms for recommendation
  const otherRooms = rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <div className="bg-[#151515] text-[#FAF9F5] min-h-screen pb-24">
      
      {/* Full-width Image Hero */}
      <section className="relative h-[65vh] sm:h-[75vh] w-full overflow-hidden bg-[#181715]">
        <img
          src={room.heroImage || room.image}
          alt={`${room.name} Hero View`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/40 to-black/60" />

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-12">
          {/* Top Breadcrumb & Back Link */}
          <div>
            <Link
              to="/rooms"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#FAF9F5]/80 hover:text-[#C8B89A] transition-colors bg-[#151515]/60 backdrop-blur-md px-4 py-2 border border-[#C8B89A]/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Rooms</span>
            </Link>
          </div>

          {/* Bottom Hero Title & Eyebrow */}
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8B89A] font-semibold block">
              {room.tagline || 'AURAVEIL PRIVATE SANCTUARY'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF9F5] tracking-tight">
              {room.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8A877F] pt-2">
              <span className="text-[#C8B89A] font-serif text-xl sm:text-2xl font-normal">{room.formattedPrice} <span className="text-xs font-sans text-[#8A877F]">/ night</span></span>
              <span>•</span>
              <span>{room.size}</span>
              <span>•</span>
              <span>{room.view}</span>
              <span>•</span>
              <span>{room.guests} Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Two-Column Layout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-24">
        
        {/* Two-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Large Photography & Curator Notes (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative overflow-hidden border border-[#C8B89A]/20">
              <img
                src={room.image}
                alt={`${room.name} Interior Detail`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Curator Architectural Note */}
            {room.curatorNote && (
              <div className="p-6 sm:p-8 bg-[#181715] border-l-2 border-[#C8B89A] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold block">
                  Architectural Nuance
                </span>
                <p className="font-serif italic text-base sm:text-lg text-[#FAF9F5]/90 leading-relaxed">
                  "{room.curatorNote}"
                </p>
              </div>
            )}

            {/* Room Features Specifications Table */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-2xl text-[#FAF9F5]">Key Specifications</h3>
              <div className="border-t border-[#C8B89A]/15 divide-y divide-[#C8B89A]/10 text-xs">
                {room.features.map((feat, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center">
                    <span className="text-[#8A877F] uppercase tracking-wider">{feat.title}</span>
                    <span className="text-[#FAF9F5] font-medium">{feat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Key Specs, & Sticky Reservation Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            {/* Room Narrative */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold block">
                THE SANCTUARY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5]">
                Understated Elegance & Pure Comfort
              </h2>
              <p className="text-xs sm:text-sm text-[#8A877F] leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Key Metric Badges */}
            <div className="grid grid-cols-2 gap-3.5 p-5 bg-[#181715] border border-[#C8B89A]/15 text-xs text-[#FAF9F5]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Capacity</span>
                <div className="flex items-center space-x-2 font-medium">
                  <Users className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>{room.guests} Guests</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Bed Configuration</span>
                <div className="flex items-center space-x-2 font-medium">
                  <Bed className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>{room.bed}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Living Space</span>
                <div className="flex items-center space-x-2 font-medium">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>{room.size}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Vista</span>
                <div className="flex items-center space-x-2 font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span className="truncate">{room.view}</span>
                </div>
              </div>
            </div>

            {/* Reservation Callout Card */}
            <div className="p-6 sm:p-8 bg-[#181715] border border-[#C8B89A]/30 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#C8B89A]/15 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A877F] block">Tariff</span>
                  <span className="font-serif text-3xl text-[#FAF9F5]">{room.formattedPrice}</span>
                  <span className="text-xs text-[#8A877F]"> / night + taxes</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#C8B89A] block">Includes</span>
                  <span className="text-xs text-[#8A877F]">Breakfast & Transfers</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#8A877F]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>Complimentary Private Airport Arrival Escort</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>Signature Sunset Welcome Ritual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8B89A]" />
                  <span>24/7 Dedicated Floor Host Concierge</span>
                </div>
              </div>

              <button
                onClick={() => setReserveModalOpen(true)}
                className="w-full inline-flex items-center justify-center space-x-2 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-all duration-300 shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reserve Your Stay</span>
              </button>

              <p className="text-[11px] text-center text-[#8A877F]">
                Guaranteed Best Rate · Flexible Cancellation up to 7 days prior
              </p>
            </div>

          </div>
        </div>

        {/* Room Amenities Multi-Category Grid */}
        <div className="pt-8 border-t border-[#C8B89A]/15">
          <RoomAmenities amenities={room.amenities} />
        </div>

        {/* Room Gallery & Lightbox */}
        <div className="pt-8 border-t border-[#C8B89A]/15">
          <RoomGallery gallery={room.gallery} roomName={room.name} />
        </div>

        {/* Reserve CTA Section */}
        <div className="relative overflow-hidden bg-[#181715] border border-[#C8B89A]/30 p-8 sm:p-16 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] font-semibold">
              UNCOMPROMISED SECLUSION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF9F5]">
              Experience the {room.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#8A877F] leading-relaxed">
              Step into an extraordinary realm of tranquility. Secure your requested dates or speak directly with our private travel curator.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setReserveModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-colors"
              >
                Reserve Your Stay Now
              </button>
              <Link
                to="/rooms"
                className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-transparent border border-[#C8B89A]/40 text-[#FAF9F5] hover:border-[#C8B89A] transition-colors"
              >
                View All Sanctuaries
              </Link>
            </div>
          </div>
        </div>

        {/* Suggested Other Sanctuaries */}
        {otherRooms.length > 0 && (
          <div className="pt-12 border-t border-[#C8B89A]/15 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A]">ALTERNATIVE SANCTUARIES</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF9F5]">You May Also Appreciate</h3>
              </div>
              <Link
                to="/rooms"
                className="hidden sm:inline-flex items-center space-x-1 text-xs uppercase tracking-[0.15em] text-[#C8B89A] hover:underline"
              >
                <span>All 6 Sanctuaries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherRooms.map((other) => (
                <Link
                  key={other.id}
                  to={`/rooms/${other.id}`}
                  className="group bg-[#181715] border border-[#C8B89A]/15 hover:border-[#C8B89A]/40 p-6 space-y-4 block transition-colors"
                >
                  <div className="aspect-16/9 overflow-hidden luxury-image-wrapper">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif text-xl text-[#FAF9F5] group-hover:text-[#C8B89A] transition-colors">
                      {other.name}
                    </h4>
                    <span className="text-xs text-[#C8B89A] font-serif">{other.formattedPrice}</span>
                  </div>
                  <p className="text-xs text-[#8A877F] line-clamp-2">
                    {other.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        preselectedRoomId={room.id}
      />
    </div>
  );
}
