import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ship, MapPin, ExternalLink, Compass, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';
import { DynamicCardImage } from './DynamicCardImage';

interface IslandExperienceProps {
  event: TimelineEvent;
  isActive?: boolean;
  onOpenLightbox?: (url: string, caption?: string) => void;
}

export const IslandExperience: React.FC<IslandExperienceProps> = ({ event, isActive = false, onOpenLightbox }) => {
  const [selectedSubStop, setSelectedSubStop] = useState<string>('vivekananda');

  const islandStops = [
    {
      id: 'mainland-start',
      name: 'Mainland Ferry Jetty',
      type: 'transit',
      icon: 'jetty',
      desc: 'Boarding the coastal ferry from the mainland pier.',
    },
    {
      id: 'vivekananda',
      name: 'Vivekananda Rock Memorial',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vivekananda+Rock+Memorial+Kanyakumari',
      type: 'island-point',
      tag: 'Sacred Island Sanctuary',
      desc: 'Historic rock memorial built in 1970 where Swami Vivekananda attained enlightenment in 1892, perched amid waves.',
      photo: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      secondaryPhoto: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'thiruvalluvar',
      name: 'Thiruvalluvar Statue',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Thiruvalluvar+Statue+Kanyakumari',
      type: 'island-point',
      tag: '133-ft Stone Monument',
      desc: 'Colossal 133-foot stone sculpture of the venerable Tamil poet-philosopher, standing steadfast on an adjacent sea islet.',
      photo: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      secondaryPhoto: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'glass-bridge',
      name: 'Glass Bridge',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kanyakumari+Glass+Bridge',
      type: 'island-point',
      tag: 'Sea View Walkway',
      desc: 'Modern transparent glass walkway connecting visitors directly above the ocean waves crashing between the rocky formations.',
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      secondaryPhoto: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'mainland-return',
      name: 'Mainland Jetty Return',
      type: 'transit',
      icon: 'jetty',
      desc: 'Return coastal ferry cruise back to Kanyakumari mainland.',
    },
  ];

  return (
    <div
      id={`event-card-${event.id}`}
      className={`relative my-6 sm:my-8 w-full transition-all duration-300 ${
        isActive ? 'scale-[1.01] z-10' : 'scale-[0.99] opacity-90'
      }`}
    >
      <div
        className={`bg-gradient-to-br from-[#0F2844] via-[#143254] to-[#0A1E35] text-white rounded-3xl p-6 sm:p-9 shadow-xl overflow-hidden relative transition-all duration-300 border ${
          isActive
            ? 'border-amber-400 shadow-[0_12px_40px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40'
            : 'border-[#234A73]'
        }`}
      >
        {/* Subtle sea wave background overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38B2AC_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#38B2AC]/20 border border-[#38B2AC]/50 flex items-center justify-center text-[#4FD1C5]">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#4FD1C5] font-bold block">
                  SPECIAL SECTION · 12:20–2:30 PM
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    <span>BUS AT JETTY</span>
                  </span>
                )}
              </div>
              <h3 className="font-monument text-xl sm:text-2xl font-bold text-white tracking-wide">
                THE ISLAND EXPERIENCE
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#4FD1C5]" />
            <span>Duration: 2 hours 10 minutes</span>
          </div>
        </div>

        {/* Ferry Movement Diagram: MAINLAND ↓ 🚤 VIVEKANANDA ROCK ↓ THIRUVALLUVAR STATUE ↓ GLASS BRIDGE ↓ 🚤 MAINLAND */}
        <div className="relative z-10 py-6 my-2 bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/5">
          <div className="text-[11px] font-mono tracking-widest text-[#E5B563] uppercase mb-4 text-center">
            ISLAND FERRY PASSAGE SEQUENCE
          </div>

          {/* Flow representation with animated boat */}
          <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium">
            <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
              MAINLAND
            </div>

            <div className="flex items-center gap-1 text-[#4FD1C5]">
              <span className="text-xs">↓</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-base"
              >
                🚤
              </motion.span>
            </div>

            <button
              onClick={() => setSelectedSubStop('vivekananda')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubStop === 'vivekananda'
                  ? 'bg-[#C69234] text-[#0A192F] shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              VIVEKANANDA ROCK
            </button>

            <span className="text-slate-400">↓</span>

            <button
              onClick={() => setSelectedSubStop('thiruvalluvar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubStop === 'thiruvalluvar'
                  ? 'bg-[#C69234] text-[#0A192F] shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              THIRUVALLUVAR STATUE
            </button>

            <span className="text-slate-400">↓</span>

            <button
              onClick={() => setSelectedSubStop('glass-bridge')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubStop === 'glass-bridge'
                  ? 'bg-[#C69234] text-[#0A192F] shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              GLASS BRIDGE
            </button>

            <div className="flex items-center gap-1 text-[#4FD1C5]">
              <span className="text-xs">↓</span>
              <motion.span
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-base"
              >
                🚤
              </motion.span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200">
              MAINLAND
            </div>
          </div>
        </div>

        {/* Selected Island Point Detail Card */}
        {(() => {
          const currentStop = islandStops.find((s) => s.id === selectedSubStop) || islandStops[1];
          return (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-4 items-center">
              {currentStop.photo && (
                <div className="md:col-span-5">
                  <DynamicCardImage
                    photoUrl={currentStop.photo}
                    secondaryPhotoUrl={currentStop.secondaryPhoto}
                    caption={`${currentStop.name} — ${currentStop.tag}`}
                    placeName={currentStop.name}
                    isActive={isActive}
                    onOpenLightbox={onOpenLightbox}
                  />
                </div>
              )}

              <div className={currentStop.photo ? 'md:col-span-7' : 'md:col-span-12'}>
                <div className="inline-block text-[11px] font-mono uppercase tracking-widest text-[#4FD1C5] font-semibold mb-1">
                  ISLAND HIGHLIGHT
                </div>
                <h4 className="font-monument text-lg sm:text-xl font-bold text-white mb-2">
                  {currentStop.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {currentStop.desc}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {currentStop.mapUrl && (
                    <a
                      id={`island-map-btn-${currentStop.id}`}
                      href={currentStop.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#C69234] hover:bg-[#D89B37] text-[#0A192F] font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>OPEN IN GOOGLE MAPS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 3 Quick switcher tabs */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setSelectedSubStop('vivekananda')}
            className={`p-3 min-h-[48px] rounded-xl text-left border transition-all cursor-pointer ${
              selectedSubStop === 'vivekananda'
                ? 'bg-white/15 border-[#C69234]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] font-mono text-[#E5B563] block">POINT 01</span>
            <span className="font-bold text-xs text-white block mt-0.5">Vivekananda Rock</span>
          </button>

          <button
            onClick={() => setSelectedSubStop('thiruvalluvar')}
            className={`p-3 min-h-[48px] rounded-xl text-left border transition-all cursor-pointer ${
              selectedSubStop === 'thiruvalluvar'
                ? 'bg-white/15 border-[#C69234]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] font-mono text-[#E5B563] block">POINT 02</span>
            <span className="font-bold text-xs text-white block mt-0.5">Thiruvalluvar Statue</span>
          </button>

          <button
            onClick={() => setSelectedSubStop('glass-bridge')}
            className={`p-3 min-h-[48px] rounded-xl text-left border transition-all cursor-pointer ${
              selectedSubStop === 'glass-bridge'
                ? 'bg-white/15 border-[#C69234]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] font-mono text-[#E5B563] block">POINT 03</span>
            <span className="font-bold text-xs text-white block mt-0.5">Glass Bridge</span>
          </button>
        </div>

        {/* Footer Up Next */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <span className="text-slate-400 text-[10px] tracking-wider uppercase font-mono">UP NEXT →</span>
          <span className="text-white font-medium">The Curry, Kanyakumari (Lunch at 3:00 PM)</span>
        </div>
      </div>
    </div>
  );
};
