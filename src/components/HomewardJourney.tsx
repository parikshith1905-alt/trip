import React from 'react';
import { motion } from 'motion/react';
import { Clock, Navigation, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';
import { DynamicCardImage } from './DynamicCardImage';

interface HomewardJourneyProps {
  event: TimelineEvent;
  isActive?: boolean;
  onOpenLightbox?: (url: string, caption?: string) => void;
}

export const HomewardJourney: React.FC<HomewardJourneyProps> = ({ event, isActive = false, onOpenLightbox }) => {
  return (
    <div
      id={`event-card-${event.id}`}
      className={`relative my-6 sm:my-10 w-full transition-all duration-300 ${
        isActive ? 'scale-[1.01] z-10' : 'scale-[0.99] opacity-90'
      }`}
    >
      <div
        className={`bg-[#0B132B] text-white rounded-3xl p-5 sm:p-9 relative overflow-hidden transition-all duration-300 border ${
          isActive
            ? 'border-amber-400 shadow-[0_16px_50px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/40'
            : 'border-amber-400/40 shadow-2xl'
        }`}
      >
        {/* Animated ambient light */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 font-bold block uppercase">
                  2:00 PM DEPARTURE · OCT 04
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    <span>BUS HEADING HOME</span>
                  </span>
                )}
              </div>
              <h3 className="font-monument text-xl sm:text-3xl font-bold text-white tracking-tight">
                HOMEWARD JOURNEY
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>~12–13 Hours With Meal & Fuel Stops</span>
          </div>
        </div>

        {/* Dynamic Road Trip Image */}
        {event.photoUrl && (
          <div className="relative z-10 my-5">
            <DynamicCardImage
              photoUrl={event.photoUrl}
              secondaryPhotoUrl={event.secondaryPhotoUrl}
              caption={event.photoCaption || 'Homeward journey northward along NH 44 corridor toward Bangalore'}
              placeName={event.place}
              isActive={isActive}
              onOpenLightbox={onOpenLightbox}
            />
          </div>
        )}

        {/* Route Visualization */}
        <div className="relative z-10 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-center">
            {/* Start Node: Kanyakumari */}
            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 text-center">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block mb-1">
                DEPARTURE POINT
              </span>
              <h4 className="font-monument text-base sm:text-lg font-bold text-white mb-1">KANYAKUMARI</h4>
              <p className="text-xs text-slate-300">Sea View Restaurant · Board at 2:00 PM</p>
              <div className="mt-2 text-[11px] font-semibold text-amber-400">17 Travellers</div>
            </div>

            {/* Middle Animated Transit Arrow & Highway Info */}
            <div className="flex flex-col items-center justify-center text-center px-2 py-3">
              <div className="w-full relative h-[3px] bg-slate-800 rounded-full my-3">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400" />
                <motion.div
                  animate={{ x: ['0%', '90%', '0%'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 left-0 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg"
                >
                  <Navigation className="w-3.5 h-3.5 rotate-45" />
                </motion.div>
              </div>

              <span className="font-monument text-xs uppercase tracking-widest text-amber-400 mt-1 font-bold">
                HIGHWAY NH 44 NORTHBOUND
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                Route: Tirunelveli → Madurai → Salem → Hosur
              </span>
            </div>

            {/* End Node: Bangalore */}
            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-amber-400/30 text-center relative overflow-hidden">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
                EXPECTED ARRIVAL
              </span>
              <h4 className="font-monument text-base sm:text-lg font-bold text-white mb-1">BANGALORE</h4>
              <p className="text-xs text-slate-300">Homecoming arrival</p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-xs font-mono font-bold text-amber-300">
                ~2:00–3:00 AM · OCT 05
              </div>
            </div>
          </div>
        </div>

        {/* Warning and Directions CTA */}
        <div className="relative z-10 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  ESTIMATED
                </span>
                <span className="text-xs text-slate-300">
                  TRAVEL TIME MAY VARY WITH STOPS & TRAFFIC
                </span>
              </div>
            </div>
          </div>

          {event.mapUrl && (
            <a
              id="homeward-get-directions-btn"
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xl active:scale-98 cursor-pointer min-h-[44px]"
            >
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
