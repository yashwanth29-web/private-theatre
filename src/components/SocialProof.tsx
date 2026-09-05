import React, { useEffect, useState } from 'react';
import { Review } from '../types';
import { Sparkles, Star, CheckCircle, Quote } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
      })
      .catch((err) => console.error('Failed to load reviews:', err));
  }, []);

  return (
    // Section 5: WHITE Canvas
    <section className="relative py-24 px-6 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Verified Guest Stories
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            REVIEWS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Genuine impressions from couples, friends, and families who celebrated their private moments at Movie Date Guntur.
          </p>
        </div>

        {/* Reviews in Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-emerald-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-black text-slate-900">{rev.name}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                  <span className="text-emerald-700 font-medium">{rev.occasion}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
