import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, History, Anchor } from 'lucide-react';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';
import { Button } from '@/components/ui/button';

import { useJoyboyDance } from '@/hooks/useJoyboyDance';

export function LegacyLog() {
  // 2. Initialize the Hook
  const joyboy = useJoyboyDance();

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const openOldPortfolio = () => {
    window.open("https://rahul-portfolio-4zj5.onrender.com", "_blank");
  };

  return (
    <section id="legacy" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2]">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div {...joyboy}>
            <div className="inline-flex items-center gap-3 border-b-4 border-[#5a3a2a] pb-2 px-6">
              <History className="w-8 h-8 text-[#d92121]" />
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide">
                The Previous Voyage
              </h2>
            </div>
            <p className="mt-4 text-[#8b6f58] font-serif italic text-lg">
              "Every captain starts somewhere. A look back at my earlier adventures."
            </p>
          </motion.div>
        </motion.div>

        {/* --- THE PORTAL WINDOW (Iframe Container) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <motion.div {...joyboy}>
            {/* Wooden Frame Decoration */}
            <div className="absolute -inset-4 bg-[#5a3a2a] rounded-lg shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="absolute -inset-2 border-2 border-[#d4a017] rounded-lg z-0"></div>

            {/* The Browser Window Container */}
            <div className="relative bg-[#2a1a0a] rounded-lg overflow-hidden border-4 border-[#d4a017] shadow-inner h-[500px] md:h-[600px]">
              
              {/* Browser Header Bar (Pirate Style) */}
              <div className="bg-[#d4a017] p-2 flex items-center justify-between border-b-4 border-[#5a3a2a]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#d92121] border border-[#5a3a2a]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 border border-[#5a3a2a]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-[#5a3a2a]"></div>
                </div>
                <div className="bg-[#fff9e5] px-4 py-1 rounded text-xs font-mono text-[#5a3a2a] border border-[#5a3a2a] truncate max-w-[200px] md:max-w-sm">
                  rahul-portfolio-4zj5.onrender.com
                </div>
                <Anchor className="w-4 h-4 text-[#5a3a2a]" />
                <div className="absolute top-40 right-40 opacity-50 hover:opacity-100 z-50">
                    <RoadPoneglyph locationId="OLD_PORTFOLIO_SCREEN" />
                  </div>
              </div>

              {/* The Live Iframe */}
              <div className="relative w-full h-full bg-white">
                  <iframe 
                      src="https://rahul-portfolio-4zj5.onrender.com"
                      title="Old Portfolio Preview"
                      className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                      loading="lazy"
                  />
                  {/* Interaction Overlay (Click to Open) */}
                  <div 
                      onClick={openOldPortfolio}
                      className="absolute inset-0 bg-[#5a3a2a]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer z-10"
                  >
                      <motion.div 
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1.1 }}
                          className="bg-[#d92121] text-white p-6 rounded-full border-4 border-[#d4a017] shadow-2xl flex flex-col items-center gap-2"
                      >
                          <ExternalLink className="w-8 h-8" />
                          <span className="font-serif font-bold uppercase tracking-widest text-sm">
                              Open Logbook
                          </span>
                          <div className="absolute top-90 left-19 opacity-50 hover:opacity-100 z-50">
                            <RoadPoneglyph locationId="OLD_PORTFOLIO_BUTTON" />
                          </div>
                      </motion.div>
                  </div>
              </div>

            </div>
          </motion.div>

          <motion.div {...joyboy}>
            {/* Bottom Tag */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#fff9e5] border-2 border-[#5a3a2a] px-6 py-2 shadow-lg rotate-2 group-hover:rotate-0 transition-transform duration-300 z-20">
                <span className="font-serif font-black text-[#5a3a2a] uppercase tracking-widest text-sm">
                    Archive: Volume 1
                </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
