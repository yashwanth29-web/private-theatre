export interface Slot {
  id: string;
  label: string;
  shortTime: string;
  tier: string;
  status?: 'available' | 'booked' | 'blocked' | 'held';
  reason?: string;
}

export interface Package {
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

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Booking {
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

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  popularFor: string;
  defaultPackageId: string;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  year: string;
  poster: string;
  source: string;
}
