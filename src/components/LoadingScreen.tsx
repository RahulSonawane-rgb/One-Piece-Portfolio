import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Box, Code, Terminal, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

// --- CONFIGURATION ---
const LOADING_MESSAGES = [
  "Calibrating Log Pose...",
  "Waiting for Zoro to find the way...",
  "Gathering the Crew...",
  "Deciphering Poneglyphs...",
  "Charging Haki...",
  "Cooking Sanji's meal...",
  "Refilling Cola Energy...",
  "Searching for the One Piece...",
  "Dodging Buster Call...",
];

// --- SUB-COMPONENT: GLITCH TEXT ---
const GlitchText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono text-[#d4a017] tracking-widest">{display}</span>;
};

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Message Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Progress Bar Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) return 100;
        const diff = Math.random() * 10;
        return Math.min(old + diff, 100);
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
          {/* Background Matrix Effect (Subtle) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(212, 160, 23, .3) 25%, rgba(212, 160, 23, .3) 26%, transparent 27%, transparent 74%, rgba(212, 160, 23, .3) 75%, rgba(212, 160, 23, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(212, 160, 23, .3) 25%, rgba(212, 160, 23, .3) 26%, transparent 27%, transparent 74%, rgba(212, 160, 23, .3) 75%, rgba(212, 160, 23, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
          />

          {/* --- THE PONEGLYPH CUBE --- */}
          <div className="relative mb-16 perspective-1000">
            <motion.div
              className="w-32 h-32 relative preserve-3d"
              animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Cube Faces */}
              {[
                "translateZ(64px)",
                "rotateY(180deg) translateZ(64px)",
                "rotateY(90deg) translateZ(64px)",
                "rotateY(-90deg) translateZ(64px)",
                "rotateX(90deg) translateZ(64px)",
                "rotateX(-90deg) translateZ(64px)",
              ].map((transform, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-[#d4a017]/30 bg-[#1a1025]/80 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(212,160,23,0.1)]"
                  style={{ transform }}
                >
                  <Code className="w-12 h-12 text-[#d4a017]/50" />
                </div>
              ))}
              
              {/* Inner Core Glow */}
              <div className="absolute inset-0 bg-[#d4a017] rounded-full blur-2xl opacity-20 animate-pulse"></div>
            </motion.div>
          </div>

          {/* --- TEXT CONTENT --- */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            
            {/* Glitch Title */}
            <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#d4a017] animate-spin-slow" />
              <GlitchText text="SYSTEM AWAKENING" />
            </h2>

            {/* Random Funny Message */}
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-6 text-[#8b6f58] font-mono text-sm uppercase tracking-wider"
            >
              {LOADING_MESSAGES[msgIndex]}
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80 h-1 bg-[#2a1a0a] mt-6 rounded-full overflow-hidden border border-[#5a3a2a]/50 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#5a3a2a] via-[#d4a017] to-[#5a3a2a]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              {/* Moving Shine Effect */}
              <motion.div 
                className="absolute top-0 bottom-0 w-20 bg-white/20 blur-md"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="flex justify-between w-64 md:w-80 text-[10px] text-[#5a3a2a] font-bold font-mono mt-1">
               <span>SYNCING...</span>
               <span>{Math.round(progress)}%</span>
            </div>

          </div>

          {/* Footer Decoration */}
          <div className="absolute bottom-8 flex flex-col items-center opacity-30 gap-2">
             <Terminal className="w-5 h-5 text-[#d4a017]" />
             <span className="text-[#d4a017] text-[10px] tracking-[0.5em] font-light">GRAND LINE PROTOCOL</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}