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
          className="group relative overflow-hidden rounded-full p-px transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
          <div className="relative px-6 py-3 rounded-full bg-slate-950 text-white transition-all duration-300 group-hover:bg-slate-900 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Reserve Private Suite
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl animate-fadeIn">
        <button
          onClick={onOpenBooking}
          className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>RESERVE SUITE</span>
        </button>
      </div>
    </>
  );
};
