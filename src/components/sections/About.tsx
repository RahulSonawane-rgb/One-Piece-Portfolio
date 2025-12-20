import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scroll, Map, Anchor } from 'lucide-react';

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-16 md:py-24 px-4 relative bg-[#f0e6d2] overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 border-b-4 border-[#5a3a2a] pb-2 px-6">
            <Scroll className="w-6 h-6 md:w-8 md:h-8 text-[#d92121]" />
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide">
              The Captain's Log
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* --- LEFT SIDE: THE WANTED POSTER --- */}
          <motion.div variants={itemVariants} className="flex justify-center relative order-1 md:order-1 perspective-1000">
             
             {/* The Poster Container - Rotated slightly for realism */}
             <div className="relative w-64 md:w-80 bg-[#fff9e5] p-5 shadow-[10px_10px_20px_rgba(0,0,0,0.3)] rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out border border-[#d6c098]">
                
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply"></div>
                
                {/* Tape at the top (Visual detail) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#f4e4bc] opacity-80 rotate-[-3deg] shadow-sm z-20"></div>

                {/* HEADER: WANTED */}
                <div className="text-center mb-3 relative z-10">
                   <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2a1a0a] tracking-[0.15em] scale-y-125" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                     WANTED
                   </h2>
                   <div className="flex items-center justify-between px-2 mt-1">
                      <span className="text-[10px] font-bold text-[#2a1a0a] tracking-widest">DEAD OR ALIVE</span>
                      <span className="text-[10px] font-bold text-[#2a1a0a] tracking-widest">SDE-INTERN</span>
                   </div>
                </div>

                {/* IMAGE FRAME */}
                <div className="w-full aspect-[4/3] bg-gray-200 border-[3px] border-[#2a1a0a] overflow-hidden mb-4 relative z-10 group">
                   {/* Your Image */}
                   <img 
                     src="https://avatars.githubusercontent.com/u/188471525" 
                     alt="Rahul Sonawane" 
                     className="w-full h-full object-cover transition-all duration-500 grayscale contrast-125 sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0"
                   />
                </div>

                {/* NAME & BOUNTY */}
                <div className="relative z-10">
                   <h3 className="text-2xl md:text-3xl font-black text-[#2a1a0a] uppercase font-serif tracking-wide text-center leading-none mb-3">
                     RAHUL SONAWANE
                   </h3>
                   
                   <div className="flex items-center gap-2 border-t-[3px] border-[#2a1a0a] pt-1 mx-1">
                      <span className="font-bold text-[#2a1a0a] text-lg">฿</span>
                      <span className="font-black text-[#2a1a0a] text-2xl md:text-3xl tracking-tighter">1,500,000,000</span>
                      <span className="font-bold text-[#2a1a0a] text-xs self-end mb-1">-</span>
                   </div>
                </div>

                {/* MARINE STAMP (Decorative) */}
                <div className="absolute bottom-12 right-2 opacity-60 rotate-[-20deg] border-[3px] border-red-800/60 text-red-800/60 font-black px-2 py-0 text-xs rounded-sm pointer-events-none z-20">
                   MARINE
                </div>

             </div>
          </motion.div>

          {/* --- RIGHT SIDE: THE SCROLL (Bio) --- */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 md:order-2"
          >
            {/* Scroll Background Shape */}
            <div className="bg-[#fff9e5] border-2 border-[#5a3a2a] p-6 md:p-10 shadow-[8px_8px_0px_rgba(90,58,42,0.2)] relative">
                
                {/* Scroll Rolled Edges */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-[#e6dcc3] border-2 border-[#5a3a2a] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-3 left-0 right-0 h-4 bg-[#e6dcc3] border-2 border-[#5a3a2a] rounded-full shadow-sm"></div>

                <div className="space-y-6 md:space-y-8 font-serif text-[#5a3a2a]">
                  
                  {/* Bio Item 1: Identity */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Anchor className="w-5 h-5 text-[#d92121]" />
                        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider border-b border-[#5a3a2a]/30 pb-1 w-full">
                            The Shipwright of Jalgaon
                        </h3>
                    </div>
                    <p className="opacity-90 leading-relaxed italic text-sm md:text-base">
                      "I am <strong>Rahul Sonawane</strong>, a BCA student and Software Development Engineer. I build sturdy vessels using the <strong>MERN stack</strong> and automate the high seas with <strong>Python</strong> and <strong>Google Apps Script</strong>. My mission? To craft applications as precise as a captain's compass."
                    </p>
                  </div>

                  {/* Bio Item 2: Experience - GENERALIZED */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Map className="w-5 h-5 text-[#d92121]" />
                        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider border-b border-[#5a3a2a]/30 pb-1 w-full">
                            The Voyage So Far
                        </h3>
                    </div>
                    <p className="opacity-90 leading-relaxed italic text-sm md:text-base">
                      "My journey began at Dr. Babasaheb Ambedkar Marathwada University. I've navigated through complex <strong>Odoo development</strong> and launched my own fleet including <em>Cafe Buddy</em> and AI-powered bots. I am always seeking new horizons and ready to join a crew that values innovation."
                    </p>
                  </div>
                  
                  {/* Signature / Stamp */}
                  <div className="mt-6 flex justify-end">
                      <div className="border-4 border-[#d92121] text-[#d92121] px-3 py-1 font-black transform -rotate-12 opacity-80 text-xs md:text-sm uppercase tracking-widest rounded-sm">
                          Captain Approved
                      </div>
                  </div>

                </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}