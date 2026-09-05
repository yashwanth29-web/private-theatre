import React, { useEffect, useRef, useState } from 'react';
import { REAL_IMAGES } from '../data/content';
import { Sparkles, Play, Shield, Volume2, ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreTheatre: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreTheatre }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 35;
    const colors = ['rgba(34, 197, 94, ', 'rgba(234, 179, 8, ', 'rgba(16, 185, 129, '];
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.025;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentOpacity = Math.max(0.2, p.opacity + Math.sin(p.pulse) * 0.25);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / 50,
      y: (clientY - centerY) / 50,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#f8faf9]"
    >
      {/* Light Background Image with Clean Soft Overlay */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(1.05) translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${REAL_IMAGES.theatreMain}')`,
            filter: 'brightness(0.92) contrast(1.02) saturate(1.1)',
            opacity: 0.18,
          }}
        />
        {/* Luminous light mint and sunshine gradient blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#f8faf9]/80 to-[#f8faf9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(187,247,208,0.35)_0%,rgba(254,240,138,0.25)_40%,transparent_70%)]" />
      </div>

      {/* Sunny & Mint Light Projector Beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[60vh] pointer-events-none opacity-60 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(74, 222, 128, 0.25) 0%, rgba(250, 204, 21, 0.2) 40%, transparent 75%)',
          filter: 'blur(45px)',
          transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
        }}
      />

      {/* Floating Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black tracking-widest uppercase text-emerald-800">
            GUNTUR&apos;S PREMIER PRIVATE CINEMA SPACE
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
        </div>

        {/* Crisp High-Contrast Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-slate-900 leading-[1.08] mb-5">
          <span className="block text-slate-900 drop-shadow-sm">Your Theatre.</span>
          <span className="block text-lime-yellow-gradient drop-shadow-sm">Your People.</span>
          <span className="block text-slate-900 drop-shadow-sm">Your Moment.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
          The ultimate private cinema experience in Guntur. Reserve an entire luxury theatre with 4K laser
          projection, Dolby sound, and bespoke celebration decor for couple dates, birthdays, proposals &amp; family reunions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto justify-center mb-10">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 hover:shadow-yellow-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Book Your Experience</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTheatre}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/90 border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white shadow-sm flex items-center justify-center gap-2 group"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 group-hover:scale-110 transition-transform" />
            <span>View 3D Demo</span>
          </button>
        </div>

        {/* Feature Cards in White & Light Green */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 pt-4 w-full text-left">
          <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">100% Private</div>
              <div className="text-[11px] text-slate-500">Zero Crowds</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-yellow-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">150&quot; 4K Screen</div>
              <div className="text-[11px] text-slate-500">Laser Master</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Dolby Atmos</div>
              <div className="text-[11px] text-slate-500">Surround Audio</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-yellow-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 shrink-0">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Custom Decor</div>
              <div className="text-[11px] text-slate-500">Cakes, Roses &amp; Neon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
