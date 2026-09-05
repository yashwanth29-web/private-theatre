import React, { useRef, useState, useEffect } from 'react';
import { REAL_IMAGES } from '../data/content';
import { Sparkles, ArrowRight, Calendar, Shield, Film, Volume2, ChevronDown, CheckCircle2 } from 'lucide-react';

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

  // 100% Crystal-Clear, High-Definition Photographs
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
    // Compact 220vh container for crisp, responsive scroll progression
    <section ref={containerRef} className="relative w-full h-[220vh] bg-slate-950 select-none">
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        
        {/* Layered High-Res Photographic Backgrounds */}
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
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>
          );
        })}

        {/* Cinematic Vignette Overlay: Guarantees 100% Crystal-Clear Contrast and Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/70 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.75)_100%)] z-10 pointer-events-none" />

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10 z-40">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 transition-all duration-100"
            style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* ================================================== */}
        {/* SYNCHRONIZED SCENE OVERLAYS (HIGH-CONTRAST & ELEGANT) */}
        {/* ================================================== */}

        {/* SCENE 01 — ARRIVAL */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-3xl flex flex-col items-center p-4 sm:p-6">
            {/* Frosted Glass Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-white/95">
                Private Cinema &amp; Celebration Lounge • Guntur
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            {/* High-Contrast, Radiant Typography */}
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.12] mb-5 drop-shadow-md">
              <span className="block text-white">Your Theatre.</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Your People.
              </span>
              <span className="block text-white">Your Moment.</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base font-normal max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-xs">
              Experience 150-inch 4K HDR projection, Dolby Atmos sound, and plush recliners in total privacy.
              Perfect for couple dates, surprise birthdays, proposals, and family binge-watching.
            </p>

            {/* Clean, High-End CTA Buttons */}
            <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-3.5">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2.5"
              >
                <span>Book Your Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSchedule}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Explore Experience
              </button>
            </div>

            {/* Subtle Scroll Indicator */}
            <div className="mt-8 flex flex-col items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-widest font-medium animate-pulse">
              <span>Scroll to step inside</span>
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* SCENE 02 — ENTER */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-2xl flex flex-col items-center p-4 sm:p-6">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.25em] text-emerald-300 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 mb-4 shadow-sm">
              02 • Physical Ambience
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
              Step Inside Luxury.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-normal max-w-lg mb-7 leading-relaxed drop-shadow-xs">
              An intimate, acoustically sealed suite designed for ultimate comfort. Custom velvet couches, mood lighting, and zero outside disturbances.
            </p>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 03 — THE CINEMA */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-3xl flex flex-col items-center p-4 sm:p-6">
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 font-semibold text-[10px] sm:text-xs uppercase tracking-widest mb-4 border border-white/15 shadow-sm">
              100% Private • Zero Crowd Interruption
            </div>

            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-5 drop-shadow-md">
              Not a Crowd.<br />
              Not a Public Show.<br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Just Your People.
              </span>
            </h2>

            {/* Feature Cards with Frosted Dark Glass */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-lg text-center mb-6">
              <div className="p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
                <Film className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                <div className="text-xs sm:text-sm font-bold text-white">4K Laser Cinema</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">150&quot; Widescreen</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
                <Volume2 className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <div className="text-xs sm:text-sm font-bold text-white">Dolby Atmos</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">Acoustic Immersion</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
                <Shield className="w-4 h-4 text-teal-400 mx-auto mb-1.5" />
                <div className="text-xs sm:text-sm font-bold text-white">VIP Privacy</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">Electric Recliners</div>
              </div>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Book Private Screen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 04 — MAKE IT A DATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-2xl flex flex-col items-center p-4 sm:p-6">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.25em] text-amber-300 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 mb-4 shadow-sm">
              04 • Romantic Atmosphere
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-3 drop-shadow-md">
              Make It a Date.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-normal max-w-lg mb-6 leading-relaxed drop-shadow-xs">
              Walk into a candlelit wonderland with rose petals, fairy lights, and your favorite story playing in ultra HD.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                🌹 Rose Petal Carpet
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                🎂 Signature Heart Cake
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                ✨ Glow Neon Backdrop
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('date-night')}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Book Date Night Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 05 — CELEBRATE */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-2xl flex flex-col items-center p-4 sm:p-6">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.25em] text-emerald-300 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 mb-4 shadow-sm">
              05 • Milestones &amp; Joy
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-3 drop-shadow-md">
              Make It a Memory.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-normal max-w-lg mb-6 leading-relaxed drop-shadow-xs">
              Surprise your loved ones with customized on-screen video montage greetings, balloon arches, and gourmet cakes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                🎉 Birthdays
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                💍 Proposals
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                🥂 Anniversaries
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                🍿 Binge Parties
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => onOpenBooking('birthday')}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Book Celebration Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE 06 — YOUR MOMENT */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center z-20 pointer-events-none transition-opacity duration-200 ${
            currentScene === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-2xl flex flex-col items-center p-4 sm:p-6">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.25em] text-amber-300 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 mb-4 shadow-sm">
              06 • The Experience Awaits
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
              One Theatre.<br />
              One Moment.<br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Only Yours.
              </span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-normal max-w-md mb-7 leading-relaxed drop-shadow-xs">
              Select your favorite slot, choose your package, and walk in to a prepared private cinema.
            </p>

            <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Slot</span>
              </button>

              <button
                onClick={onExploreSchedule}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
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
