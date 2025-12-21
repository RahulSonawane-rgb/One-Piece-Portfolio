import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

export function Laughtale() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenChest = () => {
    setIsOpen(true);
    // Fire the Pirate King Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4a017', '#ffffff', '#d92121']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4a017', '#ffffff', '#d92121']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden font-serif text-[#d4a017]">
      
      {/* Background: The Void Century (Stars/Dust) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
      
      {/* "He Laughed" Text Background (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden">
         <span className="text-[20vw] font-black uppercase whitespace-nowrap">LAUGH TALE</span>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-[-100px] left-0 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Sea
        </button>

        {!isOpen ? (
          /* --- STATE 1: THE LOCKED CHEST --- */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="cursor-pointer group"
            onClick={handleOpenChest}
          >
            <div className="text-sm font-mono text-[#d92121] mb-8 tracking-[0.3em] animate-pulse">
              JOYBOY'S LEGACY AWAITS...
            </div>

            {/* The Chest Icon (Animated) */}
            <motion.div 
              className="w-48 h-48 mx-auto bg-gradient-to-b from-[#d4a017] to-[#854d0e] rounded-t-full rounded-b-lg border-4 border-[#fff] shadow-[0_0_100px_rgba(212,160,23,0.4)] flex items-center justify-center relative"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
               <div className="absolute inset-x-0 top-16 h-4 bg-[#2a1a0a]"></div> {/* Lid line */}
               <div className="w-12 h-16 bg-[#fff] rounded-b-full border-4 border-[#2a1a0a] mt-8 flex items-center justify-center">
                  <div className="w-4 h-6 bg-[#2a1a0a] rounded-full"></div> {/* Keyhole */}
               </div>
            </motion.div>

            <p className="mt-8 text-white/60 text-sm">Tap to open the One Piece</p>
          </motion.div>
        ) : (
          /* --- STATE 2: THE TREASURE REVEALED --- */
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a0f0a] border-[4px] border-[#d4a017] p-8 rounded-lg shadow-[0_0_100px_rgba(212,160,23,0.6)] relative"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
               <Crown className="w-20 h-20 text-[#d4a017] fill-[#d4a017] drop-shadow-[0_0_20px_rgba(212,160,23,0.8)]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 mt-8 bg-gradient-to-r from-[#d4a017] via-[#fff] to-[#d4a017] bg-clip-text text-transparent">
              KING OF THE PIRATES
            </h1>

            <p className="text-white/80 italic text-lg mb-8 leading-relaxed">
              "You found it. The story of my journey, the skills I've honed, and the future I will build. <br/>
              <span className="text-[#d4a017] font-bold">You are the one I've been waiting for.</span>"
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
               <Button 
                 className="bg-[#d4a017] hover:bg-[#fff] text-[#1a0f0a] font-bold py-6 px-8 text-lg"
                 onClick={() => window.open('/path-to-your-resume.pdf', '_blank')}
               >
                 <Download className="w-6 h-6 mr-2" />
                 Acquire "The One Piece" (Resume)
               </Button>
               
               <Button 
                 variant="outline"
                 className="border-2 border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017] hover:text-[#1a0f0a] font-bold py-6 px-8 text-lg bg-transparent"
                 onClick={() => window.location.href = 'mailto:rahul@example.com'}
               >
                 <Sparkles className="w-6 h-6 mr-2" />
                 Form an Alliance (Hire Me)
               </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-[#d4a017]/20 text-xs font-mono text-white/40">
              COORDINATES: RAFTEL • FINAL LOG ENTRY
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}