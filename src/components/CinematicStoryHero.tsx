import React, { useRef, useState, useEffect } from 'react';
import { REAL_IMAGES } from '../data/content';
import { Sparkles, ArrowRight, Calendar, Film, Volume2, Shield, ChevronDown } from 'lucide-react';

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

  // High-Resolution Direct Photographs
  const scenes = [
    {
      id: '01-arrival',
      title: 'Arrival',
      image: REAL_IMAGES.theatreEntrance,
    },
    {
      id: '02-enter',
      title: 'Enter',
      image: REAL_IMAGES.theatreInterior,
    },
    {
      id: '03-cinema',
      title: 'The Cinema',
      image: REAL_IMAGES.screenMagicWings,
    },
    {
      id: '04-date',
      title: 'Make It A Date',
      image: REAL_IMAGES.theatreStellar,
    },
    {
      id: '05-celebrate',
      title: 'Celebrate',
      image: REAL_IMAGES.movieDateNeon,
    },
    {
      id: '06-your-moment',
      title: 'Your Moment',
      image: REAL_IMAGES.theatreMain,
    },
  ];

  // Preload all photos
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
            const totalScrollable = rect.height - window.innerHeight;

            if (totalScrollable > 0) {
              const scrolled = -rect.top;
              const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
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
    // Clean bright container with full natural photographic visibility
    <section ref={containerRef} className="relative w-full h-[220vh] bg-slate-50 select-none">
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-100">
        
        {/* Layered High-Res Photographic Backgrounds: Natural, Bright & Crisp */}
        {scenes.map((scene, idx) => {
          const isActive = currentScene === idx;

          return (
            <div
              key={scene.id}
              aria-hidden={!isActive}
              className="absolute inset-0 will-change-opacity pointer-events-none transition-opacity duration-300 ease-out"
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
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-slate-200/60 z-40">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-100"
            style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* ================================================== */}
        {/* FROSTED GLASS TRANSLUCENT CARDS: NO DARK OVERLAYS  */}
        {/* ================================================== */}

        {/* SCENE 01 — ARRIVAL */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-xl w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 mb-3.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-900">
                Private Cinema &amp; Celebration Lounge • Guntur
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            {/* Crisp, High-Contrast Typography */}
            <h1 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 leading-[1.14] mb-6">
              <span className="block text-slate-900">Your Theatre.</span>
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Your People.
              </span>
              <span className="block text-slate-900">Your Moment.</span>
            </h1>

            {/* CTAs */}
            <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Book Your Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExploreSchedule}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Explore Theatre
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-5 flex flex-col items-center gap-1 text-slate-500 text-[10px] uppercase tracking-widest font-semibold">
              <span>Scroll to step inside</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* SCENE 02 — ENTER */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-lg w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3 shadow-2xs">
              02 • Physical Ambience
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-6">
              Step Inside Luxury.
            </h2>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 03 — THE CINEMA */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-xl w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-3 border border-emerald-200 shadow-2xs">
              100% Private • Zero Distractions
            </div>

            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-5">
              Not a Crowd.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Just Your People.
              </span>
            </h2>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-md text-center mb-5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Film className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">4K Laser</div>
                <div className="text-[10px] text-slate-500">150&quot; Screen</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Volume2 className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">Dolby Sound</div>
                <div className="text-[10px] text-slate-500">Atmos Surround</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Shield className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">VIP Privacy</div>
                <div className="text-[10px] text-slate-500">Recliner Suite</div>
              </div>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Book Private Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 04 — MAKE IT A DATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-lg w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3 shadow-2xs">
              04 • Romantic Atmosphere
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
              Make It a Date.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                🌹 Rose Petal Entryway
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                🎂 Signature Heart Cake
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                ✨ Glow Neon Backdrop
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('date-night')}
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Book Date Night</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 05 — CELEBRATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-lg w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3 shadow-2xs">
              05 • Milestones &amp; Joy
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
              Make It a Memory.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                🎉 Birthdays
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                💍 Proposals
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                🥂 Anniversaries
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('birthday')}
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Book Celebration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 06 — YOUR MOMENT */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-lg w-full bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 shadow-2xl rounded-3xl p-6 sm:p-9 flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3 shadow-2xs">
              06 • The Experience Awaits
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-5">
              One Theatre.<br />
              One Moment.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Only Yours.
              </span>
            </h2>

            <div className="pointer-events-auto flex items-center justify-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Your Slot</span>
              </button>

              <button
                onClick={onExploreSchedule}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                View Live Slots
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default CinematicStoryHero;
