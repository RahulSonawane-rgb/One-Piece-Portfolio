import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';

function DenDenMushi() {
  const controls = useAnimation();
  const [facingRight, setFacingRight] = useState(true);
  const [isIdle, setIsIdle] = useState(false);

  // --- LOGIC (Updated for Responsiveness) ---
  useEffect(() => {
    let isMounted = true;
    let currentX = 0;

    const wander = async () => {
      if (!isMounted) return;

      const shouldWait = Math.random() > 0.6; 
      
      if (shouldWait) {
        setIsIdle(true);
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000)); 
        setIsIdle(false);
      }

      // --- RESPONSIVE FIX START ---
      // Check if we are on a mobile screen (less than 768px)
      const isMobile = window.innerWidth < 768;
      
      // On mobile, reduce the movement range so it doesn't overflow.
      // Desktop: Moves between 5% and 85% (5 + 80)
      // Mobile: Moves between 5% and 65% (5 + 60) to leave room for the snail's body
      const maxMove = isMobile ? 60 : 80;
      
      const nextXPercent = 5 + Math.random() * maxMove; 
      // --- RESPONSIVE FIX END ---

      const nextYPixel = 0 + (Math.random() * 4); 

      const direction = nextXPercent > currentX ? 1 : -1;
      setFacingRight(direction === 1);

      const distance = Math.abs(nextXPercent - currentX);
      const duration = distance * 0.1 + (Math.random() * 1.5);

      await controls.start({
        left: `${nextXPercent}%`,
        bottom: `${nextYPixel}px`, 
        transition: { duration: duration, ease: "easeInOut" }
      });

      currentX = nextXPercent;
      wander();
    };

    wander();
    return () => { isMounted = false; };
  }, [controls]);

  return (
    // Added 'overflow-hidden' to the parent to ensure no scrollbars appear
    <div className="relative w-full h-24 mt-8 overflow-hidden md:overflow-visible">
      {/* Visual Floor Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8b6f58]/30"></div>

      {/* THE SNAIL CONTAINER */}
      <motion.div
        className="absolute z-50 scale-[0.4] md:scale-[0.5] origin-bottom" 
        animate={controls}
        initial={{ left: '10%', bottom: '0px' }} 
      >
        <motion.div
          animate={{ scaleX: facingRight ? -1 : 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-40 h-36"
        >
          
           {/* SLIME TRAIL */}
           <motion.div 
             className="absolute -bottom-2 left-2 w-48 h-8 bg-rose-300/40 rounded-full blur-md z-30"
             animate={{ scaleX: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
             <div className="absolute top-1 left-4 w-32 h-2 bg-white/40 rounded-full blur-[2px]"></div>
           </motion.div>


          {/* BODY */}
          <motion.div 
            className="absolute bottom-1 left-0 w-64 h-14 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 z-30"
            style={{ 
                borderRadius: '40px 80px 10px 10px', 
                transformOrigin: 'bottom' 
            }}
            animate={{ scaleY: [1, 1.05, 1] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="absolute bottom-3 left-0 w-full h-[1px] bg-rose-900/10"></div>
             <div className="absolute bottom-6 left-0 w-full h-[1px] bg-rose-900/10"></div>
          </motion.div>

          {/* SKIRT */}
          <motion.div
             className="absolute bottom-0 left-[-2px] w-[16.5rem] h-4 bg-rose-500 z-30 opacity-90 blur-[0.5px]"
             style={{ 
                 borderRadius: '50%',
                 borderBottom: '2px solid rgba(136, 19, 55, 0.2)' 
             }}
             animate={{ 
                 scaleX: [1, 1.02, 0.98, 1],
                 borderRadius: [
                    '10% 10% 40% 40%', 
                    '15% 15% 45% 35%', 
                    '10% 10% 35% 45%', 
                    '10% 10% 40% 40%'
                 ]
             }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* NECK */}
          <div className="absolute bottom-8 right-[4.5rem] w-16 h-12 bg-gradient-to-r from-rose-300 to-rose-400 z-30 rounded-tl-[40px] shadow-sm">
             <div className="absolute bottom-0 left-2 w-12 h-8 border-l-4 border-rose-500/10 skew-x-12"></div>
          </div>


          {/* SHELL */}
          <div className="absolute bottom-9 left-20 w-32 h-28 z-40 rounded-full 
               bg-gradient-to-br from-green-600 to-green-800
               shadow-[inset_0px_4px_8px_rgba(255,255,255,0.2),_inset_0px_-4px_8px_rgba(0,0,0,0.4),_0px_5px_10px_rgba(0,0,0,0.3)]
               border border-green-900">
              
              <div className="absolute top-7 left-10 opacity-100 hover:opacity-100 z-50">
                <RoadPoneglyph locationId="TRANSPONDER_SHAIL" />
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full 
                   shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),_inset_-2px_-2px_4px_rgba(255,255,255,0.3),_0_0_0_5px_#166534]" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full 
                   shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5),_inset_-1px_-1px_3px_rgba(255,255,255,0.3),_0_0_0_4px_#14532d]" />
              
              <div className="absolute top-3 left-10 w-12 h-6 bg-white rounded-full opacity-40 rotate-[-20deg] blur-[3px]" />

              {/* DIAL */}
              <div className="absolute top-1/2 left-2/4 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-100 rounded-full border-[3px] border-gray-400 shadow-lg flex items-center justify-center">
                   <div className="w-10 h-10 rounded-full border-[4px] border-gray-300 bg-gradient-to-b from-white to-gray-200 relative shadow-inner">
                   </div>
              </div>
          </div>

          {/* HEAD & FACE */}
          <div className="absolute bottom-14 left-4 w-20 h-24">
              <div className="absolute bottom-0 left-1 w-3 h-20 bg-gradient-to-t from-rose-400 to-rose-300 -rotate-[25deg] rounded-full border-l border-rose-600/20 shadow-sm" />
              <div className="absolute bottom-0 right-6 w-3 h-20 bg-gradient-to-t from-rose-400 to-rose-300 rotate-[5deg] rounded-full border-r border-rose-600/20 shadow-sm z-20" />

              <div className="absolute top-[-8px] left-[-30px] w-10 h-10 bg-rose-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center -rotate-12 z-0">
                  <div className="w-8 h-8 bg-white rounded-full border border-gray-300 overflow-hidden flex flex-col justify-center items-center relative">
                       <div className="absolute top-0 w-full h-[55%] bg-rose-300/90 border-b-2 border-rose-500 shadow-sm" />
                       <div className="w-2.5 h-2.5 bg-black rounded-full mt-4" />
                  </div>
              </div>

              <div className="absolute top-[-5px] right-[3px] w-10 h-10 bg-rose-300 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center rotate-12 z-30">
                 <div className="w-8 h-8 bg-white rounded-full border border-gray-300 overflow-hidden flex flex-col justify-center items-center relative">
                       <div className="absolute top-0 w-full h-[55%] bg-rose-300/90 border-b-2 border-rose-500 shadow-sm" />
                       <div className="w-2.5 h-2.5 bg-black rounded-full mt-4" />
                  </div>
              </div>
          </div>

          {/* HANDSET */}
          <motion.div 
              className="absolute top-[-30px] left-20 z-10 origin-center filter drop-shadow-lg"
              animate={isIdle ? { rotate: [-2, 2, -2, 2, 0], y: [-2, 0, -2, 0] } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, repeat: isIdle ? Infinity : 0 }}
          >
              <div className="w-32 h-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-full border border-gray-400 transform -rotate-12 relative">
                 <div className="absolute top-1 left-2 w-24 h-3 bg-white/50 rounded-full blur-[1px]" /> 
              </div>
              <div className="absolute -left-3 -top-3 w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-gray-500 flex items-center justify-center">
                   <div className="w-9 h-9 rounded-full border border-gray-500 bg-[radial-gradient(circle,_#4b5563_1.5px,_transparent_1.5px)] bg-[length:5px_5px] opacity-80"></div>
              </div>
              <div className="absolute -right-2 -top-2 w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border-2 border-gray-500" />
          </motion.div>

          {/* CORD */}
          <svg className="absolute middle-30 right-4 w-24 h-24 z-10 pointer-events-none overflow-visible filter drop-shadow-sm">
               <path d="M 5 10 C 30 10, 10 60, 40 60" fill="none" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>
               <path d="M 5 10 C 30 10, 10 60, 40 60" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
          </svg>

          {/* PURU PURU TEXT */}
          {isIdle && (
            <motion.div 
              className="absolute -top-24 -right-16 pointer-events-none z-50 whitespace-nowrap origin-bottom-left"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1], rotate: 0 }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
               <div className="font-black text-5xl text-[#fafafa] tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] relative" 
                    style={{ WebkitTextStroke: '2px #292524', fontFamily: 'Impact, sans-serif' }}>
                  PURU PURU
                  <span className="absolute -top-1 -left-1 text-purple-100 -z-10 blur-[1px]" style={{ WebkitTextStroke: '0px' }}>PURU PURU</span>
               </div>
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </div>
  );
}

export default DenDenMushi;