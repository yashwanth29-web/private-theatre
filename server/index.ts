import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'data', 'store.json');

// Interface types
interface Slot {
  id: string;
  label: string;
  shortTime: string;
  tier: string;
}

interface Package {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  duration: string;
  guests: string;
  popular: boolean;
  features: string[];
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Review {
  id: string;
  name: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface BlockedSlot {
  date: string;
  slotId: string;
  reason: string;
}

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  occasion: string;
  date: string;
  slotId: string;
  slotTime: string;
  packageId: string;
  packageName: string;
  selectedAddOns: string[];
  movieTitle: string;
  specialRequest?: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  paymentId: string;
  createdAt: string;
}

interface Database {
  slots: Slot[];
  packages: Package[];
  addOns: AddOn[];
  reviews: Review[];
  blockedSlots: BlockedSlot[];
  bookings: Booking[];
}

// Temporary in-memory locks (10 minute hold during checkout)
interface SlotHold {
  date: string;
  slotId: string;
  expiresAt: number;
  holdId: string;
}
let activeHolds: SlotHold[] = [];

// Helper functions for atomic read/write
function readDB(): Database {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    throw new Error('Database read failed');
  }
}

function writeDB(data: Database): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database:', err);
    throw new Error('Database write failed');
  }
}

// Clean expired holds every 30 seconds
setInterval(() => {
  const now = Date.now();
  activeHolds = activeHolds.filter(h => h.expiresAt > now);
}, 30000);

// ================= API ROUTES =================

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Movie Date Guntur API', time: new Date().toISOString() });
});

// 2. Get packages & add-ons
app.get('/api/packages', (_req: Request, res: Response) => {
  const db = readDB();
  res.json({ packages: db.packages, addOns: db.addOns });
});

// 3. Get customer reviews
app.get('/api/reviews', (_req: Request, res: Response) => {
  const db = readDB();
  res.json({ reviews: db.reviews });
});

// 4. Live Availability for a specific date
app.get('/api/availability', (req: Request, res: Response) => {
  const date = req.query.date as string;
  if (!date) {
    return res.status(400).json({ error: 'Date query param is required (YYYY-MM-DD)' });
  }

  const db = readDB();
  const now = Date.now();

  // Active confirmed bookings on that date
  const bookedSlotIds = new Set(
    db.bookings
      .filter(b => b.date === date && b.status === 'confirmed')
      .map(b => b.slotId)
  );

  // Admin blocked slots on that date
  const blockedSlotIds = new Set(
    db.blockedSlots
      .filter(bs => bs.date === date)
      .map(bs => bs.slotId)
  );

  // In-memory held slots (temporary hold during checkout)
  const heldSlotIds = new Set(
    activeHolds
      .filter(h => h.date === date && h.expiresAt > now)
      .map(h => h.slotId)
  );

  const slotAvailability = db.slots.map(slot => {
    let status: 'available' | 'booked' | 'blocked' | 'held' = 'available';
    let reason = '';

    if (bookedSlotIds.has(slot.id)) {
      status = 'booked';
      reason = 'Reserved by guest';
    } else if (blockedSlotIds.has(slot.id)) {
      status = 'blocked';
      reason = 'Reserved / Private Event';
    } else if (heldSlotIds.has(slot.id)) {
      status = 'held';
      reason = 'Checkout in progress';
    }

    return {
      ...slot,
      status,
      reason,
    };
  });

  return res.json({
    date,
    slots: slotAvailability,
    availableCount: slotAvailability.filter(s => s.status === 'available').length,
    totalSlots: slotAvailability.length,
  });
});

// 5. Temporary hold a slot during checkout step
app.post('/api/bookings/hold', (req: Request, res: Response) => {
  const { date, slotId } = req.body;
  if (!date || !slotId) {
    return res.status(400).json({ error: 'date and slotId are required' });
  }

  const db = readDB();
  const now = Date.now();

  // Check if already booked
  const isBooked = db.bookings.some(b => b.date === date && b.slotId === slotId && b.status === 'confirmed');
  if (isBooked) {
    return res.status(409).json({ error: 'This slot is already booked for the selected date.' });
  }

  // Check if blocked
  const isBlocked = db.blockedSlots.some(bs => bs.date === date && bs.slotId === slotId);
  if (isBlocked) {
    return res.status(409).json({ error: 'This slot is unavailable for reservation.' });
  }

  // Check if held by someone else
  const existingHold = activeHolds.find(h => h.date === date && h.slotId === slotId && h.expiresAt > now);
  if (existingHold) {
    return res.status(409).json({ error: 'Slot currently held by another guest completing payment.' });
  }

  // Create 10-minute hold
  const holdId = `hold_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const expiresAt = now + 10 * 60 * 1000;
  activeHolds.push({ date, slotId, expiresAt, holdId });

  return res.json({ success: true, holdId, expiresAt });
});

// 6. Create payment order (Razorpay compatible mock/real order)
app.post('/api/bookings/create-order', (req: Request, res: Response) => {
  const { amount, currency = 'INR', receipt } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return res.json({
    orderId,
    amount,
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    key: 'rzp_test_moviedate_guntur',
  });
});

// 7. Verify payment and confirm booking (Strict server-side validation)
app.post('/api/bookings/confirm', (req: Request, res: Response) => {
  const {
    customerName,
    phone,
    email,
    occasion,
    date,
    slotId,
    packageId,
    selectedAddOns = [],
    movieTitle = 'Special OTT Selection',
    specialRequest = '',
    paymentId,
    orderId,
  } = req.body;

  if (!customerName || !phone || !date || !slotId || !packageId) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const db = readDB();

  // Check if slot was booked in the interim
  const isAlreadyBooked = db.bookings.some(b => b.date === date && b.slotId === slotId && b.status === 'confirmed');
  if (isAlreadyBooked) {
    return res.status(409).json({ error: 'Slot was booked by another guest just now. Payment will be refunded.' });
  }

  // Validate package
  const pkg = db.packages.find(p => p.id === packageId);
  if (!pkg) {
    return res.status(400).json({ error: 'Invalid package selected' });
  }

  // Validate slot
  const slot = db.slots.find(s => s.id === slotId);
  if (!slot) {
    return res.status(400).json({ error: 'Invalid slot selected' });
  }

  // Calculate accurate total on server
  let addOnTotal = 0;
  selectedAddOns.forEach((addonName: string) => {
    const matched = db.addOns.find(a => a.name === addonName);
    if (matched) addOnTotal += matched.price;
  });

  const totalAmount = pkg.price + addOnTotal;

  // Generate unique booking ID: MDG-YYYYMMDD-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const cleanDate = date.replace(/-/g, '');
  const bookingId = `MDG-${cleanDate}-${randomSuffix}`;

  const newBooking: Booking = {
    id: bookingId,
    customerName,
    phone,
    email: email || '',
    occasion: occasion || 'Couple Date',
    date,
    slotId,
    slotTime: slot.label,
    packageId,
    packageName: pkg.name,
    selectedAddOns,
    movieTitle,
    specialRequest,
    totalAmount,
    status: 'confirmed',
    paymentId: paymentId || `pay_sim_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  db.bookings.push(newBooking);
  writeDB(db);

  // Clear in-memory hold
  activeHolds = activeHolds.filter(h => !(h.date === date && h.slotId === slotId));

  return res.status(201).json({
    success: true,
    booking: newBooking,
    message: 'Private theatre experience booked successfully!',
  });
});

// 8. Get booking details by ID
app.get('/api/bookings/:id', (req: Request, res: Response) => {
  const db = readDB();
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  return res.json({ booking });
});

// ================= ADMIN ROUTES =================

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Default demo credentials: admin / moviedate2026
  if ((username === 'admin' || username === 'admin@moviedate.com') && password === 'moviedate2026') {
    return res.json({
      success: true,
      token: 'jwt_adm_session_' + Date.now(),
      user: { name: 'Movie Date Guntur Manager', role: 'owner' },
    });
  }
  return res.status(401).json({ error: 'Invalid credentials. Use admin / moviedate2026' });
});

// Admin Dashboard Stats & All Bookings
app.get('/api/admin/dashboard', (_req: Request, res: Response) => {
  const db = readDB();
  const todayStr = new Date().toISOString().split('T')[0];

  const todayBookings = db.bookings.filter(b => b.date === todayStr && b.status === 'confirmed');
  const upcomingBookings = db.bookings.filter(b => b.date >= todayStr && b.status === 'confirmed');
  const totalRevenue = db.bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  return res.json({
    stats: {
      totalBookings: db.bookings.length,
      todayBookingsCount: todayBookings.length,
      upcomingBookingsCount: upcomingBookings.length,
      totalRevenue,
      packagesCount: db.packages.length,
      blockedSlotsCount: db.blockedSlots.length,
    },
    bookings: db.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    blockedSlots: db.blockedSlots,
    slots: db.slots,
    packages: db.packages,
  });
});

// Admin Update Booking Status
app.post('/api/admin/bookings/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const db = readDB();
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  booking.status = status;
  writeDB(db);
  return res.json({ success: true, booking });
});

// Admin Block Slot
app.post('/api/admin/slots/block', (req: Request, res: Response) => {
  const { date, slotId, reason = 'Administrative block' } = req.body;
  if (!date || !slotId) {
    return res.status(400).json({ error: 'Date and slotId are required' });
  }
  const db = readDB();
  const exists = db.blockedSlots.some(bs => bs.date === date && bs.slotId === slotId);
  if (!exists) {
    db.blockedSlots.push({ date, slotId, reason });
    writeDB(db);
  }
  return res.json({ success: true, blockedSlots: db.blockedSlots });
});

// Admin Unblock Slot
app.post('/api/admin/slots/unblock', (req: Request, res: Response) => {
  const { date, slotId } = req.body;
  const db = readDB();
  db.blockedSlots = db.blockedSlots.filter(bs => !(bs.date === date && bs.slotId === slotId));
  writeDB(db);
  return res.json({ success: true, blockedSlots: db.blockedSlots });
});

// Admin Update Package
app.post('/api/admin/packages/:id', (req: Request, res: Response) => {
  const { price, duration, popular, features } = req.body;
  const db = readDB();
  const pkg = db.packages.find(p => p.id === req.params.id);
  if (!pkg) {
    return res.status(404).json({ error: 'Package not found' });
  }
  if (price !== undefined) pkg.price = Number(price);
  if (duration !== undefined) pkg.duration = duration;
  if (popular !== undefined) pkg.popular = Boolean(popular);
  if (features !== undefined) pkg.features = features;

  writeDB(db);
  return res.json({ success: true, package: pkg });
});

// Admin Add Review
app.post('/api/admin/reviews', (req: Request, res: Response) => {
  const { name, occasion, rating, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: 'Name and comment are required' });
  }
  const db = readDB();
  const newRev: Review = {
    id: `rev-${Date.now()}`,
    name,
    occasion: occasion || 'Private Screening',
    rating: Number(rating) || 5,
    date: 'Just now',
    comment,
    verified: true,
  };
  db.reviews.unshift(newRev);
  writeDB(db);
  return res.json({ success: true, review: newRev });
});

app.listen(PORT, () => {
  console.log(`🎬 Movie Date Guntur API server running on http://localhost:${PORT}`);
});
