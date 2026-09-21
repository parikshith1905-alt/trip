import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Ticket,
  Utensils,
  ShoppingBag,
  AlertCircle,
  Users,
  Sparkles,
  ArrowRight,
  Ship,
  Footprints,
  Bed,
  Camera,
} from 'lucide-react';
import { ItineraryDay, TimelineEvent } from '../types';
import { MinibusVehicle } from './MinibusVehicle';
import { RoadTripSegment } from './RoadTripSegment';
import { IslandExperience } from './IslandExperience';
import { SunriseHighlight } from './SunriseHighlight';
import { HomewardJourney } from './HomewardJourney';
import { DynamicCardImage } from './DynamicCardImage';
import { PhotoLightbox } from './PhotoLightbox';

interface HighwayRoadTimelineProps {
  days: ItineraryDay[];
  currentActiveDay: number;
  onActiveStopChange?: (stopName: string, eventId: string) => void;
}

export const HighwayRoadTimeline: React.FC<HighwayRoadTimelineProps> = ({
  days,
  currentActiveDay,
  onActiveStopChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roadTrackRef = useRef<HTMLDivElement | null>(null);
  const [busY, setBusY] = useState<number>(40);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const lastScrollYRef = useRef<number>(0);
  const [activeEventId, setActiveEventId] = useState<string>(days[0]?.events[0]?.id || '');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    days.forEach((d) => d.events.forEach((e) => (initial[e.id] = true)));
    return initial;
  });

  // Photo Lightbox modal state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    photoUrl: string | null;
    caption?: string | null;
  }>({
    isOpen: false,
    photoUrl: null,
    caption: null,
  });

  const scrollTimeoutRef = useRef<number | null>(null);

  // Flatten all events with their day metadata for easy reference
  const allEvents = useMemo(() => {
    return days.flatMap((day) =>
      day.events.map((event) => ({
        ...event,
        dayNumber: day.day,
        dayFormatted: day.dayNumberFormatted,
        dayDate: day.date,
      }))
    );
  }, [days]);

  const activeEvent = useMemo(() => {
    return allEvents.find((e) => e.id === activeEventId) || allEvents[0];
  }, [allEvents, activeEventId]);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenLightbox = (url: string, caption?: string) => {
    setLightboxState({
      isOpen: true,
      photoUrl: url,
      caption: caption || null,
    });
  };

  // Scroll listener to update minibus position and track the active destination
  useEffect(() => {
    let animationFrameId: number;

    const checkActiveDestination = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;

      // The focal reading line in viewport (38% down the screen)
      const readingLine = viewportHeight * 0.38;

      let closestEventId = allEvents[0]?.id || '';
      let minDistance = Infinity;

      allEvents.forEach((ev) => {
        const anchorEl = document.getElementById(`event-anchor-${ev.id}`);
        if (anchorEl) {
          const anchorRect = anchorEl.getBoundingClientRect();
          // Evaluate the top header / turnout connection point of this event
          const anchorPoint = anchorRect.top + 28;
          const distance = Math.abs(anchorPoint - readingLine);

          if (distance < minDistance) {
            minDistance = distance;
            closestEventId = ev.id;
          }
        }
      });

      if (closestEventId && closestEventId !== activeEventId) {
        setActiveEventId(closestEventId);
        const found = allEvents.find((e) => e.id === closestEventId);
        if (found && onActiveStopChange) {
          onActiveStopChange(found.place, found.id);
        }
      }

      // Smooth minibus track movement along the highway
      const currentRelativeScroll = readingLine - containerTop;
      const totalScrollableDistance = containerHeight - 110;
      const clampedBusY = Math.max(35, Math.min(totalScrollableDistance, currentRelativeScroll));
      setBusY(clampedBusY);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const delta = currentScrollY - lastScrollYRef.current;

      // Sensitive threshold to quickly detect upward vs downward swipe
      if (Math.abs(delta) > 4) {
        setDirection(delta > 0 ? 'down' : 'up');
        lastScrollYRef.current = currentScrollY;
      }

      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      animationFrameId = requestAnimationFrame(checkActiveDestination);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation on mount
    const initialTimer = window.setTimeout(checkActiveDestination, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(initialTimer);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [allEvents, activeEventId, onActiveStopChange]);

  const scrollToEvent = (eventId: string) => {
    const el = document.getElementById(`event-anchor-${eventId}`);
    if (el) {
      const readingLine = window.innerHeight * 0.38;
      const y = el.getBoundingClientRect().top + window.pageYOffset - readingLine + 28;
      const targetY = Math.max(0, y);
      const currentScrollY = window.scrollY || window.pageYOffset;
      if (Math.abs(targetY - currentScrollY) > 5) {
        setDirection(targetY > currentScrollY ? 'down' : 'up');
      }
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setActiveEventId(eventId);
      const found = allEvents.find((e) => e.id === eventId);
      if (found && onActiveStopChange) {
        onActiveStopChange(found.place, found.id);
      }
    }
  };

  return (
    <div
      id="highway-timeline"
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-6 py-8"
    >
      {/* Floating Active Stop Indicator Pill */}
      <div className="sticky top-16 sm:top-20 z-30 flex justify-center pointer-events-none mb-6">
        <motion.div
          key={activeEvent?.id}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 text-white border border-amber-400/40 shadow-xl backdrop-blur-md text-xs"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-[11px] text-amber-300 font-bold uppercase">
            BUS AT:
          </span>
          <span className="font-semibold text-slate-100 max-w-[180px] sm:max-w-[280px] truncate">
            {activeEvent?.place}
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">
            ({activeEvent?.time})
          </span>
        </motion.div>
      </div>

      {/* Main Layout: Left Slim Road Track + Right Event Cards */}
      <div className="relative flex gap-2.5 sm:gap-4 md:gap-5">
        {/* ===================== THE SLIM HIGHWAY ROAD TRACK ===================== */}
        <div
          ref={roadTrackRef}
          aria-hidden="true"
          className="relative flex-shrink-0 w-10 sm:w-12 md:w-14 rounded-2xl bg-gradient-to-b from-[#111A2E] via-[#152238] to-[#0D1525] border-x-2 border-slate-700/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] overflow-visible select-none"
        >
          {/* Subtle asphalt road grain texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          {/* Left and Right Solid White Road Edge Lines */}
          <div className="absolute top-0 bottom-0 left-0.5 sm:left-1 w-[1.5px] bg-slate-400/70" />
          <div className="absolute top-0 bottom-0 right-0.5 sm:right-1 w-[1.5px] bg-slate-400/70" />

          {/* Center Dashed Highway Line (Yellow/Amber divider) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] border-l border-dashed border-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />

          {/* Real-time Moving Tour Mini-Bus Vehicle with smooth spring tracking */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-none"
            animate={{
              y: busY - 44,
            }}
            transition={{
              type: 'spring',
              stiffness: 170,
              damping: 24,
              mass: 0.5,
            }}
          >
            <MinibusVehicle
              isMoving={isScrolling}
              currentStopName={activeEvent?.place}
              direction={direction}
            />
          </motion.div>
        </div>

        {/* ===================== THE TIMELINE EVENTS COLUMN ===================== */}
        <div className="flex-grow space-y-12 sm:space-y-16 pb-16">
          {days.map((day) => (
            <section
              key={`day-section-${day.day}`}
              id={`day-${day.day}`}
              className="scroll-mt-24"
            >
              {/* Grand Day Highway Entrance Banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700/60 mb-8 bg-slate-900 text-white">
                <div className="relative min-h-[250px] sm:min-h-[280px] w-full p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
                  <img
                    src={day.heroImage}
                    alt={day.routeSummary}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/65 to-slate-950/45 pointer-events-none" />

                  {/* Highway Milestone Badge */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-monument font-bold tracking-widest uppercase shadow-lg">
                      {day.dayNumberFormatted}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-semibold font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {day.date}
                    </span>
                  </div>

                  {/* Title & Route info */}
                  <div className="relative z-10 space-y-1.5 pt-4">
                    <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold block">
                      HIGHWAY STAGE · {day.theme}
                    </span>
                    <h2 className="font-monument text-xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md leading-snug">
                      {day.routeSummary}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 font-light max-w-2xl leading-relaxed">
                      {day.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Day's Event Cards along the Highway */}
              <div className="space-y-6 sm:space-y-8">
                {day.events.map((event) => {
                  const isActive = event.id === activeEventId;
                  const isExpanded = expandedCards[event.id] ?? true;

                  const isSpecialRoadTrip = event.specialType === 'road-trip';
                  const isIsland = event.specialType === 'island-experience';
                  const isSunrise = event.specialType === 'sunrise';
                  const isHomeward = event.specialType === 'homeward-journey';

                  return (
                    <div
                      key={event.id}
                      id={`event-anchor-${event.id}`}
                      className="relative flex items-start group"
                    >
                      {/* Connection Feeder from Road to Card */}
                      <div className="absolute -left-2.5 sm:-left-4 md:-left-5 top-7 w-2.5 sm:w-4 md:w-5 h-[2px] bg-slate-300 group-hover:bg-amber-400 transition-colors pointer-events-none" />

                      {/* Turnout Roadside Waypoint Marker */}
                      <button
                        onClick={() => scrollToEvent(event.id)}
                        className={`absolute -left-4 sm:-left-6 md:-left-7 top-5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer z-20 ${
                          isActive
                            ? 'bg-amber-400 border-white shadow-[0_0_12px_rgba(251,191,36,0.9)] scale-125'
                            : 'bg-slate-900 border-slate-500 hover:border-amber-400 text-slate-400'
                        }`}
                        title={`Jump bus to ${event.place}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-slate-950 animate-pulse' : 'bg-slate-400'
                          }`}
                        />
                      </button>

                      {/* Event Container */}
                      <div className="w-full">
                        {isSpecialRoadTrip ? (
                          <RoadTripSegment
                            event={event}
                            isActive={isActive}
                            onOpenLightbox={handleOpenLightbox}
                          />
                        ) : isIsland ? (
                          <IslandExperience
                            event={event}
                            isActive={isActive}
                            onOpenLightbox={handleOpenLightbox}
                          />
                        ) : isSunrise ? (
                          <SunriseHighlight
                            event={event}
                            isActive={isActive}
                            onOpenLightbox={handleOpenLightbox}
                          />
                        ) : isHomeward ? (
                          <HomewardJourney
                            event={event}
                            isActive={isActive}
                            onOpenLightbox={handleOpenLightbox}
                          />
                        ) : (
                          /* Modern Aesthetic Dynamic Event Card */
                          <div
                            id={`event-card-${event.id}`}
                            className={`w-full rounded-2xl sm:rounded-3xl transition-all duration-300 border overflow-hidden ${
                              isActive
                                ? 'bg-white border-amber-400 shadow-[0_16px_40px_rgba(245,158,11,0.22)] ring-2 ring-amber-400/40 scale-[1.012] z-10'
                                : 'bg-white hover:bg-slate-50/90 border-slate-200/90 hover:border-slate-300 shadow-sm scale-[0.988] opacity-85 hover:opacity-100'
                            }`}
                          >
                            {/* Dynamic Active Progress Top Rail */}
                            {isActive && (
                              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                            )}

                            {/* Card Header (clickable to collapse/expand) */}
                            <div
                              onClick={() => toggleCard(event.id)}
                              className="p-4 sm:p-6 cursor-pointer select-none"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                {/* Time Badge & Duration */}
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 bg-amber-50 text-amber-900 border border-amber-200/70 px-2.5 py-1 rounded-lg">
                                    {event.time}
                                  </span>
                                  {event.duration && (
                                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                                      {event.duration}
                                    </span>
                                  )}
                                </div>

                                {/* Active Tag / Card Toggle */}
                                <div className="flex items-center gap-2">
                                  {isActive && (
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-wider text-slate-950 bg-amber-400 px-3 py-1 rounded-full uppercase shadow-sm animate-pulse">
                                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                                      <span>BUS ARRIVED</span>
                                    </span>
                                  )}
                                  <button
                                    id={`toggle-btn-${event.id}`}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                    aria-label="Toggle details"
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Place Title (Destination) */}
                              <h3 className="font-editorial text-lg sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                                {event.place}
                              </h3>

                              {/* Single unified Arrival & Departure Activity */}
                              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                {event.activity}
                              </p>
                            </div>

                            {/* Collapsible Details & Highlights */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4 border-t border-slate-100 pt-4"
                                >
                                  {/* Dynamic Location Photo with Ken Burns, multi-angle and fullscreen zoom */}
                                  {event.photoUrl && (
                                    <DynamicCardImage
                                      photoUrl={event.photoUrl}
                                      secondaryPhotoUrl={event.secondaryPhotoUrl}
                                      caption={event.photoCaption || event.place}
                                      placeName={event.place}
                                      isActive={isActive}
                                      onOpenLightbox={handleOpenLightbox}
                                    />
                                  )}

                                  {/* Group coordination notes */}
                                  {event.groupDetails && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                                      <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                      <span>{event.groupDetails}</span>
                                    </div>
                                  )}

                                  {/* Important badges */}
                                  {event.importantNotes && event.importantNotes.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {event.importantNotes.map((note, i) => (
                                        <div
                                          key={i}
                                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80"
                                        >
                                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                          <span>{note}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Ticket / Special Entrance Info */}
                                  {event.ticketInfo && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 font-medium">
                                      <Ticket className="w-4 h-4 text-cyan-600" />
                                      <span>{event.ticketInfo}</span>
                                    </div>
                                  )}

                                  {/* Planned Meals / Specialties */}
                                  {event.plannedDishes && event.plannedDishes.length > 0 && (
                                    <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-50/50 border border-cyan-100">
                                      <div className="text-xs font-bold text-cyan-900 flex items-center justify-between gap-2 uppercase tracking-wider mb-2">
                                        <span className="flex items-center gap-1.5">
                                          <Utensils className="w-3.5 h-3.5 text-cyan-600" /> Planned Menu Specialties
                                        </span>
                                        <span className="text-[10px] font-mono text-cyan-600">
                                          MENU MAY VARY
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {event.plannedDishes.map((dish, i) => (
                                          <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md bg-white border border-cyan-200 text-xs font-medium text-slate-800 shadow-2xs"
                                          >
                                            {dish}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Shopping categories */}
                                  {event.shoppingCategories && event.shoppingCategories.length > 0 && (
                                    <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                                      <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 uppercase tracking-wider mb-2">
                                        <ShoppingBag className="w-3.5 h-3.5 text-rose-600" /> Planned Shopping Items
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {event.shoppingCategories.map((cat, i) => (
                                          <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md bg-white border border-rose-200 text-xs font-bold text-slate-800 uppercase tracking-wider shadow-2xs"
                                          >
                                            {cat}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Map Action Button */}
                                  {event.mapUrl && (
                                    <div className="pt-1.5">
                                      <a
                                        id={`highway-map-btn-${event.id}`}
                                        href={event.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                                      >
                                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                                        <span>{event.mapButtonType || 'OPEN IN GOOGLE MAPS'}</span>
                                        <ExternalLink className="w-3 h-3 text-slate-400" />
                                      </a>
                                    </div>
                                  )}

                                  {/* Up Next Destination */}
                                  {event.upNextPlace && (
                                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                      <span className="font-mono text-[10px] tracking-widest text-amber-700 uppercase font-bold">
                                        UP NEXT →
                                      </span>
                                      <span className="font-semibold text-slate-900 text-right truncate max-w-[200px] sm:max-w-none">
                                        {event.upNextPlace}
                                      </span>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Fullscreen High-Resolution Photo Lightbox */}
      <PhotoLightbox
        isOpen={lightboxState.isOpen}
        photoUrl={lightboxState.photoUrl}
        caption={lightboxState.caption}
        onClose={() => setLightboxState({ isOpen: false, photoUrl: null, caption: null })}
      />
    </div>
  );
};
