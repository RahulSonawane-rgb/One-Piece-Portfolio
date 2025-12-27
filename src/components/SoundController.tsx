import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import { useJoyboyDance } from '@/hooks/useJoyboyDance';

export function SoundController() {
  const { isPlaying, toggleSound } = useAudio();
  const [showAnimeIntro, setShowAnimeIntro] = useState(false);
  const joyboy = useJoyboyDance();

  const handlePlay = async () => {
    if (isPlaying) {
      toggleSound();
    } else {
      // START THE ANIME SEQUENCE
      setShowAnimeIntro(true);

      // 1. "I can hear it..." (Wait 800ms)
      await new Promise(resolve => setTimeout(resolve, 800));

      // 2. "The Drums of Liberation..." (Wait 1000ms)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 3. FLASH & START MUSIC
      toggleSound();
      
      // 4. Fade out intro
      setTimeout(() => setShowAnimeIntro(false), 500);
    }
  };

  return (
    <>
      {/* =======================================================
          THE GEAR 5 "MANGA" OVERLAY
          ======================================================= */}
      <AnimatePresence>
        {showAnimeIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "brightness(2)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* 1. PULSING HEARTBEAT BACKGROUND (Red Haki) */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                background: [
                  "radial-gradient(circle, #4a0000 0%, #000 70%)",
                  "radial-gradient(circle, #8b0000 0%, #000 60%)",
                  "radial-gradient(circle, #4a0000 0%, #000 70%)"
                ]
              }}
              transition={{ duration: 0.8, repeat: Infinity }} // 75 BPM Heartbeat
              className="absolute inset-0 pointer-events-none"
            />

            {/* 2. MANGA SPEED LINES (Focus Lines) */}
            <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,_transparent_0deg_10deg,_rgba(255,255,255,0.05)_10deg_20deg)] animate-spin-slow opacity-20" />

            {/* 3. THE TEXT SEQUENCE */}
            <div className="relative z-10 text-center px-4">
               {/* "DOOM!! DOOM!!" Sound Effect */}
               <motion.img 
                  // REPLACE THIS SRC WITH YOUR GEAR 5 IMAGE
                  src="/assets/luffy-gear5.png" 
                  alt="Sun God Nika"
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    filter: ["brightness(0)", "brightness(1)"] // Silhouette -> Reveal
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="max-w-[80%] max-h-[60vh] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]"
               />

               {/* ZUNESHA'S QUOTE */}
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className="text-xl md:text-4xl text-[#d4a017] font-serif font-bold tracking-[0.2em] uppercase border-y-2 border-[#d4a017] py-4 md:py-6"
               >
                 Joyboy Has Returned
               </motion.div>
            </div>

            {/* 4. SMOKE/STEAM RISING (Gear 5 Steam) */}
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 0.5, y: -100 }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================
          YOUR ORIGINAL BUTTON (Unchanged Design)
          ======================================================= */}
      <motion.button
        onClick={handlePlay}
        disabled={showAnimeIntro}
        
        // DANCE PHYSICS applied here
        animate={{
             scaleX: showAnimeIntro ? 1 : joyboy.animate.scaleX,
             scaleY: showAnimeIntro ? 1 : joyboy.animate.scaleY,
             y: showAnimeIntro ? 0 : joyboy.animate.y,
             rotate: showAnimeIntro ? 0 : joyboy.animate.rotate,
        }}
        
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-[0_0_20px_rgba(212,160,23,0.5)] border-2 border-[#d4a017] flex items-center justify-center transition-all duration-300 ${
          isPlaying ? 'bg-[#d92121] text-white' : 'bg-[#2a1a0a] text-[#d4a017]'
        }`}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-6 h-6 animate-pulse" />
            <motion.div
              className="absolute -top-8 -left-2"
              animate={{ y: -20, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Music className="w-4 h-4 text-yellow-300" />
            </motion.div>
          </div>
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </motion.button>
    </>
  );
}