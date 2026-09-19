import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ReservationModal from './ReservationModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/rooms' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Services', path: '/facilities#services' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#151515]/90 backdrop-blur-md border-b border-[#C8B89A]/15 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo matching screenshot: Auraveil RESORT & SPA */}
          <Link
            to="/rooms"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.08em] text-[#FAF9F5] font-normal group-hover:text-[#C8B89A] transition-colors duration-300">
              Auraveil
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-[#C8B89A] font-light -mt-0.5">
              RESORT & SPA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link) => {
              const isActive = (link.path === '/rooms' && location.pathname === '/rooms') ||
                               (link.path === '/facilities' && location.pathname === '/facilities');
              
              if (link.path.startsWith('#')) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#FAF9F5]/85 hover:text-[#C8B89A] transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#C8B89A] font-semibold'
                      : 'text-[#FAF9F5]/85 hover:text-[#FAF9F5]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8B89A] animate-in fade-in duration-300" />
                  )}
                </Link>
              );
            })}

            <button
              onClick={() => setReserveModalOpen(true)}
              className="text-[11px] uppercase tracking-[0.2em] text-[#FAF9F5]/85 hover:text-[#C8B89A] transition-colors cursor-pointer"
            >
              Booking
            </button>
          </nav>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setReserveModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#151515] bg-[#C8B89A] hover:bg-[#DFD4BE] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Book Your Stay
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF9F5] hover:text-[#C8B89A] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#151515] lg:hidden flex flex-col justify-between pt-24 pb-12 px-8 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-8 pt-6">
            <div className="border-b border-[#C8B89A]/20 pb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A]">Navigation</span>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl tracking-wide text-[#FAF9F5] hover:text-[#C8B89A] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReserveModalOpen(true);
                }}
                className="text-left font-serif text-3xl tracking-wide text-[#C8B89A] hover:text-[#DFD4BE]"
              >
                Booking
              </button>
            </div>
          </div>

          <div className="space-y-6 border-t border-[#C8B89A]/15 pt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setReserveModalOpen(true);
              }}
              className="w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#151515] bg-[#C8B89A] hover:bg-[#DFD4BE] text-center transition-colors cursor-pointer"
            >
              Book Your Stay
            </button>

            <div className="text-center text-xs text-[#8A877F] tracking-wider space-y-1">
              <p>Private Reservations: +91 (800) 425-8356</p>
              <p>concierge@auraveil-resort.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
      />
    </>
  );
}
