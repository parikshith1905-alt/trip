import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navigation, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface RouteMapSectionProps {
  onSelectCity: (targetId: string) => void;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({ onSelectCity }) => {
  const [activeStop, setActiveStop] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstNodeBoxRef = useRef<HTMLDivElement | null>(null);
  const lastNodeBoxRef = useRef<HTMLDivElement | null>(null);

  const [lineGeometry, setLineGeometry] = useState<{
    top: number;
    height: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !firstNodeBoxRef.current || !lastNodeBoxRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const fRect = firstNodeBoxRef.current.getBoundingClientRect();
      const lRect = lastNodeBoxRef.current.getBoundingClientRect();

      // Start 2px underneath the bottom border of the first box
      const top = fRect.bottom - cRect.top - 2;
      // Terminate 2px underneath the top border of the 4th box (guaranteeing contact)
      const bottom = lRect.top - cRect.top + 2;
      const height = Math.max(0, bottom - top);
      const left = fRect.left + fRect.width / 2 - cRect.left;

      setLineGeometry({ top, height, left });
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const stops = [
    {
      id: 'bangalore',
      name: 'Bangalore',
      state: 'Karnataka',
      dayLabel: 'Day 1 & Return',
      timeSlot: 'Oct 01 · 8:00 PM Departure',
      desc: 'Assemble at Guru Krupa Nilaya, Bangalore. Boarding for the overnight highway journey south.',
      targetId: 'day-1',
      tag: 'Origin & Terminus',
    },
    {
      id: 'madurai',
      name: 'Madurai',
      state: 'Tamil Nadu',
      dayLabel: 'Day 2',
      timeSlot: 'Oct 02 · 6:00 AM – 3:30 PM',
      desc: 'Temple capital of Tamil Nadu. Le Grace Residency, Meenakshi Amman Temple, Thirumalai Nayakkar Palace, Raaha Restaurant & Grill.',
      targetId: 'day-2',
      distance: '~435 km · ~9.5 hrs overnight',
      tag: 'Heritage & Darshan',
    },
    {
      id: 'kanyakumari',
      name: 'Kanyakumari',
      state: 'Tamil Nadu',
      dayLabel: 'Day 2–4',
      timeSlot: 'Oct 02–04 · Sunshine Villas',
      desc: 'Land’s End confluence of three seas. Bhagavathy Amman Temple, Island Ferry, Vivekananda Rock, Vattakottai Beach & Triveni Sunrise.',
      targetId: 'day-3',
      distance: '~245 km · ~4.5 hrs',
      tag: 'Cape & Islands',
    },
  ];

  return (
    <section id="route-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Title */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-widest uppercase mb-3 border border-slate-200">
          <Navigation className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Corridor</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-slate-900 font-bold tracking-tight">
          THE ROUTE
        </h2>
        <p className="text-xs sm:text-base text-slate-500 max-w-xl mx-auto mt-2">
          Bangalore → Madurai → Kanyakumari → Bangalore. Tap any destination along the corridor to jump directly to its timeline.
        </p>
      </div>

      {/* Main Interactive Map & Route Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Visual Route Line & Waypoint Track (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B132B] text-white rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" /> Continuous Highway Axis
            </span>
            <span className="text-[11px] font-mono text-slate-400">Total Route: ~1,350 km</span>
          </div>

          {/* Vertical Highway Axis with nodes */}
          <div className="relative py-6 sm:py-8 my-auto z-10">
            <div ref={containerRef} className="space-y-6 sm:space-y-9 relative">
              {/* The vertical animated progress line connecting Node 1 bottom to Node 4 top */}
              {lineGeometry ? (
                <div
                  style={{
                    top: `${lineGeometry.top}px`,
                    height: `${lineGeometry.height}px`,
                    left: `${lineGeometry.left}px`,
                  }}
                  className="absolute -translate-x-1/2 w-[3px] bg-slate-800 rounded-full z-0 overflow-hidden"
                >
                  <motion.div
                    initial={{ height: '0%' }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="w-full bg-gradient-to-b from-amber-400 via-rose-400 to-cyan-400 rounded-full"
                  />
                </div>
              ) : (
                <div className="absolute left-[34px] sm:left-[44px] -translate-x-1/2 top-[50px] sm:top-[60px] bottom-[20px] w-[3px] bg-slate-800 rounded-full z-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-amber-400 via-rose-400 to-cyan-400 rounded-full" />
                </div>
              )}

              {/* Point 1: Bangalore */}
              <div
                onClick={() => {
                  setActiveStop('bangalore');
                  onSelectCity('day-1');
                }}
                className={`flex items-start gap-4 sm:gap-5 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all active:scale-98 ${
                  activeStop === 'bangalore' ? 'bg-white/10 border border-amber-400/40' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 text-center">
                  <div
                    ref={firstNodeBoxRef}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md"
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="flex-grow pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-monument text-sm sm:text-base font-bold text-white tracking-wider">
                      BANGALORE
                    </h3>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold font-mono">
                      OCT 01 · 8:00 PM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Guru Krupa Nilaya · Overnight highway departure south</p>
                </div>
              </div>

              {/* Transit Indicator 1 */}
              <div className="ml-12 sm:ml-18 pl-4 py-1 flex items-center gap-2 text-[11px] font-mono text-slate-300 border-l-2 border-dashed border-amber-400/40">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Overnight highway passage (~435 km · ~9.5–10.5 hrs)</span>
              </div>

              {/* Point 2: Madurai */}
              <div
                onClick={() => {
                  setActiveStop('madurai');
                  onSelectCity('day-2');
                }}
                className={`flex items-start gap-4 sm:gap-5 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all active:scale-98 ${
                  activeStop === 'madurai' ? 'bg-white/10 border border-rose-400/40' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 border-2 border-rose-400 flex items-center justify-center mx-auto shadow-md">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                  </div>
                </div>
                <div className="flex-grow pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-monument text-sm sm:text-base font-bold text-white tracking-wider">
                      MADURAI
                    </h3>
                    <span className="text-[10px] bg-rose-400/20 text-rose-300 px-2 py-0.5 rounded font-semibold font-mono">
                      OCT 02 · 6:00 AM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Meenakshi Amman Temple · Thirumalai Nayakkar Palace · Bistro 1427</p>
                </div>
              </div>

              {/* Transit Indicator 2 */}
              <div className="ml-12 sm:ml-18 pl-4 py-1 flex items-center gap-2 text-[11px] font-mono text-slate-300 border-l-2 border-dashed border-rose-400/40">
                <Navigation className="w-3.5 h-3.5 text-rose-400" />
                <span>Afternoon highway road trip (~245 km · ~4–5 hrs)</span>
              </div>

              {/* Point 3: Kanyakumari */}
              <div
                onClick={() => {
                  setActiveStop('kanyakumari');
                  onSelectCity('day-3');
                }}
                className={`flex items-start gap-4 sm:gap-5 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all active:scale-98 ${
                  activeStop === 'kanyakumari' ? 'bg-white/10 border border-cyan-400/40' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center mx-auto shadow-md">
                    <span className="w-3 h-3 rounded-full bg-cyan-400" />
                  </div>
                </div>
                <div className="flex-grow pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-monument text-sm sm:text-base font-bold text-white tracking-wider">
                      KANYAKUMARI
                    </h3>
                    <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded font-semibold font-mono">
                      OCT 02–04
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Sunshine Villas · Island Ferry · Triveni Sunrise · Coastal Feasts</p>
                </div>
              </div>

              {/* Transit Indicator 3 (Homeward) */}
              <div className="ml-12 sm:ml-18 pl-4 py-1 flex items-center gap-2 text-[11px] font-mono text-slate-300 border-l-2 border-dashed border-cyan-400/40">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Homeward highway journey (~670 km · ~12–13 hrs)</span>
              </div>

              {/* Point 4: Return to Bangalore */}
              <div
                onClick={() => {
                  setActiveStop('bangalore-return');
                  onSelectCity('day-4');
                }}
                className={`flex items-start gap-4 sm:gap-5 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all active:scale-98 ${
                  activeStop === 'bangalore-return' ? 'bg-white/10 border border-amber-400/40' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 text-center">
                  <div
                    ref={lastNodeBoxRef}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                </div>
                <div className="flex-grow pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-monument text-sm sm:text-base font-bold text-white tracking-wider">
                      BANGALORE
                    </h3>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold font-mono">
                      OCT 05 · ~2:00–3:00 AM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Safe family homecoming concluding the journey</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Tap any node to view details</span>
            <span className="text-amber-400 font-semibold">Scroll down for road timeline ↓</span>
          </div>
        </div>

        {/* Right Info Panel for the selected city (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase border border-slate-200">
                {activeStop ? 'Corridor Focus' : 'Route Overview'}
              </span>
              <span className="text-xs text-slate-500 font-medium">17 Travellers · 5 Rooms</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-slate-900 font-bold mb-1 sm:mb-2">
              {stops.find(s => s.id === activeStop)?.name || 'Bangalore → Kanyakumari'}
            </h3>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3 sm:mb-4 font-mono">
              {stops.find(s => s.id === activeStop)?.timeSlot || 'Oct 01 – Oct 05, 2026 · 4 Days'}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {stops.find(s => s.id === activeStop)?.desc ||
                'Round-trip highway corridor spanning Bangalore, Madurai, and Kanyakumari. Tap any stop along the corridor on the left to focus on that segment, or explore the full timeline below.'}
            </p>

            {/* Quick Specs */}
            <div className="space-y-3 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-500" /> Segment Tag:
                </span>
                <span className="font-semibold text-slate-900">
                  {stops.find(s => s.id === activeStop)?.tag || 'NH 44 Highway Passage'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Associated Timeline:
                </span>
                <span className="font-semibold text-slate-900">
                  {stops.find(s => s.id === activeStop)?.dayLabel || 'Full 4-Day Journey'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              id={`route-jump-btn-${activeStop || 'overview'}`}
              onClick={() => {
                const target = stops.find(s => s.id === activeStop)?.targetId || 'day-1';
                onSelectCity(target);
              }}
              className="w-full py-3.5 px-4 min-h-[44px] rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>{activeStop ? "JUMP TO THIS DAY'S TIMELINE" : 'EXPLORE ITINERARY TIMELINE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
