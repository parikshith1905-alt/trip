import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Navigation, AlertCircle, ArrowRight } from 'lucide-react';
import { TimelineEvent } from '../types';

interface RoadTripSegmentProps {
  event: TimelineEvent;
  isActive?: boolean;
}

export const RoadTripSegment: React.FC<RoadTripSegmentProps> = ({ event }) => {
  const data = event.roadTripData;

  return (
    <div className="relative my-6 w-full">
      <div className="bg-[#0B132B] text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle highway line effect */}
        <div className="absolute top-0 bottom-0 left-0 right-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Badge & Timing Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>{data?.badge || 'HIGHWAY TRANSIT'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Duration: {data?.duration || event.duration}</span>
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
            {/* Origin */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5 shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">From</span>
                <span className="font-monument text-sm sm:text-base font-bold text-white block">
                  {data?.from || 'Origin'}
                </span>
              </div>
            </div>

            {/* Road animation connector */}
            <div className="flex-grow px-2 py-2 flex flex-col items-center justify-center">
              <div className="w-full relative h-[3px] bg-slate-800 rounded-full my-2">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 opacity-80" />
                <motion.div
                  animate={{ x: ['0%', '100%', '0%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 left-0 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5 rotate-45" />
                </motion.div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">HIGHWAY NH 44 CORRIDOR</span>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3 text-left sm:text-right">
              <div className="sm:order-2 w-10 h-10 rounded-2xl bg-slate-900 border border-rose-400 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5 shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="sm:order-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Target Arrival</span>
                <span className="font-monument text-sm sm:text-base font-bold text-white block">
                  {data?.to || 'Destination'}
                </span>
                <span className="text-xs text-amber-400 font-semibold block mt-0.5 font-mono">
                  {data?.estimatedArrival}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Warning Badges */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-wrap font-mono">
              <span className="font-bold tracking-wider uppercase bg-amber-400/20 px-2 py-0.5 rounded text-[11px] text-amber-300">
                ESTIMATED
              </span>
              <span className="text-slate-300 text-xs font-sans">
                TRAVEL TIME MAY VARY
              </span>
            </div>
          </div>

          {event.mapUrl && (
            <a
              id={`roadtrip-map-btn-${event.id}`}
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-semibold tracking-wider uppercase transition-all min-h-[44px]"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>{event.mapButtonType || 'GET DIRECTIONS'}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Up Next Bar */}
        {event.upNextPlace && (
          <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="uppercase tracking-widest text-[10px] text-slate-400 font-mono">UP NEXT →</span>
            <span className="text-slate-200 font-medium">{event.upNextPlace}</span>
          </div>
        )}
      </div>
    </div>
  );
};
