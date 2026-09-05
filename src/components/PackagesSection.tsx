import React from 'react';
import { Package } from '../types';
import { Check, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';

interface PackagesSectionProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ packages, onSelectPackage }) => {
  return (
    // Section 3: WHITE Canvas
    <section id="packages" className="relative py-24 px-6 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-emerald-700 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            PACKAGES
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Every package grants 100% exclusive private theatre access for you and your guests with zero hidden fees.
          </p>
        </div>

        {/* Packages Grid in Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 bg-white ${
                pkg.popular
                  ? 'border-2 border-emerald-400 shadow-xl shadow-emerald-500/10 -translate-y-2 relative'
                  : 'border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-slate-950 text-[10px] font-black tracking-widest uppercase shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Loved
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-4 pt-1">
                  <h3 className="font-display text-xl font-black text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 font-normal min-h-[32px]">{pkg.tagline}</p>
                </div>

                {/* Price */}
                <div className="pb-5 mb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-black text-slate-900">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-xs text-slate-400 line-through font-medium">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold tracking-wide mt-1 block">
                    Entire private hall reserved
                  </span>
                </div>

                {/* Duration & Capacity */}
                <div className="flex items-center gap-2 mb-5 text-xs text-slate-700 font-bold">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-yellow-600" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{pkg.guests}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-normal leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                        <Check className="w-2.5 h-2.5 text-emerald-700" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-slate-950 hover:scale-[1.02] active:scale-95 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
