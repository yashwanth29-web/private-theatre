import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicStoryHero } from './components/CinematicStoryHero';
import { Occasions } from './components/Occasions';
import { TheExperience } from './components/TheExperience';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Package, AddOn } from './types';
import { DEFAULT_PACKAGES, DEFAULT_ADDONS } from './data/content';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const [bookingOccasion, setBookingOccasion] = useState<string | undefined>();
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>();
  const [bookingDate, setBookingDate] = useState<string | undefined>();
  const [bookingSlotId, setBookingSlotId] = useState<string | undefined>();

  const [packages, setPackages] = useState<Package[]>(DEFAULT_PACKAGES);
  const [addOns, setAddOns] = useState<AddOn[]>(DEFAULT_ADDONS);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.packages && data.packages.length > 0) setPackages(data.packages);
        if (data.addOns && data.addOns.length > 0) setAddOns(data.addOns);
      })
      .catch((err) => console.log('Using default packages and add-ons:', err.message));
  }, []);

  const handleOpenBooking = (initialOccasion?: string) => {
    if (initialOccasion) setBookingOccasion(initialOccasion);
    setBookingModalOpen(true);
  };

  const handleSelectOccasion = (occasionId: string) => {
    setBookingOccasion(occasionId);
    setBookingModalOpen(true);
  };

  const handleScrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Minimal Floating Translucent Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <main className="flex-1">
        {/* Full-Screen Pinned Cinematic Scroll Storytelling (Scenes 01 - 06) */}
        <CinematicStoryHero
          onOpenBooking={() => handleOpenBooking()}
          onExploreSchedule={handleScrollToExperience}
        />

        {/* Section 1: CHOOSE YOUR MOMENT */}
        <Occasions onSelectOccasion={handleSelectOccasion} />

        {/* Section 2: THE EXPERIENCE */}
        <TheExperience />

        {/* Section 3: GALLERY */}
        <GallerySection />

        {/* Section 4: LOCATION */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Always accessible Floating Booking Button (Desktop & Mobile) */}
      <FloatingCTA onOpenBooking={() => handleOpenBooking()} />

      {/* 6-Step Booking Flow Engine */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialOccasion={bookingOccasion}
        initialPackageId={bookingPackageId}
        initialDate={bookingDate}
        initialSlotId={bookingSlotId}
        packages={packages}
        addOns={addOns}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
};
export default App;
