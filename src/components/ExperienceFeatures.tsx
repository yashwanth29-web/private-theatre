import React from 'react';
import { Sparkles, Tv, Headphones, Armchair, Wind, Utensils, HeartHandshake, Eye } from 'lucide-react';

export const ExperienceFeatures: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Walk In',
      desc: 'Step into an exclusive, fully sanitized private suite reserved strictly for you and your guests.',
    },
    {
      num: '02',
      title: 'Pick Your Experience',
      desc: 'Select your OTT show, movie, or personal video montage, with custom lighting and celebration decor.',
    },
    {
      num: '03',
      title: 'Sit Back',
      desc: 'Recline into ultra-comfortable plush seating with immersive Dolby Atmos surround sound & 4K laser visuals.',
    },
    {
      num: '04',
      title: 'Make Memories',
      desc: 'Cut the celebratory cake, enjoy gourmet snacks, snap aesthetic photos, and cherish private moments.',
    },
  ];

  const features = [
    {
      icon: <Tv className="w-5 h-5 text-cinema-gold" />,
      title: '150" 4K Laser Projection',
      desc: 'Ultra-crisp cinematic clarity with vibrant HDR color grading and deep blacks.',
    },
    {
      icon: <Headphones className="w-5 h-5 text-cinema-gold" />,
      title: 'Dolby Atmos 7.1 Sound',
      desc: 'Acoustically tuned private chamber with crystal-clear dialogue and ground-shaking bass.',
    },
    {
      icon: <Armchair className="w-5 h-5 text-cinema-gold" />,
      title: 'Plush Velvet Recliners',
      desc: 'Generous multi-person lounge sofas and ergonomic reclining armchairs with cup holders.',
    },
    {
      icon: <Wind className="w-5 h-5 text-cinema-gold" />,
      title: 'Independent Climate Control',
      desc: 'High-performance whisper-quiet air conditioning with hospital-grade sanitization.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-cinema-gold" />,
      title: 'Bespoke Celebration Decor',
      desc: 'Romantic rose walkways, fairy lights, LED celebration neon signs, and theme balloons.',
    },
    {
      icon: <Utensils className="w-5 h-5 text-cinema-gold" />,
      title: 'Curated Refreshments',
      desc: 'Freshly popped cinema corn, signature artisan mocktails, pizzas, and personalized cakes.',
    },
    {
      icon: <Eye className="w-5 h-5 text-cinema-gold" />,
      title: 'Complete Absolute Privacy',
      desc: 'No strangers, no seat-kicking, no outside interruptions. Your private haven.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-cinema-gold" />,
      title: 'Dedicated Hospitality',
      desc: 'Our discreet team handles the surprise timing, cakes, and tech seamlessly from outside.',
    },
  ];

  return (
    <section id="experience" className="relative py-28 px-6 bg-cinema-900 border-t border-b border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cinema-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cinema-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-cinema-gold inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> The Cinema Elevated
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Not a cinema. <span className="text-gold-gradient">Your private cinema.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Standard movie theaters are built for the crowd. Movie Date in Guntur is crafted
            exclusively for your intimacy, celebrations, and cherished bonds.
          </p>
        </div>

        {/* Minimal Feature Steps (01 to 04) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-2xl glass-card border border-white/10 hover:border-cinema-gold/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-cinema-gold/30 group-hover:text-cinema-gold transition-colors mb-3">
                {step.num}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cinema-gold-light transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 8 Architectural Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-cinema-850/70 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-cinema-800/80"
            >
              <div className="w-10 h-10 rounded-lg bg-cinema-950 border border-cinema-gold/30 flex items-center justify-center mb-4">
                {feat.icon}
              </div>
              <h4 className="font-display text-base font-bold text-white mb-1.5">
                {feat.title}
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
