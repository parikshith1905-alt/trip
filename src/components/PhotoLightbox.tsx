import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MapPin } from 'lucide-react';

interface PhotoLightboxProps {
  isOpen: boolean;
  photoUrl: string | null;
  caption?: string | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  photoUrl,
  caption,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !photoUrl) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors cursor-pointer"
            aria-label="Close photo"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo */}
          <div className="relative max-h-[75vh] w-full flex items-center justify-center bg-black overflow-hidden">
            <img
              src={photoUrl}
              alt={caption || 'Itinerary location photo'}
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>

          {/* Caption bar */}
          {caption && (
            <div className="p-4 sm:p-6 bg-slate-900 border-t border-white/10 flex items-center gap-3 text-white">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-sm sm:text-base font-medium text-slate-200">
                {caption}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
