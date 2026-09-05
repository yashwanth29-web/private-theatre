import React, { useState } from 'react';
import { POPULAR_MOVIES } from '../data/content';
import { Sparkles, Search, Check, Tv, HardDrive, Laptop, Film } from 'lucide-react';

interface MovieSelectionProps {
  selectedMovie: string;
  onSelectMovie: (title: string) => void;
}

export const MovieSelection: React.FC<MovieSelectionProps> = ({ selectedMovie, onSelectMovie }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  const genres = ['All', 'Romance', 'Sci-Fi', 'Action', 'Drama'];

  const filteredMovies = POPULAR_MOVIES.filter((movie: { title: string; genre: string }) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = activeGenre === 'All' || movie.genre.includes(activeGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <section className="relative py-28 px-6 bg-cinema-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-cinema-gold inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Infinite Entertainment
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tell us what you want to watch.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Stream anything from major OTT platforms in 4K HDR, or connect your personal device to watch
            unreleased home videos, proposals, and series.
          </p>
        </div>

        {/* OTT & Media Support Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center flex flex-col items-center">
            <Tv className="w-5 h-5 text-cinema-gold mb-2" />
            <div className="text-xs font-semibold text-white">OTT Subscriptions</div>
            <div className="text-[11px] text-gray-400">Netflix, Prime, Hotstar 4K</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center flex flex-col items-center">
            <Laptop className="w-5 h-5 text-cinema-gold mb-2" />
            <div className="text-xs font-semibold text-white">HDMI Laptop Plug</div>
            <div className="text-[11px] text-gray-400">Instant Screen Mirroring</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center flex flex-col items-center">
            <HardDrive className="w-5 h-5 text-cinema-gold mb-2" />
            <div className="text-xs font-semibold text-white">USB Pen Drive</div>
            <div className="text-[11px] text-gray-400">Play Personal 4K Files</div>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center flex flex-col items-center">
            <Film className="w-5 h-5 text-cinema-gold mb-2" />
            <div className="text-xs font-semibold text-white">YouTube 4K &amp; Music</div>
            <div className="text-[11px] text-gray-400">Concerts &amp; Live Matches</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
          {/* Genre Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                  activeGenre === genre
                    ? 'bg-cinema-gold text-cinema-950 font-bold'
                    : 'bg-cinema-900 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search popular title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-cinema-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cinema-gold/60"
            />
          </div>
        </div>

        {/* Horizontal Poster Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {filteredMovies.map((movie: { id: string; title: string; genre: string; duration: string; rating: string; year: string }) => {
            const isSelected = selectedMovie === movie.title;

            return (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie.title)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-cinema-gold ring-2 ring-cinema-gold/40 shadow-xl shadow-cinema-gold/20 -translate-y-1.5'
                    : 'border-white/10 hover:border-white/30 hover:-translate-y-1'
                }`}
              >
                {/* Poster Aspect Ratio 2:3 */}
                <div className="aspect-[2/3] w-full relative overflow-hidden bg-cinema-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${movie.})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cinema-gold border border-cinema-gold/30">
                    ★ {movie.rating}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-cinema-gold text-cinema-950 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Bottom Movie Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[10px] text-cinema-gold font-medium uppercase tracking-wider mb-0.5">
                      {movie.genre}
                    </div>
                    <div className="font-display text-sm font-bold text-white line-clamp-1">
                      {movie.title}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{movie.source}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Movie Banner or Custom Request Field */}
        <div className="mt-10 max-w-xl mx-auto p-4 rounded-2xl glass-card border border-cinema-gold/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cinema-gold">
              Selected Presentation:
            </span>
            <div className="text-sm font-bold text-white">
              {selectedMovie || 'Open Choice (Decide on Arrival)'}
            </div>
          </div>
          <button
            onClick={() => onSelectMovie(selectedMovie || 'Open Choice on Arrival')}
            className="px-4 py-2 rounded-xl bg-cinema-gold/15 text-cinema-gold hover:bg-cinema-gold hover:text-black transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            Attach to Booking
          </button>
        </div>
      </div>
    </section>
  );
};
