import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121110] text-[#FAF9F5] border-t border-[#C8B89A]/20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Tier: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C8B89A]/15 pb-12 gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#FAF9F5]">
              AURAVEIL
            </span>
            <p className="font-serif italic text-lg text-[#C8B89A]">
              "A Different Kind of Extraordinary"
            </p>
            <p className="text-xs text-[#8A877F] leading-relaxed tracking-wide pt-1">
              An exclusive coastal sanctuary where timeless architectural harmony meets untouched natural seclusion. Designed for discerning travelers seeking deep restoration.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8A877F] hover:text-[#C8B89A] transition-colors py-2 group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Middle Tier: Links, Experience, Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-[#C8B89A]/15 text-xs tracking-wider">
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">
              The Estate
            </h4>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li>
                <Link to="/rooms" className="hover:text-[#C8B89A] transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#C8B89A] transition-colors">
                  Facilities & Experiences
                </Link>
              </li>
              <li>
                <Link to="/rooms/private-pool-villa" className="hover:text-[#C8B89A] transition-colors">
                  Private Pool Villas
                </Link>
              </li>
              <li>
                <Link to="/rooms/presidential-suite" className="hover:text-[#C8B89A] transition-colors">
                  Presidential Penthouse
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Experiences */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li>
                <Link to="/facilities#auraveil-spa" className="hover:text-[#C8B89A] transition-colors">
                  Holistic Spa & Rituals
                </Link>
              </li>
              <li>
                <Link to="/facilities#signature-dining" className="hover:text-[#C8B89A] transition-colors">
                  Signature Dining Pavilion
                </Link>
              </li>
              <li>
                <Link to="/facilities#infinity-pool" className="hover:text-[#C8B89A] transition-colors">
                  Horizon Infinity Pool
                </Link>
              </li>
              <li>
                <Link to="/facilities#private-beach" className="hover:text-[#C8B89A] transition-colors">
                  Secluded Coastal Shore
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">
              Concierge & Inquiries
            </h4>
            <div className="space-y-2.5 text-[#FAF9F5]/70">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C8B89A] shrink-0 mt-0.5" />
                <span>Cove Peninsula Road, Sanctuary Bay 403515</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C8B89A] shrink-0" />
                <span>+91 (800) 425-8356</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C8B89A] shrink-0" />
                <span>concierge@auraveil-resort.com</span>
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter / Private Invitation */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C8B89A] font-semibold">
              Private Gazette
            </h4>
            <p className="text-[#8A877F] leading-relaxed">
              Receive seasonal reflections, culinary previews, and priority booking windows.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-[#1C1B19] border border-[#C8B89A]/30 text-xs px-3 py-2 text-[#FAF9F5] focus:outline-none focus:border-[#C8B89A] w-full"
              />
              <button
                type="button"
                onClick={() => alert("Thank you for joining the Auraveil Gazette.")}
                className="bg-[#C8B89A] text-[#151515] px-3 py-2 uppercase tracking-wider font-semibold text-[10px] hover:bg-[#DFD4BE] transition-colors shrink-0 cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A877F]">
          <p>© {new Date().getFullYear()} AURAVEIL Resort & Sanctuary. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-5">
            {/* Instagram SVG */}
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#C8B89A] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook SVG */}
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#C8B89A] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.626 9 4.889V8z"/>
              </svg>
            </a>
            {/* X / Twitter SVG */}
            <a href="#twitter" aria-label="Twitter / X" className="hover:text-[#C8B89A] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
