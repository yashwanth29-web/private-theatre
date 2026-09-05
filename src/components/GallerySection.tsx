import React, { useState, useRef } from 'react';
import { GALLERY_IMAGES } from '../data/content';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    // Section 4: VERY LIGHT GREEN Canvas
    <section id="gallery" className="relative py-24 px-6 bg-[#F4FBF7] overflow-hidden border-t border-emerald-100/60">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Real Venue Photography
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
              GALLERY
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal mt-2 max-w-xl">
              Authentic photography from our Guntur theatre—150&quot; laser screen, ambient celebration neon, recliner comfort, and romantic decor.
            </p>
          </div>

          {/* Horizontal Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollHorizontally('left')}
              className="w-12 h-12 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={() => scrollHorizontally('right')}
              className="w-12 h-12 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Gallery Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GALLERY_IMAGES.map((image, idx) => (
            <div
              key={image.id}
              onClick={() => openLightbox(idx)}
              className="group relative flex-none w-[320px] sm:w-[420px] h-[320px] sm:h-[380px] rounded-3xl overflow-hidden cursor-pointer bg-white border border-emerald-100/90 hover:border-emerald-300 transition-all duration-300 shadow-xs hover:shadow-lg snap-start"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-slate-900 border border-white/60 shadow-xs">
                  {image.category}
                </span>
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4 text-emerald-600" />
              </div>

              {/* Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                  {image.title}
                </h3>
                <p className="text-xs text-slate-200 font-normal line-clamp-2">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox Modal with Crisp Clean Backdrop */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl max-h-[75vh] w-full flex items-center justify-center bg-black">
              <img
                src={GALLERY_IMAGES[lightboxIndex].url}
                alt={GALLERY_IMAGES[lightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-display text-lg font-bold text-white">
                {GALLERY_IMAGES[lightboxIndex].title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
                {GALLERY_IMAGES[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
