import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles, Navigation } from 'lucide-react';
import { ItineraryDay } from '../types';
import { TimelineEventCard } from './TimelineEventCard';
import { RoadTripSegment } from './RoadTripSegment';
import { IslandExperience } from './IslandExperience';
import { SunriseHighlight } from './SunriseHighlight';
import { HomewardJourney } from './HomewardJourney';

interface TimelineDayProps {
  day: ItineraryDay;
  isCurrentDay: boolean;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({ day, isCurrentDay }) => {
  return (
    <section
      id={`day-${day.day}`}
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20"
    >
      {/* Day Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E7DEC8] mb-12 bg-slate-900">
        {/* Day Banner Photo */}
        <div className="relative min-h-[250px] sm:min-h-[280px] w-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          <img
            src={day.heroImage}
            alt={day.routeSummary}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.68] scale-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-slate-950/40 pointer-events-none" />

          {/* Floating Day Meta - Top */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#C69234] text-[#0A192F] text-xs font-bold tracking-widest uppercase font-mono shadow-md">
              {day.dayNumberFormatted}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#E5B563] font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {day.date}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
              THEME: {day.theme}
            </span>
          </div>

          {/* Title & Description - Bottom */}
          <div className="relative z-10 text-white space-y-2 pt-4">
            <h2 className="font-monument text-xl sm:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-md">
              {day.routeSummary}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 font-light max-w-2xl leading-relaxed">
              {day.description}
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Animated Timeline Flow */}
      <div className="relative pl-6 sm:pl-10">
        {/* Continuous vertical timeline connector line */}
        <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[3px] bg-[#E7DEC8] rounded-full">
          <div
            className={`w-full h-full bg-gradient-to-b from-[#C69234] via-[#C85A32] to-[#2A7A78] opacity-80 rounded-full`}
          />
        </div>

        {/* Timeline Events List */}
        <div className="space-y-8 relative">
          {day.events.map((event, index) => {
            const isSpecialRoadTrip = event.specialType === 'road-trip';
            const isIsland = event.specialType === 'island-experience';
            const isSunrise = event.specialType === 'sunrise';
            const isHomeward = event.specialType === 'homeward-journey';

            return (
              <div key={event.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[30px] sm:-left-[38px] top-5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center transition-transform group-hover:scale-115 shadow-sm ${
                    isSpecialRoadTrip || isHomeward
                      ? 'border-[#C85A32] text-[#C85A32]'
                      : isIsland
                      ? 'border-[#2A7A78] text-[#2A7A78]'
                      : isSunrise
                      ? 'border-[#E5B563] text-[#E5B563]'
                      : 'border-[#162A45] text-[#162A45]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                </div>

                {/* Event Component Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4 }}
                >
                  {isSpecialRoadTrip ? (
                    <RoadTripSegment event={event} />
                  ) : isIsland ? (
                    <IslandExperience event={event} />
                  ) : isSunrise ? (
                    <SunriseHighlight event={event} />
                  ) : isHomeward ? (
                    <HomewardJourney event={event} />
                  ) : (
                    <TimelineEventCard event={event} />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
