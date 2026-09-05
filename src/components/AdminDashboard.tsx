import React, { useState, useEffect } from 'react';
import { Booking, Package, Slot, Review } from '../types';
import {
  X,
  ShieldCheck,
  Calendar,
  DollarSign,
  Users,
  Film,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Star,
  Plus,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'slots' | 'packages' | 'reviews'>('overview');

  // Dashboard Data
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<{ date: string; slotId: string; reason: string }[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Slot blocking inputs
  const [blockDate, setBlockDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [blockSlotId, setBlockSlotId] = useState<string>('slot-1');
  const [blockReason, setBlockReason] = useState<string>('Maintenance / Private VIP Booking');

  // Add review form
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewOccasion, setNewReviewOccasion] = useState('Couple Date');
  const [newReviewComment, setNewReviewComment] = useState('');

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setBookings(data.bookings || []);
        setBlockedSlots(data.blockedSlots || []);
        setSlots(data.slots || []);
        setPackages(data.packages || []);
      }
      const revRes = await fetch('/api/reviews');
      if (revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData.reviews || []);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'moviedate2026' || password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
      fetchDashboardData();
    } else {
      setLoginError('Invalid security key. (Demo password: moviedate2026)');
    }
  };

  const handleStatusChange = async (bookingId: string, status: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleBlockSlot = async () => {
    try {
      const res = await fetch('/api/admin/slots/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: blockDate, slotId: blockSlotId, reason: blockReason }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to block slot:', err);
    }
  };

  const handleUnblockSlot = async (date: string, slotId: string) => {
    try {
      const res = await fetch('/api/admin/slots/unblock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, slotId }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to unblock slot:', err);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newReviewAuthor,
          occasion: newReviewOccasion,
          rating: 5,
          comment: newReviewComment,
        }),
      });
      if (res.ok) {
        setNewReviewAuthor('');
        setNewReviewComment('');
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to add review:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-cinema-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-cinema-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cinema-gold/20 text-cinema-gold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Movie Date Guntur — Owner Portal
              </h3>
              <p className="text-[11px] text-gray-400">Venue Operations &amp; Reservation Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-cinema-gold">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl font-bold text-white mb-2">Manager Authentication</h4>
            <p className="text-xs text-gray-400 mb-6">
              Enter the theatre secret passkey to access live occupancy, bookings, and pricing.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Passkey (e.g. moviedate2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cinema-950 border border-white/15 text-white text-sm focus:outline-none focus:border-cinema-gold text-center tracking-widest"
              />
              {loginError && <div className="text-xs text-rose-400">{loginError}</div>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cinema-gold to-cinema-amber text-cinema-950 font-bold text-xs uppercase tracking-wider hover:shadow-lg"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-cinema-950/60 overflow-x-auto">
              {[
                { id: 'overview', label: 'Dashboard Overview' },
                { id: 'bookings', label: `Bookings (${bookings.length})` },
                { id: 'slots', label: `Slot Availability & Blocker` },
                { id: 'packages', label: 'Packages' },
                { id: 'reviews', label: 'Guest Reviews' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-cinema-gold text-cinema-950'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable View Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="glass-card p-4 rounded-2xl border border-white/10">
                      <div className="text-gray-400 text-xs mb-1">Total Revenue</div>
                      <div className="font-display text-2xl font-bold text-cinema-gold">
                        ₹{stats?.totalRevenue?.toLocaleString() || 0}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-1">Direct Bank / UPI Verified</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10">
                      <div className="text-gray-400 text-xs mb-1">Total Reservations</div>
                      <div className="font-display text-2xl font-bold text-white">
                        {stats?.totalBookings || 0}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">Lifetime bookings</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10">
                      <div className="text-gray-400 text-xs mb-1">Today&apos;s Bookings</div>
                      <div className="font-display text-2xl font-bold text-cinema-gold">
                        {stats?.todayBookingsCount || 0}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-1">Confirmed for today</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10">
                      <div className="text-gray-400 text-xs mb-1">Upcoming Sessions</div>
                      <div className="font-display text-2xl font-bold text-white">
                        {stats?.upcomingBookingsCount || 0}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">Forward pipeline</div>
                    </div>
                  </div>

                  {/* Recent Bookings Snapshot */}
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-3">
                      Recent Reservations
                    </h4>
                    <div className="space-y-2">
                      {bookings.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          className="glass-card p-3.5 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-white">{b.customerName} ({b.phone})</div>
                            <div className="text-gray-400">
                              {b.occasion} • {b.date} • {b.slotTime}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-cinema-gold">₹{b.totalAmount}</div>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ALL BOOKINGS */}
              {activeTab === 'bookings' && (
                <div>
                  <h4 className="font-display text-lg font-bold text-white mb-4">
                    All Customer Bookings
                  </h4>
                  <div className="space-y-3">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="glass-card p-5 rounded-2xl border border-white/10 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div>
                            <span className="font-mono text-xs text-cinema-gold font-bold">
                              {b.id}
                            </span>
                            <h5 className="font-display text-base font-bold text-white">
                              {b.customerName}
                            </h5>
                            <span className="text-xs text-gray-400">
                              📞 {b.phone} {b.email && `• ✉️ ${b.email}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : b.status === 'completed'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <div className="font-semibold text-white">{b.date}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Slot:</span>
                            <div className="font-semibold text-cinema-gold">{b.slotTime}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Package:</span>
                            <div className="font-semibold text-white">{b.packageName}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Total Paid:</span>
                            <div className="font-bold text-cinema-gold">₹{b.totalAmount}</div>
                          </div>
                        </div>

                        {b.movieTitle && (
                          <div className="text-xs text-gray-300">
                            🎬 <strong className="text-white">Movie / OTT Request:</strong>{' '}
                            {b.movieTitle}
                          </div>
                        )}

                        {b.specialRequest && (
                          <div className="text-xs text-gray-300 bg-white/5 p-2 rounded-lg">
                            💬 <strong className="text-white">Special Notes:</strong>{' '}
                            {b.specialRequest}
                          </div>
                        )}

                        {/* Status Change Controls */}
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <span className="text-[11px] text-gray-400 mr-2">Action:</span>
                          <button
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                          >
                            Mark Confirmed
                          </button>
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold transition-colors"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SLOTS & BLOCKER */}
              {activeTab === 'slots' && (
                <div className="space-y-6">
                  {/* Slot Blocker Form */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10">
                    <h5 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cinema-gold" /> Block Slot / Reserve for Private Event
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Date</label>
                        <input
                          type="date"
                          value={blockDate}
                          onChange={(e) => setBlockDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Time Slot</label>
                        <select
                          value={blockSlotId}
                          onChange={(e) => setBlockSlotId(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                        >
                          {slots.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.shortTime} ({s.label})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Reason</label>
                        <input
                          type="text"
                          value={blockReason}
                          onChange={(e) => setBlockReason(e.target.value)}
                          placeholder="e.g. VIP offline guest booking"
                          className="w-full px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleBlockSlot}
                      className="px-5 py-2 rounded-xl bg-cinema-gold text-cinema-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Block Slot From Public Booking
                    </button>
                  </div>

                  {/* List of Blocked Slots */}
                  <div>
                    <h5 className="font-display font-bold text-base text-white mb-3">
                      Currently Blocked Slots ({blockedSlots.length})
                    </h5>
                    {blockedSlots.length === 0 ? (
                      <div className="text-xs text-gray-400">No slots currently blocked.</div>
                    ) : (
                      <div className="space-y-2">
                        {blockedSlots.map((bs, idx) => (
                          <div
                            key={idx}
                            className="glass-card p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-white">{bs.date}</span> • Slot:{' '}
                              <span className="text-cinema-gold font-mono">{bs.slotId}</span>
                              <div className="text-gray-400 font-light">{bs.reason}</div>
                            </div>
                            <button
                              onClick={() => handleUnblockSlot(bs.date, bs.slotId)}
                              className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-xs hover:bg-emerald-500/30 flex items-center gap-1"
                            >
                              <Unlock className="w-3.5 h-3.5" /> Unblock
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: PACKAGES */}
              {activeTab === 'packages' && (
                <div>
                  <h4 className="font-display text-lg font-bold text-white mb-4">
                    Active Theatre Packages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-display text-base font-bold text-white">{pkg.name}</h5>
                          <span className="font-bold text-cinema-gold text-base">₹{pkg.price}</span>
                        </div>
                        <div className="text-gray-400">{pkg.tagline}</div>
                        <div className="text-gray-300">
                          ⏱️ {pkg.duration} • 👥 {pkg.guests}
                        </div>
                        <div className="pt-2 border-t border-white/10 space-y-1">
                          {pkg.features.map((f, i) => (
                            <div key={i} className="text-gray-400">
                              • {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Add Review Form */}
                  <form onSubmit={handleAddReview} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                    <h5 className="font-display font-bold text-base text-white">Add Customer Review</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Customer Name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Occasion (e.g. Birthday Celebration)"
                        value={newReviewOccasion}
                        onChange={(e) => setNewReviewOccasion(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Review text..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cinema-950 border border-white/10 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cinema-gold text-cinema-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Publish Review
                    </button>
                  </form>

                  {/* Existing Reviews */}
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-white">
                            {rev.name} ({rev.occasion})
                          </div>
                          <p className="text-gray-400 mt-1">&ldquo;{rev.comment}&rdquo;</p>
                        </div>
                        <div className="text-cinema-gold font-bold">★ {rev.rating}/5</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
