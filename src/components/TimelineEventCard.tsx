import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Clock,
  Footprints,
  Ship,
  Bed,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Ticket,
  Utensils,
  ShoppingBag,
  AlertCircle,
  Users,
} from 'lucide-react';
import { TimelineEvent, TransportType } from '../types';

interface TimelineEventCardProps {
  event: TimelineEvent;
  isCurrent?: boolean;
}

export const TimelineEventCard: React.FC<TimelineEventCardProps> = ({ event, isCurrent }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getTransportIcon = (type?: TransportType) => {
    switch (type) {
      case 'FERRY':
        return <Ship className="w-3.5 h-3.5 text-[#2A7A78]" />;
      case 'WALK':
        return <Footprints className="w-3.5 h-3.5 text-[#8C6D38]" />;
      case 'REST':
        return <Bed className="w-3.5 h-3.5 text-[#5B6B7C]" />;
      default:
        return null;
    }
  };

  // Do not show mini-bus badges anywhere in timeline cards
  const shouldShowTransportBadge =
    event.transportLabel &&
    event.transport !== 'MINI-BUS' &&
    !event.transportLabel.toLowerCase().includes('mini-bus');

  return (
    <div
      id={`event-card-${event.id}`}
      className={`w-full rounded-2xl transition-all duration-300 border ${
        isCurrent
          ? 'bg-white border-[#C69234] shadow-lg ring-2 ring-[#C69234]/20'
          : 'bg-white/95 hover:bg-white border-[#E7DEC8] hover:border-[#D5C7AF] shadow-xs'
      }`}
    >
      {/* Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-6 cursor-pointer select-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          {/* Time Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#162A45] bg-[#F4EFE6] px-2.5 py-1 rounded-md tracking-tight border border-[#E7DEC8]">
              {event.time}
            </span>
            {event.duration && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#7C8895]">
                <Clock className="w-3 h-3 text-[#C85A32]" />
                {event.duration}
              </span>
            )}
          </div>

          {/* Transport / Tag Pill */}
          <div className="flex items-center gap-2">
            {shouldShowTransportBadge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-[#162A45] bg-[#EFE9DB] px-2.5 py-1 rounded-full uppercase">
                {getTransportIcon(event.transport)}
                <span>{event.transportLabel}</span>
              </span>
            )}
            <button
              aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
              className="w-8 h-8 rounded-full bg-[#F4EFE6] hover:bg-[#EAE3D2] active:bg-[#E2D9C5] flex items-center justify-center text-[#162A45] transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Place Title */}
        <h3 className="font-monument text-base sm:text-lg md:text-xl font-bold text-[#162A45] tracking-tight leading-snug">
          {event.place}
        </h3>

        {/* Activity Summary with Arrive & Depart clearly noted */}
        <p className="text-xs sm:text-sm text-[#475569] font-medium mt-1.5 leading-relaxed">
          {event.activity}
        </p>
      </div>

      {/* Expandable Content Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#F0EAE1] px-4 sm:px-6 pb-5 pt-3.5 space-y-3.5"
          >
            {/* Optional Photo Moment */}
            {event.photoUrl && (
              <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden shadow-xs border border-[#E7DEC8]">
                <img
                  src={event.photoUrl}
                  alt={event.place}
                  className="w-full h-full object-cover"
                />
                {event.photoCaption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 sm:p-3 text-[11px] text-slate-200">
                    {event.photoCaption}
                  </div>
                )}
              </div>
            )}

            {/* Group details (17 people, 15 adults + 2 kids, 5 rooms) */}
            {event.groupDetails && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F5EE] border border-[#EFE7D5] text-xs text-[#162A45]">
                <Users className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
                <span className="font-semibold">{event.groupDetails}</span>
              </div>
            )}

            {/* Ticket Info */}
            {event.ticketInfo && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9E6] border border-[#FFE8A3] text-xs text-[#8C6D38]">
                <Ticket className="w-4 h-4 text-[#C69234] flex-shrink-0" />
                <div>
                  <span className="font-bold block">Planned Ticket:</span>
                  <span className="text-slate-700">{event.ticketInfo}</span>
                </div>
              </div>
            )}

            {/* Important Notes / Warnings */}
            {event.importantNotes && event.importantNotes.length > 0 && (
              <div className="space-y-1.5">
                {event.importantNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-semibold text-[#8C6D38] bg-[#FDF8EC] px-3 py-1.5 rounded-lg border border-[#F4E4BC]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-[#C69234] flex-shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Planned Dishes for Lunch stops (The Curry / Sea View) */}
            {event.plannedDishes && event.plannedDishes.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F4F9F8] border border-[#D5EAE7]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2A7A78] flex items-center gap-1.5 uppercase tracking-wider">
                    <Utensils className="w-3.5 h-3.5 text-[#2A7A78]" /> Planned Local Menu
                  </span>
                  <span className="text-[10px] font-mono text-[#7C8895]">MENU MAY VARY</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {event.plannedDishes.map((dish, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#D5EAE7] text-xs font-medium text-[#162A45]"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Shopping Categories for Kanyakumari Shopping */}
            {event.shoppingCategories && event.shoppingCategories.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF8F5] border border-[#F8DFD5]">
                <div className="text-xs font-bold text-[#C85A32] flex items-center gap-1.5 uppercase tracking-wider mb-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C85A32]" /> Planned Shopping Categories
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {event.shoppingCategories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#F8DFD5] text-xs font-bold text-[#162A45] uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Google Maps button with accessible mobile touch target */}
            {event.mapUrl && (
              <div className="pt-1.5">
                <a
                  id={`map-btn-${event.id}`}
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#162A45] hover:bg-[#203758] active:bg-[#0A192F] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5B563] group-hover:scale-110 transition-transform" />
                  <span>{event.mapButtonType || 'OPEN IN GOOGLE MAPS'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-300" />
                </a>
              </div>
            )}

            {/* Up Next indicator at bottom of every card */}
            {event.upNextPlace && (
              <div className="pt-2.5 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#7C8895]">
                <span className="font-mono text-[10px] tracking-widest text-[#8C6D38] uppercase font-bold">
                  UP NEXT →
                </span>
                <span className="font-semibold text-[#162A45] text-right truncate max-w-[200px] sm:max-w-none">
                  {event.upNextPlace}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
