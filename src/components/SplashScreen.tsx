import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      const completeTimer = setTimeout(onComplete, 700);
      return () => clearTimeout(completeTimer);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-sand)]"
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,115,87,0.28),rgba(18,17,17,0)_40%)]" />

          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 8C74 30 90 46 112 60C90 74 74 90 60 112C46 90 30 74 8 60C30 46 46 30 60 8Z' fill='none' stroke='%23d6bc96' stroke-opacity='0.45'/%3E%3C/svg%3E\")",
              backgroundSize: '120px 120px',
            }}
          />

          {/* Letterbox bars */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-[var(--color-ink)] z-10"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom' }}
            className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-[var(--color-ink)] z-10"
          />

          <div className="relative text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold)]"
            >
              Editorial Boutique Concept
            </motion.p>

            {/* VASTRA with gold shimmer sweep */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="gold-sweep-text font-serif text-6xl tracking-[0.22em] md:text-8xl"
            >
              VASTRA
            </motion.h1>

            {/* Loading bar */}
            <motion.div
              className="mx-auto mt-8 h-[1px] w-32 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2.2, ease: 'linear', delay: 0.3 }}
                className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
