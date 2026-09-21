import React from 'react';
import { ArrowUp, Users, Home, Calendar } from 'lucide-react';
import { TRIP_METADATA } from '../data/itineraryData';

export const FamilyTripFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070F20] text-white pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-block text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold mb-3">
            EPILOGUE
          </div>
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 max-w-2xl">
            {TRIP_METADATA.title}
          </h2>
          <p className="font-monument text-xs sm:text-sm tracking-widest text-slate-300 uppercase mb-8">
            {TRIP_METADATA.subtitle}
          </p>

          {/* Group spec pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-300 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl mb-8 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {TRIP_METADATA.dates}
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {TRIP_METADATA.travellersCount} Travellers ({TRIP_METADATA.adultsCount} Adults · {TRIP_METADATA.kidsCount} Kids)
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-amber-400" />
              {TRIP_METADATA.roomsCount} Rooms
            </span>
          </div>

          {/* Scroll to top button */}
          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="group px-6 py-3 min-h-[44px] rounded-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border border-slate-700 cursor-pointer shadow-lg"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <div>
            Family Trip 2026 · Itinerary Experience
          </div>
          <div className="flex items-center justify-center gap-1 text-slate-400">
            <span>Bangalore → Madurai → Kanyakumari → Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
