import React from 'react';
import { VENUE_INFO } from '../data/content';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation, Sparkles } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Movie Date Guntur private theatre Andhra Pradesh'
    )}`;
    window.open(url, '_blank');
  };

  return (
    // Section 6: SOFT MINT Canvas
    <section id="location" className="relative py-24 px-6 bg-[#F6FFF9] border-t border-emerald-100/60 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Destination
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            LOCATION
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Movie Date Guntur is situated in Brodipet with private entrance, VIP lounge, and dedicated concierge.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Info Card in Clean White */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 flex flex-col justify-between border border-emerald-100/90 shadow-xs">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-slate-900">{VENUE_INFO.name}</h3>
                  <p className="text-xs text-emerald-700 font-bold">{VENUE_INFO.tagline}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {VENUE_INFO.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-yellow-600 shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-700 font-normal">
                    Open Hours: <span className="text-slate-900 font-bold">{VENUE_INFO.hours}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={`tel:${VENUE_INFO.phone}`}
                    className="text-xs sm:text-sm text-slate-700 hover:text-emerald-700 font-normal transition-colors"
                  >
                    Direct Line: <span className="text-slate-900 font-bold">{VENUE_INFO.phone}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-pink-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <a
                    href={VENUE_INFO.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm text-slate-700 hover:text-pink-600 transition-colors flex items-center gap-1.5 font-normal"
                  >
                    Instagram: <span className="text-slate-900 font-bold">{VENUE_INFO.instagramHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
              <button
                onClick={openGoogleMaps}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>

              <a
                href={`https://wa.me/${VENUE_INFO.whatsapp}?text=Hi%20Movie%20Date%20Guntur%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20private%20theatre.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Map Card (Clean Natural Map) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-emerald-100/90 shadow-xs relative min-h-[360px] flex flex-col">
            <iframe
              title="Movie Date Guntur Location Map"
              src="https://maps.google.com/maps?q=Brodipet%20Guntur%20Andhra%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs shadow-md">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium">Brodipet 4th Line, Guntur, AP</span>
              </div>
              <button
                onClick={openGoogleMaps}
                className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
              >
                Open in Maps →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
