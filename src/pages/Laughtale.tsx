import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

import { HeroSection } from '@/components/RST/nika/content/hero-section';
import { TreasureVault } from '@/components/RST/nika/content/treasure-vault';
import { CaptainsLog } from '@/components/RST/nika/content/captains-log';
import { FinalEasterEgg } from '@/components/RST/nika/content/final-easter-egg';

export function Laughtale() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setShowEntrance(true);
      timer = setTimeout(() => setShowEntrance(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenChest = () => {
    setIsOpen(true);
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#d4a017', '#ffffff', '#d92121', '#ff0000'];
    const isMobile = window.innerWidth < 768;

    (function frame() {
      const velocity = isMobile ? 60 : 100;
      const particleCount = isMobile ? 20 : 15;
      const originY = isMobile ? 0.7 : 0.8; 

      confetti({ particleCount, angle: 60, spread: isMobile ? 80 : 50, startVelocity: velocity, origin: { x: 0, y: originY }, colors, zIndex: 9999 });
      confetti({ particleCount, angle: 120, spread: isMobile ? 80 : 50, startVelocity: velocity, origin: { x: 1, y: originY }, colors, zIndex: 9999 });

      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#0a0a0a] font-serif text-[#d4a017] overflow-hidden z-[999]">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>
      
      {/* Background Text: Made smaller/subtler on mobile */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
         <span className="text-[10vw] md:text-[20vw] font-black uppercase whitespace-nowrap">LAUGH TALE</span>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-[1000] flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors group shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" /> 
        <span className="text-xs font-bold">Return</span>
      </button>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* STATE 1: LOCKED CHEST */
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
          >
            <div onClick={handleOpenChest} className="cursor-pointer group flex flex-col items-center w-full max-w-sm mx-auto">
              <div className="text-sm md:text-xl font-mono text-[#d92121] mb-8 tracking-[0.2em] md:tracking-[0.5em] animate-pulse text-center">
                JOYBOY'S LEGACY AWAITS...
              </div>
              <motion.div 
                className="w-40 h-40 md:w-64 md:h-64 bg-gradient-to-b from-[#d4a017] to-[#854d0e] rounded-t-full rounded-b-lg border-4 border-[#fff] shadow-[0_0_50px_rgba(212,160,23,0.4)] flex items-center justify-center relative"
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                 <div className="absolute inset-x-0 top-12 md:top-20 h-3 md:h-5 bg-[#2a1a0a]"></div>
                 <div className="w-10 h-14 md:w-16 md:h-24 bg-[#fff] rounded-b-full border-4 border-[#2a1a0a] mt-8 md:mt-12 flex items-center justify-center">
                    <div className="w-3 h-5 md:w-5 md:h-8 bg-[#2a1a0a] rounded-full"></div>
                 </div>
              </motion.div>
              <p className="mt-8 text-white/60 text-sm md:text-lg tracking-widest uppercase font-bold">Tap to open</p>
            </div>
          </motion.div>
        ) : (
          /* STATE 2: REVEALED CONTENT */
          <motion.div
            key="opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 overflow-y-auto custom-scrollbar bg-[#1a0f0a]/95 backdrop-blur-sm"
          >
            <div className="min-h-screen w-full relative pb-32">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showEntrance ? 0 : 1, y: showEntrance ? 50 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                // UPDATED: More vertical spacing (space-y-32) and padding
                className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-32 md:space-y-40"
              >
                 {/* Hero takes full viewport height on mobile to look clean */}
                 <div className="min-h-[80vh] flex items-center justify-center">
                   <HeroSection />
                 </div>
                 
                 <TreasureVault />
                 <CaptainsLog />
                 <FinalEasterEgg />
              </motion.div>

              <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: showEntrance ? 0 : 1, scale: showEntrance ? 0 : 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setPlaySound(!playSound)}
                  className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#d4a017] to-[#b45309] text-[#2a1a0a] p-3 rounded-full shadow-lg hover:scale-110 transition-all"
              >
                  {playSound ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}