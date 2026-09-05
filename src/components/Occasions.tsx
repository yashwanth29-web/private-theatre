import React, { useState } from 'react';
import { OCCASIONS } from '../data/content';
import { Sparkles, ArrowRight, Heart, Cake, Users } from 'lucide-react';

interface OccasionsProps {
  onSelectOccasion: (occasionId: string) => void;
}

export const Occasions: React.FC<OccasionsProps> = ({ onSelectOccasion }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/80" />;
      case 'Cake':
        return <Cake className="w-4 h-4 text-yellow-600" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'Users':
        return <Users className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    // Section 1: WHITE Canvas
    <section id="occasions" className="relative py-24 px-6 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Curated Celebrations
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            CHOOSE YOUR MOMENT
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Every booking reserves the entire private hall. Customized lighting, personal screen greetings, and bespoke setups tailored to your story.
          </p>
        </div>

        {/* 6 High-Impact Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OCCASIONS.map((occ) => {
            const isHovered = hoveredCard === occ.id;

            return (
              <div
                key={occ.id}
                onMouseEnter={() => setHoveredCard(occ.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectOccasion(occ.id)}
                className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 bg-white border border-emerald-100/90 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Real Photographic Background with Smooth Scale */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out will-change-transform"
                  style={{
                    backgroundImage: `url(${occ.image})`,
                    transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
                  }}
                />

                {/* Soft Bottom-Only Gradient for Text Readability while leaving 60% of photo completely clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                {/* Top Badges */}
                <div className="relative top-5 left-5 right-5 flex items-center justify-between z-10">
                  <div className="w-10 h-10 rounded-2xl bg-white/95 border border-white/40 flex items-center justify-center shadow-md">
                    {renderIcon(occ.icon)}
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-slate-900 border border-emerald-200/80 shadow-xs">
                    {occ.popularFor.split(',')[0]}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative p-6 z-10 flex flex-col justify-end">
                  <div className="text-[11px] uppercase tracking-widest text-emerald-300 font-extrabold mb-1">
                    {occ.subtitle}
                  </div>
                  <h3 className="font-display text-2xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {occ.title.toUpperCase()}
                  </h3>

                  <p className="text-xs text-white/90 font-normal leading-relaxed line-clamp-2 mb-4">
                    {occ.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs font-black uppercase tracking-wider text-emerald-300 group-hover:text-yellow-300 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Reserve Theatre
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <span className="text-[10px] font-normal text-white/70 lowercase">
                      tap to book
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
