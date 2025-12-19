import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillFruitProps {
  skill: {
    id: string;
    name: string;
    icon: string;
    proficiency: string;
    experience: string;
  };
  category: 'paramecia' | 'zoan' | 'logia';
  isSelected: boolean;
  onSelect: () => void;
}

const categoryColors = {
  paramecia: {
    // Frontend -> Mystic Purple (Gomu Gomu style)
    bg: 'from-purple-500 to-indigo-600',
    stem: 'bg-indigo-800',
    border: 'border-purple-300',
    glow: 'shadow-purple-500/40',
    text: 'text-purple-700',
  },
  zoan: {
    // Backend -> Wild Red (Hito Hito style)
    bg: 'from-red-500 to-rose-600',
    stem: 'bg-red-800',
    border: 'border-red-300',
    glow: 'shadow-red-500/40',
    text: 'text-red-700',
  },
  logia: {
    // Tools -> Elemental Blue (Mera Mera / Ice style)
    bg: 'from-cyan-500 to-blue-600',
    stem: 'bg-blue-800',
    border: 'border-cyan-300',
    glow: 'shadow-cyan-500/40',
    text: 'text-blue-700',
  },
};

export function SkillFruit({ skill, category, isSelected, onSelect }: SkillFruitProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[category];

  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- THE FRUIT --- */}
      <div className="relative">
        
        {/* The Stem (Top) */}
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 ${colors.stem} rounded-full z-0`}>
           <div className={`absolute top-0 right-0 w-4 h-2 ${colors.stem} rounded-full rotate-45 transform origin-left`}></div>
        </div>

        {/* The Body */}
        <motion.div
          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br ${colors.bg} p-1 flex items-center justify-center shadow-lg ${colors.glow} border-2 ${colors.border} z-10`}
          animate={{
            scale: isSelected || isHovered ? 1.05 : 1,
            boxShadow: isSelected || isHovered ? `0 0 20px rgba(0,0,0,0.2)` : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Swirl Pattern Overlay (CSS Trick for Devil Fruit look) */}
          <div className="absolute inset-0 rounded-[2rem] opacity-20 bg-[radial-gradient(circle_at_center,_transparent_30%,_#000_100%)]"></div>
          <div className="absolute inset-0 rounded-[2rem] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/swirl.png')] bg-cover"></div>

          {/* Icon Container */}
          <motion.div
            className="relative z-20 w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-inner"
            animate={{ rotate: isSelected ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl md:text-3xl filter drop-shadow-sm">{skill.icon}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* --- LABEL (Paper Tag) --- */}
      <motion.div
        className="mt-3 text-center bg-[#fff9e5] border border-[#5a3a2a] px-3 py-1 shadow-md rounded-sm rotate-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }} // Always visible now, looks better
        transition={{ duration: 0.2 }}
      >
        <p className="font-serif font-bold text-[#5a3a2a] text-xs uppercase tracking-wide leading-none mb-1">
           {skill.name}
        </p>
        
        {/* Proficiency Bar (Mini) */}
        <div className="w-full h-1 bg-[#5a3a2a]/10 rounded-full overflow-hidden">
           <div 
             className={`h-full ${colors.stem}`} 
             style={{ width: skill.proficiency === 'Advanced' ? '100%' : skill.proficiency === 'Intermediate' ? '60%' : '30%' }}
           ></div>
        </div>
      </motion.div>
    </motion.div>
  );
}