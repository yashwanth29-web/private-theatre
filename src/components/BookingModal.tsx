import React, { useState, useEffect } from 'react';
import { Package, AddOn, Slot, Booking } from '../types';
import { OCCASIONS } from '../data/content';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Lock,
  Share2,
  Navigation,
  CreditCard,
  QrCode,
  ShieldCheck,
  Film,
  Plus,
  Minus,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOccasion?: string;
  initialPackageId?: string;
  initialDate?: string;
  initialSlotId?: string;
  packages: Package[];
  addOns: AddOn[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialOccasion,
  initialPackageId,
  initialDate,
  initialSlotId,
  packages,
  addOns,
}) => {
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion || 'Couple Date');
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || getTodayStr());
  const [selectedSlotId, setSelectedSlotId] = useState<string>(initialSlotId || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || (packages[1] ? packages[1].id : packages[0]?.id || '')
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [movieTitle, setMovieTitle] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');

  // Live Slots
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Payment Modal & Confirmation State
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'qr'>('upi');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (initialOccasion) {
      const match = OCCASIONS.find((o) => o.id === initialOccasion);
      if (match) {
        setSelectedOccasion(match.title);
        if (match.defaultPackageId) setSelectedPackageId(match.defaultPackageId);
      }
    }
    if (initialDate) setSelectedDate(initialDate);
    if (initialSlotId) setSelectedSlotId(initialSlotId);
    if (initialPackageId) setSelectedPackageId(initialPackageId);
  }, [initialOccasion, initialDate, initialSlotId, initialPackageId]);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    fetch(`/api/availability?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data.slots || []);
        if (selectedSlotId) {
          const valid = data.slots?.some((s: Slot) => s.id === selectedSlotId && s.status === 'available');
          if (!valid) setSelectedSlotId('');
        }
      })
      .catch((err) => console.error('Failed to fetch availability:', err))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  if (!isOpen) return null;

  const currentPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];
  const currentSlot = availableSlots.find((s) => s.id === selectedSlotId);

  const addOnsTotal = selectedAddOns.reduce((acc, name) => {
    const item = addOns.find((a) => a.name === name);
    return acc + (item ? item.price : 0);
  }, 0);
  const grandTotal = (currentPackage?.price || 0) + addOnsTotal;

  const toggleAddOn = (name: string) => {
    if (selectedAddOns.includes(name)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== name));
    } else {
      setSelectedAddOns([...selectedAddOns, name]);
    }
  };

  const handleSlotNext = async () => {
    if (!selectedSlotId) {
      setErrorMessage('Please choose an available time slot.');
      return;
    }
    setErrorMessage('');
    try {
      const res = await fetch('/api/bookings/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, slotId: selectedSlotId }),
      });
      if (res.ok) {
        setCurrentStep(4);
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Slot is temporarily held or booked.');
      }
    } catch {
      setCurrentStep(4);
    }
  };

  const handleConfirmAndPay = async () => {
    setIsProcessingPayment(true);
    setErrorMessage('');

    try {
      const payload = {
        customerName,
        phone,
        email,
        occasion: selectedOccasion,
        date: selectedDate,
        slotId: selectedSlotId,
        packageId: selectedPackageId,
        selectedAddOns,
        movieTitle: movieTitle || 'Surprise / OTT Selection on Arrival',
        specialRequest,
        paymentId: `pay_sim_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      };

      const res = await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedBooking(data.booking);
        setCurrentStep(7);
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#eab308', '#ffffff', '#86efac'],
        });
      } else {
        setErrorMessage(data.error || 'Booking confirmation failed.');
      }
    } catch {
      setErrorMessage('Network error during confirmation. Please contact the concierge.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getCalendarLink = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Movie Date Guntur — ${confirmedBooking.occasion}`);
    const details = encodeURIComponent(
      `Private Theatre Experience at Movie Date Guntur.\nPackage: ${confirmedBooking.packageName}\nBooking ID: ${confirmedBooking.id}`
    );
    const location = encodeURIComponent(
      'Movie Date Guntur, Near Brodipet 4th Line, Main Road, Guntur, AP'
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-emerald-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <Sparkles className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-slate-900">
                Reserve Private Theatre
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Movie Date Guntur</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 7 && (
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Step {currentStep} of 6
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        {currentStep < 7 && (
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-yellow-400 transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* STEP 1: OCCASION */}
          {currentStep === 1 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  1. What are you celebrating?
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Select your occasion for customized private theatre setup.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion === occ.title;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => {
                        setSelectedOccasion(occ.title);
                        if (occ.defaultPackageId) setSelectedPackageId(occ.defaultPackageId);
                      }}
                      className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-white'
                      }`}
                    >
                      <span className="text-lg">
                        {(occ.id === 'couple-date' || occ.id === 'date-night') && '❤️'}
                        {occ.id === 'birthday' && '🎂'}
                        {occ.id === 'proposal' && '💍'}
                        {occ.id === 'friends' && '🍿'}
                        {occ.id === 'family' && '👨‍👩‍👧'}
                        {occ.id === 'private-event' && '✨'}
                      </span>
                      <div>
                        <div className="font-display font-extrabold text-xs sm:text-sm text-slate-900">
                          {occ.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal line-clamp-1">
                          {occ.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DATE */}
          {currentStep === 2 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  2. Choose your date
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Select the day for your private screening session.
                </p>
              </div>

              <div className="bg-[#f8faf9] p-6 rounded-3xl border border-emerald-200/80 max-w-md mx-auto shadow-sm">
                <label className="block text-xs uppercase font-black text-emerald-800 tracking-wider mb-2">
                  Reservation Date:
                </label>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-emerald-300 shadow-sm">
                  <CalendarIcon className="w-5 h-5 text-yellow-600" />
                  <input
                    type="date"
                    min={getTodayStr()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-sm text-slate-900 font-extrabold focus:outline-none w-full"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                  <span>Daily Operating Hours:</span>
                  <span className="text-emerald-800 font-black">10:00 AM – 01:00 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TIME SLOT */}
          {currentStep === 3 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  3. Select an available time slot
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Showing live slots for <span className="text-emerald-700 font-bold">{selectedDate}</span>.
                </p>
              </div>

              {loadingSlots ? (
                <div className="py-10 text-center text-xs text-slate-500">
                  Checking slot availability...
                </div>
              ) : (
                <div className="space-y-2.5">
                  {availableSlots.map((slot) => {
                    const isAvailable = slot.status === 'available';
                    const isSelected = selectedSlotId === slot.id;

                    return (
                      <button
                        key={slot.id}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center justify-between ${
                          !isAvailable
                            ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200 text-slate-900 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-display text-base font-extrabold text-slate-900">
                              {slot.shortTime}
                            </div>
                            <div className="text-[11px] text-slate-500 font-normal">
                              {slot.label} • {slot.tier}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                            isAvailable
                              ? isSelected
                                ? 'bg-yellow-400 text-slate-950 shadow-sm'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {isAvailable ? (isSelected ? 'Selected' : 'Available') : 'Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PACKAGE & ADDONS */}
          {currentStep === 4 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  4. Choose your package &amp; add-ons
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Select a tailored theatre tier, then add flowers, cake, or video greetings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {packages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-display text-sm font-extrabold text-slate-900">
                          {pkg.name}
                        </div>
                        <div className="text-sm font-black text-emerald-700">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 mb-1 font-normal">{pkg.tagline}</div>
                      <div className="text-[10px] text-slate-700 font-bold">
                        ⏱️ {pkg.duration} • 👥 {pkg.guests}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Addons */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-xs uppercase tracking-wider font-black text-emerald-800 mb-2.5">
                  Celebration Add-ons (Optional):
                </div>
                <div className="space-y-2">
                  {addOns.slice(0, 3).map((addon) => {
                    const isAdded = selectedAddOns.includes(addon.name);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.name)}
                        className={`p-3 rounded-2xl cursor-pointer border flex items-center justify-between transition-colors ${
                          isAdded
                            ? 'bg-emerald-50 border-emerald-400 text-slate-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{addon.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{addon.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-emerald-700">
                            +₹{addon.price}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                              isAdded ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isAdded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: DETAILS */}
          {currentStep === 5 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  5. Guest details &amp; movie preference
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Enter your details to generate your digital entry pass.
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Movie / OTT / Custom Show
                  </label>
                  <div className="relative">
                    <Film className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Interstellar 4K / Netflix / Personal USB"
                      value={movieTitle}
                      onChange={(e) => setMovieTitle(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Special Surprise Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Name on cake: Priya; reveal cake at interval"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: SUMMARY & PAY */}
          {currentStep === 6 && (
            <div>
              <div className="mb-5">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
                  6. Review &amp; Confirm Booking
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  Server-verified reservation for Movie Date Guntur.
                </p>
              </div>

              {/* Summary Box in Crisp White */}
              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-emerald-200 mb-5 space-y-2.5">
                <div className="flex justify-between text-xs pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Occasion:</span>
                  <span className="text-slate-900 font-bold">{selectedOccasion}</span>
                </div>
                <div className="flex justify-between text-xs pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-900 font-bold">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-xs pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Time Slot:</span>
                  <span className="text-emerald-700 font-black">{currentSlot?.shortTime}</span>
                </div>
                <div className="flex justify-between text-xs pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Package:</span>
                  <span className="text-slate-900 font-bold">
                    {currentPackage?.name} (₹{currentPackage?.price})
                  </span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-xs pb-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Add-ons:</span>
                    <span className="text-yellow-700 font-bold text-right">
                      {selectedAddOns.join(', ')} (+₹{addOnsTotal})
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold pt-1 text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 font-display text-2xl font-black">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 mb-5">
                <div className="text-xs uppercase font-black text-slate-800">
                  Choose Payment Option:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span>Instant UPI</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-yellow-600" />
                    <span>Card / NetBanking</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                      paymentMethod === 'qr'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Lock className="w-5 h-5 text-emerald-600" />
                    <span>Scan QR</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Protection. Instant confirmation ticket generated immediately.</span>
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRMATION TICKET */}
          {currentStep === 7 && confirmedBooking && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-700 animate-bounce shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Booking Confirmed
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-black text-slate-900 mb-1 uppercase tracking-tight">
                YOUR MOMENT IS RESERVED.
              </h4>
              <p className="text-xs text-slate-600 font-normal max-w-sm mx-auto mb-6">
                Thank you, <strong className="text-slate-900">{confirmedBooking.customerName}</strong>! Your
                private cinema suite is reserved at Movie Date Guntur.
              </p>

              {/* Boarding Pass Ticket */}
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden bg-[#f8faf9] border-2 border-emerald-200 shadow-xl p-5 text-left mb-6 relative">
                <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300 mb-3">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-emerald-600" />
                    <span className="font-display font-black text-sm tracking-wider text-slate-900">
                      MOVIE DATE GUNTUR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black border border-emerald-300">
                    VIP PASS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Booking ID:</span>
                    <div className="font-mono font-black text-emerald-700 text-xs">
                      {confirmedBooking.id}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Occasion:</span>
                    <div className="font-bold text-slate-900">{confirmedBooking.occasion}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Date:</span>
                    <div className="font-bold text-slate-900">{confirmedBooking.date}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Slot Time:</span>
                    <div className="font-black text-emerald-700">
                      {confirmedBooking.slotTime.split('-')[0]}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Package:</span>
                    <div className="font-bold text-slate-900">{confirmedBooking.packageName}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500">Total Paid:</span>
                    <div className="font-black text-slate-900">₹{confirmedBooking.totalAmount}</div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-dashed border-slate-300 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Show this pass at reception for instant entry.
                  </div>
                  <div className="w-11 h-11 bg-white p-1 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                    <QrCode className="w-9 h-9 text-slate-900" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={getCalendarLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-slate-200 shadow-sm"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Calendar</span>
                </a>

                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      'Movie Date Guntur private theatre Andhra Pradesh'
                    )}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-slate-200 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Directions</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hey! I just booked our private cinema experience at Movie Date Guntur for ${confirmedBooking.date} at ${confirmedBooking.slotTime}. Booking ID: ${confirmedBooking.id}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-emerald-300 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Pass</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Controls */}
        {currentStep < 7 && (
          <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep === 1 && (
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Select Slots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleSlotNext}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Choose Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Enter Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 5 && (
              <button
                onClick={() => {
                  if (!customerName.trim() || !phone.trim()) {
                    setErrorMessage('Please provide your name and phone number.');
                    return;
                  }
                  setErrorMessage('');
                  setCurrentStep(6);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Review &amp; Pay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 6 && (
              <button
                disabled={isProcessingPayment}
                onClick={handleConfirmAndPay}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-400 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {isProcessingPayment ? (
                  <span>Reserving Suite...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Booking &amp; Pay ₹{grandTotal}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
