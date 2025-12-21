import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Anchor, Map as MapIcon, Skull } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const resumeUrl = "https://raw.githubusercontent.com/sorahul196-code/rahul-portfolio/refs/heads/main/Resume.pdf";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#f0e6d2]">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      
      {/* 1. Paper Texture Overlay (Gives it that Wanted Poster feel) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply"></div>
      
      {/* 2. Giant Rotating Compass (Background Decor) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
             {/* Simple CSS Compass shape */}
             <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] border-[2px] border-[#5a3a2a] rounded-full flex items-center justify-center relative">
                <div className="absolute inset-4 border border-dashed border-[#5a3a2a] rounded-full"></div>
                <div className="w-[90%] h-[1px] bg-[#5a3a2a]"></div>
                <div className="h-[90%] w-[1px] bg-[#5a3a2a]"></div>
                {/* N/S/E/W Text */}
                <span className="absolute top-4 font-serif font-bold text-[#5a3a2a] text-4xl">N</span>
                <span className="absolute bottom-4 font-serif font-bold text-[#5a3a2a] text-4xl">S</span>
                <span className="absolute left-6 font-serif font-bold text-[#5a3a2a] text-4xl">W</span>
                <span className="absolute right-6 font-serif font-bold text-[#5a3a2a] text-4xl">E</span>
             </div>
        </motion.div>
      </div>
      {/* --- MAIN CONTENT --- */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          {/* Top Tag: Modeled after a Log Pose / System Message */}
          <div className="inline-flex items-center gap-2 border-b-2 border-[#5a3a2a] pb-1 mb-6 opacity-80">
             <Skull className="w-4 h-4 text-[#5a3a2a]" />
             <span className="font-mono text-[#5a3a2a] font-bold tracking-[0.2em] text-sm uppercase">
               Wanted: Full Stack Dev
             </span>
             <Skull className="w-4 h-4 text-[#5a3a2a]" />
          </div>

          {/* Main Headline: Anime Title Card Style */}
          <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight text-[#5a3a2a]" 
              style={{ textShadow: '4px 4px 0px rgba(90, 58, 42, 0.2)' }}>
            I'M GONNA BE <br />
            <span className="text-[#d92121] inline-block transform hover:scale-105 transition-transform duration-300 relative">
               KING OF THE PIRATES!
               {/* Underline decorative stroke (The Smile) */}
               <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#5a3a2a]" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
               </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-[#8b6f58] font-serif font-bold italic mt-4">
            (And a Legendary Software Engineer.)
          </p>
        </motion.div>

        {/* The Quote Box */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#5a3a2a]/90 mb-10 leading-relaxed font-serif max-w-2xl mx-auto border-l-4 border-[#d92121] pl-6 italic bg-[#ffffff]/40 p-6 rounded-r-lg shadow-sm backdrop-blur-sm"
        >
          "Setting sail on the Grand Line of coding. I build applications that can weather any storm and find the One Piece of user experience."
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          {/* Primary Button (Luffy Red Vest) */}
          <Button
            onClick={() => scrollToSection('about')}
            className="bg-[#d92121] hover:bg-[#b01a1a] text-white px-8 py-7 text-lg font-bold rounded shadow-[4px_4px_0px_0px_rgba(90,58,42,1)] hover:translate-y-1 hover:shadow-none transition-all duration-200 border-2 border-[#5a3a2a]"
          >
            <Anchor className="w-5 h-5 mr-2 animate-pulse" />
            Set Sail (Explore)
          </Button>
          
          {/* Secondary Button (Treasure Map / Resume) */}
          <a 
            href={resumeUrl}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="bg-[#fff9e5] hover:bg-[#e6dcc3] text-[#5a3a2a] border-2 border-[#5a3a2a] px-8 py-7 text-lg font-bold rounded shadow-[4px_4px_0px_0px_rgba(90,58,42,0.4)] hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              <MapIcon className="w-5 h-5 mr-2" />
              View Bounty (Resume)
            </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center gap-2">
            <span className="text-[#5a3a2a] font-bold font-mono text-xs uppercase tracking-widest opacity-70">Scroll Down</span>
            <ChevronDown className="w-8 h-8 text-[#d92121] stroke-[3px]" />
        </div>
      </motion.div>
    </section>
  );
}
