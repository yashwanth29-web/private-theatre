import React from 'react';
import { REAL_IMAGES, VENUE_INFO } from '../data/content';
import { ArrowRight, Calendar, MessageCircle, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    // Section 7: FINAL CTA in beautiful Light Green with subtle yellow accents
    <section className="relative py-28 px-6 bg-gradient-to-br from-[#ECFFF4] via-[#F6FFF9] to-[#FEFCE8] overflow-hidden border-t border-emerald-100 select-none">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Card in Pure White with Soft Shadow */}
      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-14 border border-emerald-100 shadow-xl shadow-emerald-950/5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-emerald-900">
            PRIVATE SESSIONS AVAILABLE DAILY
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.08] mb-4 uppercase">
          READY TO MAKE <br />
          <span className="text-cinema-gradient">A MOMENT?</span>
        </h2>

        <p className="text-xs sm:text-base text-slate-600 font-normal max-w-lg mb-8 leading-relaxed">
          Step into Guntur&apos;s most exclusive cinema. Reserve an entire luxury theatre for your date, birthday surprise, or family screening.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          {/* Fresh green & yellow Book Now CTA */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK YOUR PRIVATE THEATRE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${VENUE_INFO.whatsapp}?text=Hi%20Movie%20Date%20Guntur%2C%20I%20would%20like%20to%20check%20availability.`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 text-slate-800 hover:text-emerald-900 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Check Availability</span>
          </a>
        </div>
      </div>
    </section>
  );
};
