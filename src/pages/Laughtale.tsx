import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { HeroSection } from '@/components/RST/nika/content/hero-section';
import { TreasureVault } from '@/components/RST/nika/content/treasure-vault';
import { CaptainsLog } from '@/components/RST/nika/content/captains-log';
import { FinalEasterEgg } from '@/components/RST/nika/content/final-easter-egg';

// --- HOOK: TRACK WINDOW SIZE FOR BEAM CALCULATIONS ---
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

// --- COMPONENT: 3D ROAD PONEGLYPH ---
const RoadPoneglyph3D = ({ 
  corner, 
  delay, 
  isShooting 
}: { 
  corner: 'tl' | 'tr' | 'bl' | 'br', 
  delay: number, 
  isShooting: boolean 
}) => {
  
  // Determine CSS Position
  const positionClasses = {
    'tl': 'top-10 left-6 md:top-20 md:left-20',
    'tr': 'top-10 right-6 md:top-20 md:right-20',
    'bl': 'bottom-10 left-6 md:bottom-20 md:left-20',
    'br': 'bottom-10 right-6 md:bottom-20 md:right-20',
  }[corner];

  // Determine Entrance Direction (Fly in from outside)
  const initialOffset = {
    'tl': { x: -200, y: -200 },
    'tr': { x: 200, y: -200 },
    'bl': { x: -200, y: 200 },
    'br': { x: 200, y: 200 },
  }[corner];

  return (
    <motion.div
      initial={{ opacity: 0, x: initialOffset.x, y: initialOffset.y }}
      animate={{ 
          opacity: 1, 
          x: 0,
          y: isShooting ? 0 : 0 // We handle the hover in the child or keep it stable
      }}
      transition={{ 
          duration: 1.2, 
          delay: delay, 
          type: "spring",
          stiffness: 50,
          damping: 15
      }}
      className={`fixed ${positionClasses} z-[1001] perspective-1000`}
    >
        {/* THE 3D CUBE */}
        <motion.div 
            className="relative w-24 h-24 md:w-32 md:h-32 transform-style-3d"
            animate={{ 
                // Shake on Shooting
                rotateX: isShooting ? [10, 15, 5, 10] : 10,
                rotateY: isShooting ? [45, 40, 50, 45] : 45,
                y: isShooting ? [0, -5, 5, 0] : [0, -10, 0], // Hover effect
                scale: isShooting ? 1.1 : 1,
            }}
            transition={{ 
                // Violent shake when shooting, smooth float when idle
                rotateX: { duration: isShooting ? 0.2 : 0, repeat: isShooting ? Infinity : 0 },
                rotateY: { duration: isShooting ? 0.2 : 0, repeat: isShooting ? Infinity : 0 },
                y: { duration: isShooting ? 0.1 : 3, repeat: Infinity, ease: isShooting ? "linear" : "easeInOut" }
            }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* CUBE FACES */}
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                const transform = {
                    front: 'translateZ(4rem)', 
                    back: 'rotateY(180deg) translateZ(4rem)',
                    right: 'rotateY(90deg) translateZ(4rem)',
                    left: 'rotateY(-90deg) translateZ(4rem)',
                    top: 'rotateX(90deg) translateZ(4rem)',
                    bottom: 'rotateX(-90deg) translateZ(4rem)',
                }[face as string];

                // Adjust depth for mobile (smaller cubes)
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const depth = isMobile ? '3rem' : '4rem';
                const finalTransform = transform.replace('4rem', depth);

                return (
                    <div 
                        key={face}
                        className="absolute inset-0 bg-[#7f1d1d] border-2 border-[#ff0000]/40 flex items-center justify-center overflow-hidden backface-visible shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]"
                        style={{ transform: finalTransform }}
                    >
                        {/* Stone Texture */}
                        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] mix-blend-multiply"></div>
                        
                        {/* Glowing Carvings */}
                        <div className={`absolute inset-0 p-1 text-[#ff8888] font-mono leading-none break-all select-none text-center mix-blend-plus-lighter ${isShooting ? 'opacity-100 animate-pulse' : 'opacity-40'}`} style={{ fontSize: '6px' }}>
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                            ¶§©∆∇∏∑≈▄▌#KL≠≤-≥
                            X9▀▄▌#KL28C2D9@PQ
                            5R8%MN1W8C2D▄▌7As
                            4B8C2D9E▄▌#KL1F5G
                            ⚡⚓⚔️☠️⚜️⭕✨
                        </div>
                    </div>
                );
            })}
        </motion.div>

        {/* Haki Shadow */}
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.5 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/50 blur-xl rounded-full"
        />
    </motion.div>
  );
};

// --- COMPONENT: PERFECT SVG BEAMS ---
const BeamOverlay = ({ stage }: { stage: string }) => {
    const { width, height } = useWindowSize();
    const isMobile = width < 768;

    // Calculate approximate center of each stone based on CSS positioning
    // Mobile: top-10 (40px) + half-width (48px) = ~88px
    // Desktop: top-20 (80px) + half-width (64px) = ~144px
    const offset = isMobile ? 88 : 144; 
    
    // Coordinates [x, y]
    const origins = {
        tl: [offset, offset],
        tr: [width - offset, offset],
        bl: [offset, height - offset],
        br: [width - offset, height - offset]
    };

    const center = [width / 2, height / 2];
    const showBeams = stage === 'shooting' || stage === 'convergence';

    return (
        <svg className="fixed inset-0 z-[1000] pointer-events-none w-full h-full">
            <AnimatePresence>
                {showBeams && Object.values(origins).map((start, i) => (
                    <motion.line
                        key={i}
                        x1={start[0]} y1={start[1]}
                        x2={center[0]} y2={center[1]}
                        stroke="#ef4444" // Red-500
                        strokeWidth={isMobile ? 4 : 8}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.4, ease: "circIn" }}
                        style={{ filter: "drop-shadow(0 0 10px red)" }}
                    />
                ))}
                {/* Inner white core for plasma effect */}
                {showBeams && Object.values(origins).map((start, i) => (
                    <motion.line
                        key={`core-${i}`}
                        x1={start[0]} y1={start[1]}
                        x2={center[0]} y2={center[1]}
                        stroke="white"
                        strokeWidth={isMobile ? 1 : 3}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circIn", delay: 0.05 }}
                    />
                ))}
            </AnimatePresence>
        </svg>
    );
}

export function Laughtale() {
  const [stage, setStage] = useState<'locked' | 'summoning' | 'charging' | 'shooting' | 'convergence' | 'portal' | 'revealed'>('locked');
  const navigate = useNavigate();

  // Animation Timeline
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'summoning') timer = setTimeout(() => setStage('charging'), 1500);
    if (stage === 'charging') timer = setTimeout(() => setStage('shooting'), 1500); // Shaking time
    if (stage === 'shooting') timer = setTimeout(() => setStage('convergence'), 400); // Beam travel time
    if (stage === 'convergence') timer = setTimeout(() => setStage('portal'), 2500); // Singularity growth
    if (stage === 'portal') timer = setTimeout(() => setStage('revealed'), 1000); // Flash/Expand
    return () => clearTimeout(timer);
  }, [stage]);

  const handleOpenChest = () => setStage('summoning');

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#0a0a0a] font-serif text-[#d4a017] overflow-hidden z-[999]">
      
      {/* Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
         <span className="text-[10vw] md:text-[20vw] font-black uppercase whitespace-nowrap">LAUGH TALE</span>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-[1000] flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors group shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" /> 
        <span className="text-xs font-bold">Return</span>
      </button>

      <AnimatePresence mode="wait">
        {stage === 'locked' && (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.5 } }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
          >
            <div onClick={handleOpenChest} className="cursor-pointer group flex flex-col items-center w-full max-w-sm mx-auto">
              <div className="text-sm md:text-xl font-mono text-[#d92121] mb-8 tracking-[0.2em] md:tracking-[0.5em] animate-pulse text-center">
                THE FINAL COORDINATES...
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
              <p className="mt-8 text-white/60 text-sm md:text-lg tracking-widest uppercase font-bold">Tap to Assemble the Map</p>
            </div>
          </motion.div>
        )}

        {/* --- ANIMATION SCENE --- */}
        {stage !== 'locked' && stage !== 'revealed' && (
           <>
              {/* 1. Stones - Fly in from corners */}
              <RoadPoneglyph3D corner="tl" delay={0} isShooting={stage !== 'summoning'} />
              <RoadPoneglyph3D corner="tr" delay={0.2} isShooting={stage !== 'summoning'} />
              <RoadPoneglyph3D corner="br" delay={0.4} isShooting={stage !== 'summoning'} />
              <RoadPoneglyph3D corner="bl" delay={0.6} isShooting={stage !== 'summoning'} />

              {/* 2. Beams - SVG Based for perfect center alignment */}
              <BeamOverlay stage={stage} />

              {/* 3. The Singularity (Center) */}
              {stage === 'convergence' && (
                <div className="fixed inset-0 flex items-center justify-center z-[1002]">
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                         {/* Unstable Red Core */}
                         <div className="w-16 h-16 bg-[#ff0000] rounded-full shadow-[0_0_80px_40px_rgba(255,0,0,0.8)] animate-pulse" />
                         
                         {/* Chaotic Rings */}
                         <motion.div 
                           animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                           transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0 border-[6px] border-white/80 rounded-full border-t-transparent border-b-transparent"
                           style={{ width: '150%', height: '150%', left: '-25%', top: '-25%' }}
                         />
                    </motion.div>
                </div>
              )}
              
              {/* 4. The Dawn Portal (Golden Expand) */}
              {stage === 'portal' && (
                  <div className="fixed inset-0 flex items-center justify-center z-[2000]">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 60 }} // Expands to cover full screen
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-full bg-[#d4a017] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border-[5px] border-white"
                      >
                         {/* Inner void that reveals content */}
                         <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.2 }}
                           className="w-full h-full rounded-full bg-[#1a0f0a]"
                         />
                      </motion.div>
                  </div>
              )}
           </>
        )}

        {/* --- REVEALED CONTENT --- */}
        {stage === 'revealed' && (
          <motion.div
            key="content"
            className="absolute inset-0 z-20 overflow-y-auto custom-scrollbar bg-[#1a0f0a]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="min-h-screen w-full relative pb-32">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-32 md:space-y-40"
              >
                 <div className="min-h-[80vh] flex items-center justify-center">
                   <HeroSection />
                 </div>
                 <TreasureVault />
                 <CaptainsLog />
                 <FinalEasterEgg />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}