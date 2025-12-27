import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TreasureChestOpeningProps {
  onComplete: () => void;
  // playSound prop kept for interface compatibility, though unused in logic as requested previously
  playSound?: boolean; 
}

export function TreasureChestOpening({ onComplete }: TreasureChestOpeningProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Treasure Chest Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Chest Group - Scaled for mobile */}
        <div className="relative">
          {/* Chest Bottom */}
          <motion.div
            className="w-48 h-24 md:w-64 md:h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg border-4 border-yellow-600 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Lock */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-10 md:w-8 md:h-12 bg-yellow-600 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full mb-4" />
            </div>
          </motion.div>

          {/* Chest Lid */}
          <motion.div
            className="absolute top-0 left-0 w-48 h-16 md:w-64 md:h-20 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg border-4 border-yellow-600 origin-bottom z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -120 }}
            transition={{ 
              delay: 1, 
              duration: 1,
              type: "spring",
              stiffness: 100 
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Light Beam */}
          <motion.div
            className="absolute -top-32 md:-top-40 left-1/2 transform -translate-x-1/2 w-32 h-48 md:w-48 md:h-64 bg-gradient-to-t from-yellow-400/80 via-yellow-200/40 to-transparent blur-sm z-0"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ clipPath: 'polygon(40% 100%, 60% 100%, 80% 0%, 20% 0%)' }}
          />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                opacity: 0, 
                x: 0, 
                y: 0,
                scale: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: (Math.random() - 0.5) * 200,
                y: -Math.random() * 150,
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                delay: 1.5 + Math.random() * 0.5, 
                duration: 1.5 
              }}
              style={{
                left: '50%',
                top: '40%', // Centered relative to chest
              }}
            >
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-300" />
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <motion.div
          className="absolute -bottom-32 md:-bottom-40 left-1/2 transform -translate-x-1/2 text-center w-80 md:w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-pulse font-bold" style={{ fontFamily: 'serif' }}>
            LAUGH TALE
          </h1>
          <p className="text-yellow-100 text-base md:text-lg italic">
            "He who laughs last, laughs best."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}