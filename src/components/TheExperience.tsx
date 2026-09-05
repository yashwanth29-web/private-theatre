import React from 'react';
import { REAL_IMAGES } from '../data/content';
import { Shield, Tv, Volume2, Armchair, Sparkles, CheckCircle2 } from 'lucide-react';

export const TheExperience: React.FC = () => {
  const pillars = [
    {
      id: 'private-theatre',
      title: 'Private Theatre',
      tagline: '100% Reserved Exclusively',
      description:
        'Zero outside crowds, zero crying babies, and zero strangers. The entire hall, laser projection system, and plush lounge belong solely to you and your guests.',
      icon: Shield,
      image: REAL_IMAGES.theatreStellar,
      stats: '100% Private Access',
    },
    {
      id: 'large-screen',
      title: 'Large Screen',
      tagline: '150" 4K Laser Projection',
      description:
        'Cinema-grade high-lumen laser projection delivering deep blacks, HDR vivid colors, and ultra-crisp resolution for OTT movies, series, or family video montages.',
      icon: Tv,
      image: REAL_IMAGES.screenMagicWings,
      stats: '150" 4K HDR Laser',
    },
    {
      id: 'premium-audio',
      title: 'Premium Audio',
      tagline: 'Dolby Atmos Surround System',
      description:
        'Acoustically calibrated multi-channel sound with chest-thumping subwoofers. Feel dialogue, background score, and cinematic bass in spatial clarity.',
      icon: Volume2,
      image: REAL_IMAGES.theatreMain,
      stats: 'Acoustic Calibrated',
    },
    {
      id: 'comfortable-seating',
      title: 'Comfortable Seating',
      tagline: 'Electric Velvet Recliners & Plush Couches',
      description:
        'Sink into motorized ergonomic recliners with integrated footrests, cup holders, and plush companion couches designed for hours of uninterrupted relaxation.',
      icon: Armchair,
      image: REAL_IMAGES.theatreStellar,
      stats: 'Electric Recliners',
    },
    {
      id: 'celebration-setup',
      title: 'Celebration Setup',
      tagline: 'Bespoke Decor & Screen Greetings',
      description:
        'Glowing LED neon signs, rose petal aisles, balloon installations, custom photo greetings played on the 150" screen, and signature cakes ready on arrival.',
      icon: Sparkles,
      image: REAL_IMAGES.movieDateNeon,
      stats: 'Turnkey Decor Ready',
    },
  ];

  return (
    // Section 2: SOFT MINT Canvas
    <section id="experience" className="relative py-24 px-6 bg-[#F6FFF9] border-t border-emerald-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Sensory Excellence
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            THE EXPERIENCE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Engineered from ground up to deliver intimate luxury. Here is what awaits you the moment the theatre door closes behind you.
          </p>
        </div>

        {/* 5 Feature Pillars in Crisp White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isLarge = idx === 0 || idx === 1;

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-emerald-100/80 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                  isLarge && idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Real Image Header with Bright Natural Visibility */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-50">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  {/* Subtle bottom gradient only for text card contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  {/* Stat badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-white/95 border border-emerald-200 text-emerald-800 shadow-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {item.stats}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/95 border border-white/50 flex items-center justify-center text-emerald-700 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-extrabold block">
                        {item.tagline}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
