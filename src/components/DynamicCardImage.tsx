import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, Sparkles, Layers, Eye } from 'lucide-react';

interface DynamicCardImageProps {
  photoUrl: string;
  secondaryPhotoUrl?: string;
  caption?: string;
  placeName: string;
  isActive?: boolean;
  onOpenLightbox?: (url: string, caption?: string) => void;
}

export const DynamicCardImage: React.FC<DynamicCardImageProps> = ({
  photoUrl,
  secondaryPhotoUrl,
  caption,
  placeName,
  isActive = false,
  onOpenLightbox,
}) => {
  const [currentAngle, setCurrentAngle] = useState<0 | 1>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through perspectives when card is active and has a secondary image
  useEffect(() => {
    if (!secondaryPhotoUrl || !isActive) {
      setCurrentAngle(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentAngle((prev) => (prev === 0 ? 1 : 0));
    }, 4800);

    return () => clearInterval(interval);
  }, [secondaryPhotoUrl, isActive]);

  const activePhoto = currentAngle === 1 && secondaryPhotoUrl ? secondaryPhotoUrl : photoUrl;

  return (
    <div
      className="relative rounded-2xl overflow-hidden h-48 sm:h-60 md:h-64 w-full shadow-inner group select-none bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Photo Container with Ken Burns motion when active */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhoto}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  scale: [1.02, 1.07, 1.03],
                  transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                }
              : { opacity: 0.92, scale: 1, transition: { duration: 0.4 } }
          }
          exit={{ opacity: 0.4, scale: 1.04 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activePhoto}
            alt={placeName}
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04] transition-all duration-700"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

      {/* Real-time Dynamic Active Glow / Scanning Line */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none border-2 border-amber-400/40 rounded-2xl">
          <motion.div
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-b from-amber-400/10 via-transparent to-transparent pointer-events-none"
          />
        </div>
      )}

      {/* Top Controls Overlay */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
        {/* Multi-Perspective Badge */}
        {secondaryPhotoUrl ? (
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-mono text-amber-300">
            <Layers className="w-3 h-3 text-amber-400" />
            <span>PERSPECTIVE {currentAngle + 1}/2</span>
            <div className="flex items-center gap-1 ml-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAngle(0);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentAngle === 0 ? 'bg-amber-400 scale-125' : 'bg-slate-500 hover:bg-slate-300'
                }`}
                title="Primary Angle"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAngle(1);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentAngle === 1 ? 'bg-amber-400 scale-125' : 'bg-slate-500 hover:bg-slate-300'
                }`}
                title="Secondary Angle"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-200">
            <Camera className="w-3 h-3 text-amber-400" />
            <span>DESTINATION VIEW</span>
          </div>
        )}

        {/* Fullscreen Preview Action */}
        {onOpenLightbox && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(activePhoto, caption || placeName);
            }}
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all shadow-md cursor-pointer"
            title="Expand Full Photo"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Bottom Live Caption & Status */}
      <div className="absolute bottom-3 inset-x-3 pointer-events-none">
        <div className="flex items-end justify-between gap-2">
          <div className="max-w-[85%]">
            {isActive && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-0.5">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" /> LIVE CAMERA FEED
              </span>
            )}
            <p className="text-[11px] sm:text-xs text-white/95 font-medium leading-snug drop-shadow-md">
              {caption || placeName}
            </p>
          </div>

          {/* Quick Expand Hint on Hover */}
          {onOpenLightbox && isHovered && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] text-white font-mono pointer-events-auto cursor-pointer">
              <Eye className="w-3 h-3" />
              <span>ZOOM</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
