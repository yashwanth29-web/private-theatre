import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicStoryHero } from './components/CinematicStoryHero';
import { Occasions } from './components/Occasions';
import { TheExperience } from './components/TheExperience';
import { GallerySection } from './components/GallerySection';
import { SocialProof } from './components/SocialProof';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Package, AddOn } from './types';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const [bookingOccasion, setBookingOccasion] = useState<string | undefined>();
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>();
  const [bookingDate, setBookingDate] = useState<string | undefined>();
  const [bookingSlotId, setBookingSlotId] = useState<string | undefined>();

  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        if (data.packages) setPackages(data.packages);
        if (data.addOns) setAddOns(data.addOns);
      })
      .catch((err) => console.error('Failed to load packages:', err));
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

        {/* Section 5: REVIEWS */}
        <SocialProof />

        {/* Section 6: LOCATION */}
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
