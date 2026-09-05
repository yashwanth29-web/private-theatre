import React, { useState } from 'react';
import { REAL_IMAGES } from '../data/content';
import { Sparkles, Heart, PartyPopper, Film, Volume2, CheckCircle2 } from 'lucide-react';

interface LightingTheme {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgImage: string;
  screenGlow: string;
  accentText: string;
}

export const TheatreExplorer3D: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('neon');
  const [activeAngle, setActiveAngle] = useState<'center' | 'left' | 'right'>('center');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string>('VIP Recliner Row 1');

  const themes: LightingTheme[] = [
    {
      id: 'neon',
      name: 'Celebration Neon',
      icon: <PartyPopper className="w-3.5 h-3.5 text-yellow-600" />,
      bgImage: REAL_IMAGES.movieDateNeon,
      screenGlow: 'rgba(34, 197, 94, 0.45)',
      accentText: 'High-energy celebration neon signage with theme balloon garland & party lighting.',
    },
    {
      id: 'romantic',
      name: 'Romantic Candlelight',
      icon: <Heart className="w-3.5 h-3.5 text-rose-500" />,
      bgImage: REAL_IMAGES.theatreStellar,
      screenGlow: 'rgba(234, 179, 8, 0.45)',
      accentText: 'Warm fairy lights, rose petal pathway, and intimate candlelit table setup.',
    },
    {
      id: 'cinematic',
      name: '4K Laser Cinema Screen',
      icon: <Film className="w-3.5 h-3.5 text-emerald-600" />,
      bgImage: REAL_IMAGES.screenMagicWings,
      screenGlow: 'rgba(59, 130, 246, 0.35)',
      accentText: 'Total blackout calibration with laser 4K HDR projection for pure movie immersion.',
    },
  ];

  const currentTheme = themes.find((t) => t.id === activeTheme) || themes[0];

  return (
    <section id="theatre-3d" className="relative py-20 px-6 bg-[#f8faf9] overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-emerald-700 inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> 3D Virtual Stage
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple 3D Theatre Demo
            </h2>
          </div>
          <p className="max-w-sm text-slate-600 text-xs font-normal">
            Switch real celebration setups, rotate view angles, and test the Dolby Atmos surround sound demo.
          </p>
        </div>

        {/* 3D Demo Container in Pure White */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-emerald-200/80 shadow-xl p-4 sm:p-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Ambiance Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                Ambiance:
              </span>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTheme === t.id
                      ? 'bg-gradient-to-r from-emerald-500 to-yellow-400 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {t.icon}
                  <span>{t.name}</span>
                </button>
              ))}
            </div>

            {/* View angle & Sound toggle */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 text-xs font-bold">
                {(['left', 'center', 'right'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setActiveAngle(angle)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                      activeAngle === angle
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`p-2 rounded-xl text-xs flex items-center gap-1.5 font-bold transition-all ${
                  isPlayingAudio
                    ? 'bg-yellow-400 text-slate-950 shadow-md'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
                title="Toggle Dolby Atmos sound visualizer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">
                  {isPlayingAudio ? 'Sound ON' : 'Test Sound'}
                </span>
              </button>
            </div>
          </div>

          {/* 3D Perspective Stage Viewport */}
          <div
            className="relative mt-4 h-[350px] sm:h-[430px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center select-none shadow-inner"
            style={{ perspective: '1000px' }}
          >
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{
                transform:
                  activeAngle === 'center'
                    ? 'rotateY(0deg) scale(1)'
                    : activeAngle === 'left'
                    ? 'rotateY(6deg) scale(1.03) translateX(15px)'
                    : 'rotateY(-6deg) scale(1.03) translateX(-15px)',
              }}
            >
              {/* Background Real Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url('${currentTheme.bgImage}')`,
                  filter: 'brightness(0.85) contrast(1.1)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Dynamic Screen Glow */}
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-[75%] max-w-xl h-[45%] pointer-events-none rounded-xl blur-2xl opacity-50 transition-all duration-500"
                style={{ background: currentTheme.screenGlow }}
              />

              {/* Dolby Atmos frequency bars overlay */}
              {isPlayingAudio && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-yellow-400/40 text-yellow-300 text-xs backdrop-blur-md shadow-lg animate-pulse">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-extrabold uppercase tracking-wider text-[11px] text-white">
                    Dolby Atmos 7.1 Active Soundstage
                  </span>
                  <div className="flex items-end gap-0.5 h-3 ml-2">
                    <span className="w-1 bg-emerald-400 animate-bounce h-2" />
                    <span className="w-1 bg-yellow-400 animate-bounce h-3 delay-75" />
                    <span className="w-1 bg-emerald-400 animate-bounce h-1.5 delay-150" />
                    <span className="w-1 bg-white animate-bounce h-2.5 delay-100" />
                  </div>
                </div>
              )}

              {/* Seat Selector in foreground */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 sm:gap-3 z-20 w-full px-4">
                {['VIP Recliner Row 1', 'Couple Lounge Sofa', 'VIP Recliner Row 2'].map((seatName) => (
                  <button
                    key={seatName}
                    onClick={() => setSelectedSeat(seatName)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide transition-all shadow-md ${
                      selectedSeat === seatName
                        ? 'bg-gradient-to-r from-emerald-500 to-yellow-400 text-slate-950 scale-105'
                        : 'bg-black/80 text-white border border-white/25 hover:bg-black'
                    }`}
                  >
                    🛋️ {seatName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description bar in soft mint */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
            <div>
              <span className="font-extrabold text-emerald-900 mr-1">{currentTheme.name}:</span>
              <span className="text-slate-700 font-medium">{currentTheme.accentText}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Customization Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
