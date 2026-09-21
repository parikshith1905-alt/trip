import React from 'react';
import { Compass, Navigation } from 'lucide-react';

interface DayNavigationBarProps {
  currentActiveDay: number;
  onSelectDay: (dayNum: number) => void;
  scrollProgress: number; // 0 to 100
}

export const DayNavigationBar: React.FC<DayNavigationBarProps> = ({
  currentActiveDay,
  onSelectDay,
  scrollProgress,
}) => {
  const days = [
    { num: 1, label: 'DAY 01', date: 'Oct 01', route: 'Bangalore → Madurai' },
    { num: 2, label: 'DAY 02', date: 'Oct 02', route: 'Madurai → Kanyakumari' },
    { num: 3, label: 'DAY 03', date: 'Oct 03', route: 'Kanyakumari Island & Coast' },
    { num: 4, label: 'DAY 04', date: 'Oct 04', route: 'Sunrise & Return to BLR' },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      {/* Top progress bar across the trip */}
      <div className="w-full h-1.5 bg-slate-100 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-500 transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Overall Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-monument text-xs font-bold shadow-xs">
            {currentActiveDay}
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono">
              ROAD STAGE
            </div>
            <div className="text-xs sm:text-sm font-monument font-bold text-slate-900">
              DAY {currentActiveDay} OF 4
            </div>
          </div>
        </div>

        {/* Center / Right: Horizontally Scrollable Day Switcher with touch-friendly targets */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-1 scrollbar-none">
          {days.map((d) => {
            const isActive = currentActiveDay === d.num;
            return (
              <button
                key={d.num}
                id={`nav-btn-day-${d.num}`}
                onClick={() => onSelectDay(d.num)}
                className={`flex-shrink-0 px-3.5 sm:px-4 py-2 min-h-[40px] rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-102 ring-1 ring-amber-400/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span className={isActive ? 'text-amber-400 font-bold' : 'text-slate-700'}>
                  {d.label}
                </span>
                <span className="hidden sm:inline text-[11px] opacity-75 font-mono">
                  ({d.date})
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick jump to route button */}
        <button
          id="nav-btn-overview"
          onClick={() => {
            const el = document.getElementById('route-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-xl hover:bg-slate-100 min-h-[40px]"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-500" />
          <span>Route</span>
        </button>
      </div>
    </div>
  );
};
