import React, { useState, useEffect } from 'react';
import { Slot } from '../types';
import { DEFAULT_SLOTS } from '../data/content';
import { Sparkles, Clock, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface LiveTimelineProps {
  onSelectSlot: (date: string, slotId: string) => void;
}

export const LiveTimeline: React.FC<LiveTimelineProps> = ({ onSelectSlot }) => {
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const defaultAvailableSlots: Slot[] = DEFAULT_SLOTS.map((s) => ({ ...s, status: 'available' }));

  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());
  const [slots, setSlots] = useState<Slot[]>(defaultAvailableSlots);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableCount, setAvailableCount] = useState<number>(defaultAvailableSlots.length);

  const fetchAvailability = async (dateStr: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/availability?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        if (data.slots && data.slots.length > 0) {
          setSlots(data.slots);
          setAvailableCount(data.availableCount ?? data.slots.length);
          return;
        }
      }
      setSlots(defaultAvailableSlots);
      setAvailableCount(defaultAvailableSlots.length);
    } catch {
      setSlots(defaultAvailableSlots);
      setAvailableCount(defaultAvailableSlots.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate]);

  return (
    <section id="schedule" className="relative py-20 px-6 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-emerald-600 inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Real-Time Theatre Schedule
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose your moment.
            </h2>
          </div>

          {/* Quick Date Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDate(getTodayStr())}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedDate === getTodayStr()
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(getTomorrowStr())}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedDate === getTomorrowStr()
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Tomorrow
            </button>
            <input
              type="date"
              min={getTodayStr()}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
            />
            <button
              onClick={() => fetchAvailability(selectedDate)}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-emerald-600 border border-slate-200 transition-colors"
              title="Refresh slots"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status Count Indicator */}
        <div className="mb-5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-900 font-bold">
              {loading ? 'Checking slots...' : `${availableCount} slots available for ${selectedDate}`}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Booked
            </span>
          </div>
        </div>

        {/* Slots List in Pure White Cards */}
        <div className="space-y-3">
          {slots.map((slot) => {
            const isAvailable = slot.status === 'available';

            return (
              <div
                key={slot.id}
                className={`rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                  isAvailable
                    ? 'bg-white border-emerald-200 shadow-sm hover:border-emerald-500 hover:shadow-md'
                    : 'bg-slate-100 border-slate-200 opacity-60'
                }`}
              >
                {/* Left */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base sm:text-lg font-extrabold text-slate-900">
                        {slot.shortTime}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-black border border-yellow-200">
                        {slot.tier}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-normal">
                      {slot.label} • 2.5h Private Suite
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-xs font-bold">
                    {isAvailable ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Available
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-500" /> {slot.reason || 'Booked'}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={!isAvailable}
                    onClick={() => onSelectSlot(selectedDate, slot.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
                      isAvailable
                        ? 'bg-gradient-to-r from-emerald-500 to-yellow-400 text-white hover:shadow-md hover:scale-[1.02] active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{isAvailable ? 'Reserve' : 'Locked'}</span>
                    {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
