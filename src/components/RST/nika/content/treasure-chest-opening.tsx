import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TreasureChestOpeningProps {
  onComplete: () => void;
  playSound: boolean;
}

export function TreasureChestOpening({ onComplete, playSound }: TreasureChestOpeningProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Treasure Chest Container */}
      <div className="relative">
        {/* Chest Bottom */}
        <motion.div
          className="w-64 h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg border-4 border-yellow-600 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Lock */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-yellow-600 rounded-sm">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full" />
          </div>
        </motion.div>

        {/* Chest Lid */}
        <motion.div
          className="absolute top-0 left-0 w-64 h-20 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg border-4 border-yellow-600 origin-bottom"
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
          className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-yellow-400/80 via-yellow-200/40 to-transparent blur-sm"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ clipPath: 'polygon(40% 100%, 60% 100%, 80% 0%, 20% 0%)' }}
        />

        {/* Sparkles */}
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
              top: '20%',
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        ))}

        {/* Text */}
        <motion.div
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 text-center w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <h1 className="text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-pulse" style={{ fontFamily: 'serif' }}>
            LAUGH TALE
          </h1>
          <p className="text-yellow-100 text-lg">
            "He who laughs last, laughs best."
          </p>
        </motion.div>
      </div>

      {/* Roger's Laugh Sound Effect Indicator */}
      {playSound && (
        <motion.div
          className="absolute bottom-10 text-yellow-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2, duration: 2 }}
        >
          🎵 "Wealth, fame, power..." 🎵
        </motion.div>
      )}
    </motion.div>
  );
}
