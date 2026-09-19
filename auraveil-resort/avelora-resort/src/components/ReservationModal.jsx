import React, { useState } from 'react';
import { X, Calendar, User, Check, Sparkles, BedDouble, ArrowRight } from 'lucide-react';
import { rooms } from '../data/rooms';

export default function ReservationModal({ isOpen, onClose, preselectedRoomId = null }) {
  const [selectedRoom, setSelectedRoom] = useState(preselectedRoomId || rooms[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync when preselected room changes
  React.useEffect(() => {
    if (preselectedRoomId) {
      setSelectedRoom(preselectedRoomId);
    }
  }, [preselectedRoomId]);

  if (!isOpen) return null;

  const currentRoom = rooms.find(r => r.id === selectedRoom) || rooms[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/80 animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-2xl bg-[#181715] border border-[#C8B89A]/30 text-[#FAF9F5] shadow-2xl rounded-none my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative gold line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8B89A] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#8A877F] hover:text-[#FAF9F5] transition-colors z-10"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C8B89A]/10 border border-[#C8B89A]/40 flex items-center justify-center text-[#C8B89A]">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8B89A] font-medium">Demo Reservation Confirmed</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] tracking-wide">We Await Your Arrival</h3>
              <p className="text-sm text-[#8A877F] max-w-md mx-auto leading-relaxed pt-2">
                Thank you, <span className="text-[#FAF9F5] font-medium">{fullName || 'Esteemed Guest'}</span>. Your inquiry for the <span className="text-[#C8B89A]">{currentRoom.name}</span> has been simulated. Our guest relations team would normally contact you with private itinerary details.
              </p>
            </div>

            <div className="p-4 bg-[#201F1C] border border-[#C8B89A]/20 text-xs text-[#8A877F] text-left space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#8A877F]">Sanctuary:</span>
                <span className="text-[#FAF9F5] font-medium">{currentRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A877F]">Standard Rate:</span>
                <span className="text-[#C8B89A] font-medium">{currentRoom.formattedPrice} / night</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A877F]">Guests:</span>
                <span className="text-[#FAF9F5]">{guests} Guests</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-all duration-300"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-1.5 border-b border-[#C8B89A]/15 pb-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">AURAVEIL PRIVATE RESERVE</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF9F5]">Plan Your Escape</h2>
              <p className="text-xs text-[#8A877F]">
                Experience extraordinary seclusion. Select your dates and preferred sanctuary.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Room Choice */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8A877F] mb-2 font-medium">
                  Select Sanctuary
                </label>
                <div className="relative">
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-sm px-4 py-3 appearance-none focus:outline-none focus:border-[#C8B89A] transition-colors"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id} className="bg-[#181715] text-[#FAF9F5]">
                        {room.name} — {room.formattedPrice} / night ({room.view})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#C8B89A]">
                    <BedDouble className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2.5 focus:outline-none focus:border-[#C8B89A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2.5 focus:outline-none focus:border-[#C8B89A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2.5 focus:outline-none focus:border-[#C8B89A] transition-colors"
                  >
                    <option value="1" className="bg-[#181715]">1 Guest</option>
                    <option value="2" className="bg-[#181715]">2 Guests</option>
                    <option value="3" className="bg-[#181715]">3 Guests</option>
                    <option value="4" className="bg-[#181715]">4 Guests</option>
                    <option value="6" className="bg-[#181715]">6+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lady / Sir / First & Last"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2.5 placeholder-[#8A877F]/60 focus:outline-none focus:border-[#C8B89A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2.5 placeholder-[#8A877F]/60 focus:outline-none focus:border-[#C8B89A] transition-colors"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8A877F] mb-1.5">
                  Personal Preferences / Special Requests
                </label>
                <textarea
                  rows="2"
                  placeholder="Dietary preferences, celebration details, arrival transfers..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-[#201F1C] border border-[#C8B89A]/30 text-[#FAF9F5] text-xs px-3.5 py-2 placeholder-[#8A877F]/60 focus:outline-none focus:border-[#C8B89A] transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C8B89A]/15">
                <div className="text-xs text-[#8A877F]">
                  Estimated Nightly: <span className="text-[#C8B89A] font-semibold">{currentRoom.formattedPrice}</span>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-[#8A877F] hover:text-[#FAF9F5] border border-transparent hover:border-[#8A877F]/40 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium bg-[#C8B89A] text-[#151515] hover:bg-[#DFD4BE] transition-colors"
                  >
                    <span>Request Reservation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
