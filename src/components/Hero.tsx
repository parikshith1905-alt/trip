import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, MapPin, Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { TRIP_METADATA } from '../data/itineraryData';

interface HeroProps {
  onExploreClick: () => void;
  onCityClick: (targetId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCityClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#070F20] text-white"
    >
      {/* Background Image with Modern Deep Ocean & Night Horizon Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=85"
          alt="Southern Coastal Heritage"
          className="w-full h-full object-cover object-center scale-105 opacity-35 filter brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070F20]/95 via-[#0A162D]/75 to-[#070F20]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.12)_0,transparent_65%)]" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-8 sm:py-20 flex flex-col items-center text-center my-auto">
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase mb-5 shadow-lg"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{TRIP_METADATA.dates}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-monument text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          {TRIP_METADATA.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-editorial text-base sm:text-2xl md:text-3xl italic text-slate-200 max-w-3xl mb-8 font-light tracking-wide"
        >
          {TRIP_METADATA.subtitle}
        </motion.p>

        {/* Large Animated Journey Line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-7 mb-8 shadow-2xl"
        >
          <div className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-5 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highway Corridor</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 relative">
            {/* Connecting highway track line for desktop */}
            <div className="hidden sm:block absolute top-[28px] left-[15%] right-[15%] h-[3px] bg-slate-700/80 rounded-full z-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 opacity-70" />
            </div>

            {/* City 1: Bangalore */}
            <button
              id="hero-stop-bangalore"
              onClick={() => onCityClick('day-1')}
              className="group relative z-10 flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer min-h-[44px]"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] border-2 border-amber-400 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <span className="font-monument text-xs sm:text-sm font-semibold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                BANGALORE
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 mt-0.5 font-mono">Oct 01 · 8:00 PM</span>
            </button>

            {/* City 2: Madurai */}
            <button
              id="hero-stop-madurai"
              onClick={() => onCityClick('day-2')}
              className="group relative z-10 flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer min-h-[44px]"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] border-2 border-rose-400 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              </div>
              <span className="font-monument text-xs sm:text-sm font-semibold tracking-wider text-white group-hover:text-rose-300 transition-colors">
                MADURAI
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 mt-0.5 font-mono">Oct 02 · Heritage</span>
            </button>

            {/* City 3: Kanyakumari */}
            <button
              id="hero-stop-kanyakumari"
              onClick={() => onCityClick('day-3')}
              className="group relative z-10 flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer min-h-[44px]"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] border-2 border-cyan-400 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>
              <span className="font-monument text-xs sm:text-sm font-semibold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                KANYAKUMARI
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 mt-0.5 font-mono">Oct 02–04 · Coast</span>
            </button>

            {/* City 4: Bangalore Return */}
            <button
              id="hero-stop-return"
              onClick={() => onCityClick('day-4')}
              className="group relative z-10 flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer min-h-[44px]"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] border-2 border-amber-400 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                <MapPin className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-monument text-xs sm:text-sm font-semibold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                BANGALORE
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 mt-0.5 font-mono">Oct 05 · Return</span>
            </button>
          </div>
        </motion.div>

        {/* Group Stats Grid - only place mentioning Private Mini-Bus */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl mb-8"
        >
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-center backdrop-blur-sm">
            <span className="text-xl sm:text-2xl font-bold font-monument text-white block">17</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-medium">Travellers</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-center backdrop-blur-sm">
            <span className="text-xl sm:text-2xl font-bold font-monument text-white block">15 · 2</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-medium">Adults · Kids</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-center backdrop-blur-sm">
            <span className="text-xl sm:text-2xl font-bold font-monument text-white block">5</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-medium">Rooms</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-center backdrop-blur-sm">
            <span className="text-xl sm:text-2xl font-bold font-monument text-amber-300 block">1</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-semibold">Private Mini-Bus</span>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.button
          id="hero-explore-btn"
          onClick={onExploreClick}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="group px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_4px_24px_rgba(245,158,11,0.35)] flex items-center gap-2.5 transition-all cursor-pointer min-h-[44px]"
        >
          <span>EXPLORE ROAD TIMELINE</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>

      {/* Clean Bottom Bar with subtle scroll indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-center text-xs text-slate-400">
        <button
          onClick={onExploreClick}
          aria-label="Scroll down to itinerary"
          className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
        >
          <span>Scroll to begin road journey</span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
