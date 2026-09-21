import React from 'react';
import { motion } from 'motion/react';
import { Sun, MapPin, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';

interface SunriseHighlightProps {
  event: TimelineEvent;
  isActive?: boolean;
}

export const SunriseHighlight: React.FC<SunriseHighlightProps> = ({ event, isActive }) => {
  return (
    <div className="relative my-8 w-full">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#F39C12]/30 text-white">
        {/* Background Image with warm dawn radiance */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Dawn at Triveni Sangam"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          {/* Animated golden dawn glow overlay */}
          <motion.div
            animate={{ opacity: [0.65, 0.85, 0.65] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-tr from-[#1B0B2B]/95 via-[#78281F]/70 to-[#C69234]/40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-between min-h-[340px]">
          {/* Top Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#FFE082] text-xs font-bold uppercase tracking-widest">
              <Sun className="w-4 h-4 text-[#FFA726] animate-spin-slow" />
              <span>CINEMATIC MOMENT · TRIVENI SANGAM</span>
            </div>

            <div className="text-xs font-mono text-[#FFE082] bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              5:40 AM – 6:40 AM
            </div>
          </div>

          {/* Center Sunrise Display */}
          <div className="my-6 max-w-2xl">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-monument text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                SUNRISE
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#FFE082] drop-shadow">
                ~6:07 AM
              </span>
            </div>

            <h4 className="font-editorial text-xl sm:text-2xl text-[#FFE5B4] font-medium italic mb-3">
              Where Three Oceans Converge at the Edge of India
            </h4>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              Arabian Sea, Bay of Bengal, and Indian Ocean meet at the seafront of Triveni Sangam. The family gathers in the quiet dawn as the first golden rays illuminate the horizon and the offshore monuments.
            </p>
          </div>

          {/* Bottom Actions & Details */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#FFE082]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB74D]" />
              <span className="font-medium">Group Assembly: 5:00–5:30 AM · Depart Villa 5:30 AM</span>
            </div>

            {event.mapUrl && (
              <a
                id="sunrise-map-btn"
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#C69234] hover:bg-[#D89B37] text-[#0A192F] font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-98"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Up Next Bar */}
        <div className="relative z-10 bg-black/40 backdrop-blur-sm px-6 sm:px-10 py-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">UP NEXT →</span>
          <span className="text-[#FFE082] font-medium">Return to Sunshine Villas (~6:50 AM) & Breakfast</span>
        </div>
      </div>
    </div>
  );
};
