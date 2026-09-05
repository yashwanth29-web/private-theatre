import React from 'react';
import { VENUE_INFO } from '../data/content';
import { Film, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC<{ onOpenBooking: () => void; onOpenAdmin: () => void }> = ({
  onOpenBooking,
  onOpenAdmin,
}) => {
  return (
    <footer className="relative bg-white border-t border-slate-100 pt-16 pb-24 sm:pb-16 px-6 text-slate-600 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display font-black text-lg tracking-[0.2em] text-slate-900">
                MOVIE DATE <span className="text-xs text-yellow-600">GUNTUR</span>
              </span>
            </div>
            <p className="text-slate-600 max-w-md font-normal leading-relaxed text-xs sm:text-sm">
              Guntur&apos;s premier private cinema and celebration lounge for couple dates, anniversaries, romantic proposals, birthdays, and wholesome private screenings.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={VENUE_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-pink-600 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={`tel:${VENUE_INFO.phone}`}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase font-extrabold tracking-widest text-slate-900">Occasions</h5>
            <ul className="space-y-2 font-normal text-slate-600">
              <li>
                <a href="#occasions" className="hover:text-emerald-700 transition-colors">
                  Couple Date Night
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-yellow-600 transition-colors">
                  Birthday Surprise
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-emerald-700 transition-colors">
                  Romantic Proposal
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-yellow-600 transition-colors">
                  Friends &amp; Family Screening
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-slate-900 transition-colors">
                  Private Events &amp; Gaming
                </a>
              </li>
            </ul>
          </div>

          {/* Destination */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase font-extrabold tracking-widest text-slate-900">Destination</h5>
            <p className="text-slate-600 font-normal leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{VENUE_INFO.address}</span>
            </p>
            <p className="text-slate-600 font-normal">
              Daily Sessions: <strong className="text-emerald-800 font-bold">{VENUE_INFO.hours}</strong>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-500 hover:text-emerald-700 font-semibold transition-colors underline"
              >
                Management Console
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Movie Date Guntur. All rights reserved. 100% Private Cinema.
          </div>
          <div className="flex items-center gap-1 text-slate-600 font-normal">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" /> in Guntur.
          </div>
        </div>
      </div>
    </footer>
  );
};
