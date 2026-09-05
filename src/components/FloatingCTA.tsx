import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface FloatingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop Floating Pill in Clean White with Fresh Green Accent */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-40 animate-fadeIn">
        <button
          onClick={onOpenBooking}
          className="group relative overflow-hidden rounded-full p-px transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/15"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-yellow-400 rounded-full animate-pulse" />
          <div className="relative px-6 py-3.5 rounded-full bg-white transition-all duration-300 group-hover:bg-emerald-50/50 flex items-center gap-2.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              BOOK YOUR EXPERIENCE
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar in Clean White/Mint */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-2xl animate-fadeIn">
        <button
          onClick={onOpenBooking}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>BOOK NOW</span>
        </button>
      </div>
    </>
  );
};
