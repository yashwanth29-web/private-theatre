import React, { useState } from 'react';
import { Sparkles, Heart, Cake, Gift, Users, Film, ArrowRight } from 'lucide-react';

interface Moment {
  id: string;
  title: string;
  tagline: string;
  image: string;
  quote: string;
  highlight: string;
}

export const SpecialMoments: React.FC<{ onBookOccasion: (id: string) => void }> = ({
  onBookOccasion,
}) => {
  const moments: Moment[] = [
    {
      id: 'proposal',
      title: 'Romantic Proposal',
      tagline: 'She said YES in private',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop',
      quote: '"I had our private montage play on the 150-inch screen followed by the lights dimming to a neon Marry Me sign."',
      highlight: 'Rose Petal Aisle • "Marry Me" Neon • Custom Video Playback',
    },
    {
      id: 'birthday',
      title: 'Midnight Birthday Surprise',
      tagline: 'When the clock strikes 12',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop',
      quote: '"We cut the cake right inside the theater with party poppers and birthday slide playing on screen!"',
      highlight: 'Artisan Cake • Balloon Arch • Smoke Sparklers • Photo Props',
    },
    {
      id: 'couple-date',
      title: 'Intimate Anniversary Date',
      tagline: 'Just the two of you',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
      quote: '"The candlelit table and recliner comfort made this the most peaceful anniversary we ever had."',
      highlight: 'Candlelight Setup • Heart Cake • Romantic Ambient Lights',
    },
    {
      id: 'friends',
      title: 'Friends Binge & Match Party',
      tagline: 'Roar together in private',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
      quote: '"Watched the cricket world cup on the giant screen with nachos and our gang without public interruptions."',
      highlight: 'Dolby Surround • Snacks Platter • High-Five Acoustic Freedom',
    },
  ];

  const [activeMoment, setActiveMoment] = useState<Moment>(moments[0]);

  return (
    <section className="relative py-28 px-6 bg-cinema-900 border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-cinema-gold inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Transformative Visuals
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Make it more than a movie.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Every celebration can be customized with custom floral pathways, neon backdrops, designer
            cakes, and surprise on-screen video greetings.
          </p>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {moments.map((m) => {
              const isActive = activeMoment.id === m.id;

              return (
                <div
                  key={m.id}
                  onMouseEnter={() => setActiveMoment(m)}
                  onClick={() => setActiveMoment(m)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-cinema-850 border-cinema-gold shadow-xl shadow-cinema-gold/10'
                      : 'bg-cinema-950/60 border-white/5 hover:border-white/20 hover:bg-cinema-850/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wider uppercase text-cinema-gold mb-1">
                        {m.tagline}
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold text-white">
                        {m.title}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-cinema-gold text-cinema-950 font-bold' : 'text-gray-500'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Visual Transformation Showcase */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl">
            {/* Background Image with Fade Transition */}
            <div
              key={activeMoment.id}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 animate-fadeIn"
              style={{
                backgroundImage: `url(${activeMoment.image})`,
                filter: 'brightness(0.5) contrast(1.15)',
              }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Foreground Content */}
            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
              <div className="inline-block px-3 py-1 rounded-full bg-cinema-gold text-cinema-950 text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                {activeMoment.highlight}
              </div>

              <blockquote className="font-serif italic text-base sm:text-xl text-gray-200 leading-relaxed mb-6">
                {activeMoment.quote}
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div>
                  <div className="font-display font-bold text-white text-lg">
                    {activeMoment.title}
                  </div>
                  <div className="text-xs text-gray-400">Movie Date Guntur Private Suite</div>
                </div>
                <button
                  onClick={() => onBookOccasion(activeMoment.id)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-cinema-gold hover:text-cinema-950 text-white transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Book This Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
