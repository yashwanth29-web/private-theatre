import React, { useRef, useState, useEffect } from 'react';
import { REAL_IMAGES } from '../data/content';
import { Sparkles, ArrowRight, Calendar, Shield, Film, Volume2, ChevronDown } from 'lucide-react';

interface CinematicStoryHeroProps {
  onOpenBooking: (initialOccasion?: string) => void;
  onExploreSchedule: () => void;
}

export const CinematicStoryHero: React.FC<CinematicStoryHeroProps> = ({
  onOpenBooking,
  onExploreSchedule,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 100% Crystal-Clear, High-Definition Direct Photographs
  const scenes = [
    {
      id: '01-arrival',
      title: 'Arrival',
      image: REAL_IMAGES.theatreEntrance, // theater1.jpg (crisp 1080p)
    },
    {
      id: '02-enter',
      title: 'Enter',
      image: REAL_IMAGES.theatreInterior, // theater2.jpg (crisp 1080p)
    },
    {
      id: '03-cinema',
      title: 'The Cinema',
      image: REAL_IMAGES.screenMagicWings, // Magic Wings 4K Screen (crisp 1080p)
    },
    {
      id: '04-date',
      title: 'Make It A Date',
      image: REAL_IMAGES.theatreStellar, // Stellar VIP Recliner Suite (crisp 1080p)
    },
    {
      id: '05-celebrate',
      title: 'Celebrate',
      image: REAL_IMAGES.movieDateNeon, // Real Movie Date celebration neon & decor (crisp 1080p)
    },
    {
      id: '06-your-moment',
      title: 'Your Moment',
      image: REAL_IMAGES.theatreMain, // Full 150" Cinema Suite (crisp 1080p)
    },
  ];

  // Preload all high-res photos on initial mount
  useEffect(() => {
    scenes.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Lightweight 60fps passive scroll listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const total = containerRef.current.offsetHeight - window.innerHeight;
            if (total > 0) {
              const scrolled = Math.max(0, -rect.top);
              const progress = Math.min(1, Math.max(0, scrolled / total));
              setScrollProgress(progress);

              let sceneIndex = 0;
              if (progress < 0.16) sceneIndex = 0;
              else if (progress < 0.34) sceneIndex = 1;
              else if (progress < 0.52) sceneIndex = 2;
              else if (progress < 0.70) sceneIndex = 3;
              else if (progress < 0.88) sceneIndex = 4;
              else sceneIndex = 5;

              setCurrentScene(sceneIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Compact 220vh container for crisp, responsive scroll progression
    <section ref={containerRef} className="relative w-full h-[220vh] bg-white select-none">
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-50">
        {/* Layered High-Res Photographic Backgrounds: 100% visible, sharp, no blur */}
        {scenes.map((scene, idx) => {
          const isActive = currentScene === idx;

          return (
            <div
              key={scene.id}
              aria-hidden={!isActive}
              className="absolute inset-0 will-change-opacity pointer-events-none transition-opacity duration-150 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          );
        })}

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-slate-100 z-40">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-yellow-400 transition-all duration-100"
            style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* ================================================== */}
        {/* SYNCHRONIZED SCENE TEXT OVERLAYS                   */}
        {/* 100% TRANSPARENT: NO WHITE CARD BACKGROUND         */}
        {/* SMALLER, REFINED, ULTRA-ELEGANT TYPOGRAPHY         */}
        {/* ================================================== */}

        {/* SCENE 01 — ARRIVAL */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-emerald-200/80 mb-2.5 sm:mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-black tracking-widest uppercase text-emerald-900">
                A PRIVATE CINEMA EXPERIENCE IN GUNTUR
              </span>
              <Sparkles className="w-3 h-3 text-yellow-500" />
            </div>

            {/* Smaller, refined heading */}
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight mb-4 sm:mb-5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              <span className="block">YOUR THEATRE.</span>
              <span className="block text-cinema-gradient">YOUR PEOPLE.</span>
              <span className="block">YOUR MOMENT.</span>
            </h1>

            <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Book Your Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 sm:mt-4 flex flex-col items-center gap-1 text-slate-700 text-[9px] uppercase tracking-widest font-black animate-bounce drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              <span>Scroll to step inside</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* SCENE 02 — ENTER */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <span className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.25em] text-emerald-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2 shadow-xs">
              02 • Physical Ambience
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              STEP INSIDE.
            </h2>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Book This Theatre</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 03 — THE CINEMA */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/85 text-emerald-800 font-black text-[9px] sm:text-[11px] uppercase tracking-widest mb-2.5 border border-emerald-200 shadow-xs">
              100% PRIVATE • ZERO DISTRACTIONS
            </div>

            <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              NOT A CROWD.<br />
              NOT A PUBLIC SHOW.<br />
              <span className="text-cinema-gradient">JUST YOUR PEOPLE.</span>
            </h2>

            {/* Compact feature pills with semi-translucent styling */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm text-center mb-4">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/85 border border-emerald-200 shadow-xs">
                <Film className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] sm:text-xs font-black text-slate-900">4K CINEMA</div>
                <div className="text-[9px] text-slate-600">150&quot; Laser</div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/85 border border-amber-200 shadow-xs">
                <Volume2 className="w-3.5 h-3.5 text-amber-600 mx-auto mb-1" />
                <div className="text-[10px] sm:text-xs font-black text-slate-900">DOLBY SOUND</div>
                <div className="text-[9px] text-slate-600">Surround</div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/85 border border-emerald-200 shadow-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] sm:text-xs font-black text-slate-900">PRIVATE SPACE</div>
                <div className="text-[9px] text-slate-600">VIP Recliners</div>
              </div>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Book Private Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 04 — MAKE IT A DATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <span className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.25em] text-yellow-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-yellow-200 mb-2 shadow-xs">
              04 • Romantic Atmosphere
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              MAKE IT A DATE.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/85 border border-emerald-200 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider shadow-xs">
                Date Night
              </span>
              <span className="px-3 py-1 rounded-full bg-white/85 border border-yellow-300 text-[10px] sm:text-[11px] font-bold text-yellow-800 uppercase tracking-wider shadow-xs">
                Anniversary
              </span>
              <span className="px-3 py-1 rounded-full bg-white/85 border border-emerald-200 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider shadow-xs">
                Proposal
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('date-night')}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Book Date Night</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 05 — CELEBRATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <span className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.25em] text-emerald-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2 shadow-xs">
              05 • Milestones &amp; Joy
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              MAKE IT A MEMORY.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/85 border border-emerald-200 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider shadow-xs">
                Birthdays
              </span>
              <span className="px-3 py-1 rounded-full bg-white/85 border border-yellow-300 text-[10px] sm:text-[11px] font-bold text-yellow-800 uppercase tracking-wider shadow-xs">
                Surprises
              </span>
              <span className="px-3 py-1 rounded-full bg-white/85 border border-emerald-200 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider shadow-xs">
                Celebrations
              </span>
              <span className="px-3 py-1 rounded-full bg-white/85 border border-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider shadow-xs">
                Friends &amp; Family
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('birthday')}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Book Celebration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 06 — YOUR MOMENT */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-150 ${
            currentScene === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Completely transparent container */}
          <div className="max-w-2xl flex flex-col items-center bg-transparent p-4 sm:p-6">
            <span className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.25em] text-yellow-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-yellow-200 mb-2 shadow-xs">
              06 • The Experience Awaits
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              ONE THEATRE.<br />
              ONE MOMENT.<br />
              <span className="text-cinema-gradient">ONLY YOURS.</span>
            </h2>

            <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/25 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Your Experience</span>
              </button>

              <button
                onClick={onExploreSchedule}
                className="px-6 py-3 rounded-full bg-white/85 hover:bg-white border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                Explore Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
