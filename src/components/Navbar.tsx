import React, { useState, useEffect } from 'react';
import { Film, ShieldCheck, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100/80'
          : 'py-4 bg-white/80 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Dark Navy Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Film className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-sans font-extrabold text-base sm:text-lg tracking-wider text-slate-900 flex items-center gap-2">
            MOVIE DATE
            <span className="hidden sm:inline-block text-[9px] font-sans font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300/60">
              GUNTUR
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#experience"
            className="text-xs uppercase tracking-[0.18em] text-slate-700 hover:text-emerald-600 transition-colors font-semibold"
          >
            Experience
          </a>
          <a
            href="#occasions"
            className="text-xs uppercase tracking-[0.18em] text-slate-700 hover:text-emerald-600 transition-colors font-semibold"
          >
            Occasions
          </a>
          <a
            href="#gallery"
            className="text-xs uppercase tracking-[0.18em] text-slate-700 hover:text-emerald-600 transition-colors font-semibold"
          >
            Gallery
          </a>
          <a
            href="#location"
            className="text-xs uppercase tracking-[0.18em] text-slate-700 hover:text-emerald-600 transition-colors font-semibold"
          >
            Location
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3.5">
          <button
            onClick={onOpenAdmin}
            title="Management Console"
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors text-xs flex items-center gap-1 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin</span>
          </button>

          {/* Clean Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-4">
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-slate-800 font-bold py-1.5"
            >
              Experience
            </a>
            <a
              href="#occasions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-slate-800 font-bold py-1.5"
            >
              Occasions
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-slate-800 font-bold py-1.5"
            >
              Gallery
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-slate-800 font-bold py-1.5"
            >
              Location
            </a>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-center text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Admin Management Console
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
