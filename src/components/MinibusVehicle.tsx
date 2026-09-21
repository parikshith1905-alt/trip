import React from 'react';
import { motion } from 'motion/react';

interface MinibusVehicleProps {
  isMoving?: boolean;
  currentStopName?: string;
  direction?: 'down' | 'up';
}

export const MinibusVehicle: React.FC<MinibusVehicleProps> = ({
  isMoving = false,
  currentStopName,
  direction = 'down',
}) => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none z-30">
      {/* Floating dynamic destination tag pinned right above the mini-bus */}
      {currentStopName && (
        <motion.div
          key={currentStopName}
          initial={{ opacity: 0, scale: 0.88, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-7 sm:-top-8 left-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap bg-slate-950/95 text-amber-300 border border-amber-400/60 text-[9px] sm:text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-1.5 z-40 pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="max-w-[150px] sm:max-w-[200px] truncate">{currentStopName}</span>
        </motion.div>
      )}

      {/* Rotating Vehicle Assembly (Body + Headlights turn 180deg when moving upward) */}
      <motion.div
        animate={{
          rotate: direction === 'up' ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 22,
          mass: 0.6,
        }}
        className="relative flex flex-col items-center justify-center origin-center"
      >
        {/* Front Headlight beam projection onto the asphalt ahead */}
        <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-20 sm:w-28 h-24 sm:h-32 pointer-events-none overflow-visible">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.45)_0%,rgba(251,191,36,0.12)_50%,transparent_75%)] transform origin-top" />
        </div>

        {/* Mini-bus Coach SVG (Top-down 2.5D perspective) */}
        <motion.div
          animate={
            isMoving
              ? { y: [0, -1.2, 0], scale: [1, 1.008, 1] }
              : { y: 0, scale: 1 }
          }
          transition={{ duration: 0.35, repeat: isMoving ? Infinity : 0, ease: 'easeInOut' }}
          className="relative filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]"
        >
        <svg
          width="40"
          height="92"
          viewBox="0 0 40 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-16 sm:w-8 sm:h-[76px] md:w-9 md:h-[86px]"
        >
          {/* Ground Contact Shadow */}
          <ellipse cx="20" cy="48" rx="17" ry="40" fill="#000000" fillOpacity="0.5" />

          {/* Wheels (Mini-bus 4 wheels with tread) */}
          {/* Front Left */}
          <rect x="1.5" y="18" width="4.5" height="12" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
          {/* Front Right */}
          <rect x="34" y="18" width="4.5" height="12" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
          {/* Rear Left (Dual-width bus tires) */}
          <rect x="1" y="66" width="5.5" height="14" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
          {/* Rear Right (Dual-width bus tires) */}
          <rect x="33.5" y="66" width="5.5" height="14" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />

          {/* Coach Side Mirrors ("Bunny Ear" Coach Wing Mirrors) */}
          <path d="M5 22 L1 20 M1 18 L1 22" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M35 22 L39 20 M39 18 L39 22" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="1" cy="20" r="1.2" fill="#E2E8F0" />
          <circle cx="39" cy="20" r="1.2" fill="#E2E8F0" />

          {/* Mini-bus Elongated Coach Body */}
          <rect
            x="5"
            y="7"
            width="30"
            height="78"
            rx="6.5"
            fill="url(#miniBusBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />

          {/* Front Bumper & Curved Coach Nose */}
          <path
            d="M8 82 C14 86, 26 86, 32 82"
            stroke="#64748B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Front Headlight Clusters (Dual Projector LED) */}
          <rect x="7.5" y="78.5" width="4.5" height="3" rx="1" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.5" />
          <circle cx="9.5" cy="80" r="1" fill="#FFFFFF" />
          <rect x="28" y="78.5" width="4.5" height="3" rx="1" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.5" />
          <circle cx="30.5" cy="80" r="1" fill="#FFFFFF" />

          {/* Front Coach Windshield (Wide Curved Bus Glass) */}
          <path
            d="M8 68 C11 76, 29 76, 32 68 L30.5 58 C28 59, 12 59, 9.5 58 Z"
            fill="url(#busGlassGrad)"
            stroke="#1E293B"
            strokeWidth="0.8"
          />
          {/* Dual Windshield Wipers */}
          <line x1="16" y1="69" x2="19" y2="64" stroke="#475569" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="23" y1="69" x2="26" y2="64" stroke="#475569" strokeWidth="0.7" strokeLinecap="round" />

          {/* Destination Board LED Display above windshield */}
          <rect x="11" y="55" width="18" height="2.5" rx="0.6" fill="#090D16" stroke="#334155" strokeWidth="0.4" />
          <line x1="13" y1="56.2" x2="27" y2="56.2" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="1.2 0.8" />

          {/* Multi-Window Passenger Coach Windows (Left & Right - 4 Windows per side) */}
          {/* Left Windows */}
          <rect x="6.2" y="21" width="1.8" height="6" rx="0.5" fill="#0F172A" />
          <rect x="6.2" y="29" width="1.8" height="6.5" rx="0.5" fill="#0F172A" />
          <rect x="6.2" y="37.5" width="1.8" height="6.5" rx="0.5" fill="#0F172A" />
          <rect x="6.2" y="46" width="1.8" height="6" rx="0.5" fill="#0F172A" />

          {/* Right Windows (With Passenger Entry Door at front right) */}
          <rect x="32" y="21" width="1.8" height="6" rx="0.5" fill="#0F172A" />
          <rect x="32" y="29" width="1.8" height="6.5" rx="0.5" fill="#0F172A" />
          <rect x="32" y="37.5" width="1.8" height="6.5" rx="0.5" fill="#0F172A" />
          {/* Passenger door window */}
          <rect x="32" y="46" width="1.8" height="7" rx="0.5" fill="#0284C7" stroke="#0F172A" strokeWidth="0.4" />

          {/* Tour Coach Livery Stripes along body (Gold & Navy) */}
          <line x1="6.5" y1="54" x2="33.5" y2="54" stroke="#F59E0B" strokeWidth="1" />
          <line x1="6.5" y1="52.8" x2="33.5" y2="52.8" stroke="#0284C7" strokeWidth="0.5" />

          {/* Roof-Mounted Aerodynamic AC Pod (Signature Mini-Bus Feature) */}
          <rect
            x="11"
            y="29"
            width="18"
            height="18"
            rx="2.5"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* AC Ventilation Grille / Fan intake */}
          <circle cx="15.5" cy="35" r="2.5" fill="#0F172A" fillOpacity="0.2" stroke="#64748B" strokeWidth="0.5" />
          <circle cx="24.5" cy="35" r="2.5" fill="#0F172A" fillOpacity="0.2" stroke="#64748B" strokeWidth="0.5" />
          <line x1="13" y1="41" x2="27" y2="41" stroke="#64748B" strokeWidth="0.6" strokeDasharray="1.2 0.8" />
          <line x1="13" y1="43" x2="27" y2="43" stroke="#64748B" strokeWidth="0.6" strokeDasharray="1.2 0.8" />

          {/* Emergency Roof Hatch */}
          <rect x="14" y="21" width="12" height="5" rx="1" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.6" />

          {/* Rear Tour Luggage Carrier Rack (Neat coach rear carrier) */}
          <rect x="10.5" y="10" width="19" height="8.5" rx="1.5" fill="none" stroke="#64748B" strokeWidth="0.8" />
          <line x1="10.5" y1="14" x2="29.5" y2="14" stroke="#64748B" strokeWidth="0.6" />
          <line x1="17" y1="10" x2="17" y2="18.5" stroke="#64748B" strokeWidth="0.6" />
          <line x1="23" y1="10" x2="23" y2="18.5" stroke="#64748B" strokeWidth="0.6" />

          {/* Rear Coach Windows */}
          <path
            d="M9 10 C12 8.5, 28 8.5, 31 10 L30 12.5 C28 11.5, 12 11.5, 10 12.5 Z"
            fill="url(#busGlassGrad)"
            stroke="#1E293B"
            strokeWidth="0.6"
          />

          {/* Rear High-Mount LED Brake Light & Tail Lights */}
          <rect x="16" y="8" width="8" height="1.2" rx="0.5" fill="#EF4444" />
          <rect x="7" y="9.5" width="2.2" height="4" rx="0.8" fill="#DC2626" />
          <rect x="30.8" y="9.5" width="2.2" height="4" rx="0.8" fill="#DC2626" />

          {/* Gradients */}
          <defs>
            <linearGradient id="miniBusBodyGrad" x1="5" y1="7" x2="35" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.4" stopColor="#F8FAFC" />
              <stop offset="0.8" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="busGlassGrad" x1="8" y1="58" x2="32" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369A1" />
              <stop offset="0.5" stopColor="#0B132B" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  </div>
);
};
