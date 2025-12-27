import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/RST/nika/content/hero-section';
import { TreasureVault } from '@/components/RST/nika/content/treasure-vault';
import { CaptainsLog } from '@/components/RST/nika/content/captains-log';
import { FinalEasterEgg } from '@/components/RST/nika/content/final-easter-egg';
import { TreasureChestOpening } from '@/components/RST/nika/content/treasure-chest-opening';

export function LaughTaleGift() {
  const [showEntrance, setShowEntrance] = useState(true);

  useEffect(() => {
    // Entrance animation duration
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-950 via-purple-900 to-amber-900 relative overflow-x-hidden">
        
        {/* Stars background effect - Mobile Optimized */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Entrance Animation */}
        <AnimatePresence>
          {showEntrance && (
            <TreasureChestOpening 
              onComplete={() => setShowEntrance(false)} 
              // Sound prop removed
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showEntrance ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full"
        >
          {/* Note: Ensure these child components have 'max-w-7xl mx-auto px-4 md:px-6' 
             in their own files to be perfectly centered and responsive.
          */}
          <HeroSection />
          <TreasureVault />
          <CaptainsLog />
          <FinalEasterEgg />
        </motion.div>
      </div>
    </>
  );
}