import { OccasionItem, Movie } from '../types';

// Authentic High-Resolution Photographs (1080p+, direct, zero thumbnails)
export const REAL_IMAGES = {
  // Real Movie Date Private Theatre in Guntur / Narasaraopet celebration setup with neon & balloon decor
  movieDateNeon: 'https://content.jdmagicbox.com/v2/comp/narasaraopet/g1/9999p8647.8647.251211193700.i4g1/catalogue/movie-date-private-theatre-narasaraopet-party-equipments-on-rent-npjusvzo85.jpg',
  // High-Res Private Theatre Screen & Lounge (BNB TPL storage)
  theatreMain: 'https://bnbtplstorageaccount.blob.core.windows.net/homepage/theater3.jpg',
  theatreInterior: 'https://bnbtplstorageaccount.blob.core.windows.net/homepage/theater2.jpg',
  theatreEntrance: 'https://bnbtplstorageaccount.blob.core.windows.net/homepage/theater1.jpg',
  // High-Res Stellar VIP Theatre with electric recliners & warm mood lighting
  theatreStellar: 'https://bnbtplstorageaccount.blob.core.windows.net/theaterpics/stellar1.jpg',
  theatreStellar2: 'https://bnbtplstorageaccount.blob.core.windows.net/theaterpics/stellar2.jpg',
  // High-Res Magic Wings Screen with wide 4K projection
  screenMagicWings: 'https://bingedelight.com/includes/Screens/Magic%20Wings/3.jpg',
  screenMagicWingsWide: 'https://bingedelight.com/includes/Screens/Magic%20Wings/1.jpg',
};

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'date-night',
    title: 'Date Night',
    subtitle: 'Intimate Cinema for Two',
    description: 'A cozy candlelit escape with recliner luxury, fairy lights, and your favorite story on the big screen.',
    icon: 'Heart',
    image: REAL_IMAGES.theatreStellar,
    popularFor: 'Anniversaries, Date Nights & Quality Time',
    defaultPackageId: 'date-night-romantic',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    subtitle: 'The Ultimate Celebration',
    description: 'Celebrate your special one with personalized screen greetings, balloon decor, signature cake, and surprise timing.',
    icon: 'Cake',
    image: REAL_IMAGES.movieDateNeon,
    popularFor: 'Midnight Birthdays & Surprise Parties',
    defaultPackageId: 'grand-celebration',
  },
  {
    id: 'proposal',
    title: 'Proposal',
    subtitle: 'A Question Under the Stars',
    description: 'Walk in on a rose petal carpet leading to a glowing "Marry Me" neon installation, custom video montage, and champagne toast.',
    icon: 'Sparkles',
    image: REAL_IMAGES.theatreStellar2,
    popularFor: 'Dream Proposals & Ring Ceremonies',
    defaultPackageId: 'grand-celebration',
  },
  {
    id: 'friends',
    title: 'Friends',
    subtitle: 'Private Binge & Cheer',
    description: 'Cheer for your team, binge your favorite series, or re-watch cult classics with theater-grade surround sound.',
    icon: 'Users',
    image: REAL_IMAGES.theatreMain,
    popularFor: 'Cricket Finals, Binge Watch & Chill',
    defaultPackageId: 'cinema-classic',
  },
  {
    id: 'family',
    title: 'Family',
    subtitle: 'Wholesome Gathering',
    description: 'A relaxed, private movie night with parents, grandparents, and kids with zero outside crowd disturbances.',
    icon: 'Users',
    image: REAL_IMAGES.theatreInterior,
    popularFor: 'Family Get-Togethers & Holiday Screenings',
    defaultPackageId: 'vip-lounge',
  },
  {
    id: 'private-event',
    title: 'Private Event',
    subtitle: 'Bespoke Hall Hire',
    description: 'Host private gaming tournaments, karaoke parties, corporate appreciation, or premiere screening sessions.',
    icon: 'Sparkles',
    image: REAL_IMAGES.screenMagicWings,
    popularFor: 'Gaming Nights, Karaoke & Mini Events',
    defaultPackageId: 'vip-lounge',
  },
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Private Cinema Hall & Acoustic Lounge',
    category: 'Private Cinema',
    url: 'https://content.jdmagicbox.com/v2/comp/bangalore/q6/080pxx80.xx80.230110060019.s6q6/catalogue/binge-watch-jayanagar-5th-block-bangalore-private-cinema-hall-ug4p874j3k.jpg',
    caption: 'Acoustically calibrated surround sound with widescreen projection and plush recliner ambiance.',
  },
  {
    id: 'gal-2',
    title: 'Party & Celebration Banquet Theatre',
    category: 'Celebrations',
    url: 'https://content.jdmagicbox.com/v2/comp/hyderabad/t2/040pxx40.xx40.240712160500.e6t2/catalogue/party-bash-private-theaters-hyderabad-banquet-halls-9mio2d1vie.jpg',
    caption: 'Custom balloon arches, neon backdrops, and signature cake table for grand celebrations.',
  },
  {
    id: 'gal-3',
    title: 'Romantic Date Night Setup',
    category: 'Date Night',
    url: 'https://privatecelebrationtheater.com/img/gallery/2.jpg',
    caption: 'Intimate candlelit ambiance with fairy lights, rose petals, and private screen experience.',
  },
  {
    id: 'gal-4',
    title: 'VIP Celebration Suite',
    category: 'Surprise Decor',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7oEWQ5Sh4BVVDQ5v-8bp1BidjV5jO-GzoM-ZeDXb4u7kjaa0lG9CCJms&s=10',
    caption: 'Glow neon installations, festive themed decor, and personalized big-screen greeting.',
  },
  {
    id: 'gal-5',
    title: 'Luxury Recliner & Screening Lounge',
    category: 'VIP Lounge',
    url: 'https://content.jdmagicbox.com/v2/comp/warangal/m7/9999px870.x870.250322170736.w5m7/catalogue/cheers-cuddle-private-theater-hanamkonda-warangal-private-cinema-halls-ywlo32mfcf.jpg',
    caption: 'Electric recliners, comfort couches, and 4K private theatre viewing for you and your group.',
  },
];

export const VENUE_INFO = {
  name: 'Movie Date Guntur',
  tagline: 'Private Cinema & Celebrations Lounge',
  address: 'Brodipet 4th Line, Near Municipal Complex, Guntur, Andhra Pradesh 522002',
  phone: '+91 94944 87889',
  whatsapp: '919494487889',
  hours: '10:00 AM – 01:00 AM Daily (By Prior Reservation)',
  instagram: 'https://www.instagram.com/moviedate.guntur/',
  instagramHandle: '@moviedate.guntur',
  city: 'Guntur',
};

export const POPULAR_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    duration: '2h 49m',
    rating: '8.7',
    year: '2014',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    source: 'Netflix 4K • Dolby Atmos',
  },
  {
    id: 'm2',
    title: 'La La Land',
    genre: 'Romance',
    duration: '2h 08m',
    rating: '8.0',
    year: '2016',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    source: 'Prime Video • 4K HDR',
  },
  {
    id: 'm3',
    title: 'Inception',
    genre: 'Sci-Fi',
    duration: '2h 28m',
    rating: '8.8',
    year: '2010',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    source: 'Apple TV+ • 4K',
  },
  {
    id: 'm4',
    title: 'The Notebook',
    genre: 'Romance',
    duration: '2h 03m',
    rating: '7.8',
    year: '2004',
    poster: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
    source: 'Netflix HD • Remastered',
  },
  {
    id: 'm5',
    title: 'The Dark Knight',
    genre: 'Action',
    duration: '2h 32m',
    rating: '9.0',
    year: '2008',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&auto=format&fit=crop&q=80',
    source: 'JioCinema • 4K HDR',
  },
  {
    id: 'm6',
    title: 'About Time',
    genre: 'Romance',
    duration: '2h 03m',
    rating: '7.8',
    year: '2013',
    poster: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    source: 'Prime Video • Dolby 5.1',
  },
];
