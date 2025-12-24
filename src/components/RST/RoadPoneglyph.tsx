import { motion } from 'framer-motion';
import { usePoneglyph } from '@/context/PoneglyphContext';

interface RoadPoneglyphProps {
  locationId: string; // E.g., 'HERO_TITLE', 'FOOTER_DEEP'
}

export function RoadPoneglyph({ locationId }: RoadPoneglyphProps) {
  const { activeConfig, foundStones, collectStone } = usePoneglyph();

  // 1. Check if ANY of the 4 active stones are assigned to THIS location
  const assignedStone = Object.values(activeConfig).find(
    (config) => config?.locationId === locationId
  );

  // If no stone is assigned to this location in this current game, render nothing
  if (!assignedStone) return null;

  const isFound = foundStones.includes(assignedStone.stoneId);

  return (
    <motion.div
      className={`w-8 h-8 md:w-10 md:h-10 rounded-sm cursor-pointer overflow-hidden border-2 relative transition-all duration-500
        ${isFound ? 'bg-[#991b1b] border-[#fca5a5] shadow-[0_0_15px_#ef4444] opacity-100' : 'bg-[#2a1a0a] border-[#451a03] opacity-30 hover:opacity-100 hover:bg-[#7f1d1d]'}`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering parent clicks
        collectStone(locationId);
      }}
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 flex flex-wrap content-center justify-center p-[2px] opacity-40">
         <span className="text-[6px] leading-[6px] text-[#fecaca]">▀ ▄ █ ▌ ▐ ░ ▒ ▓</span>
      </div>
    </motion.div>
  );
}