import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scroll, Map, Anchor } from 'lucide-react';

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
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
    <section id="about" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2] overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 border-b-4 border-[#5a3a2a] pb-2 px-6">
            <Scroll className="w-8 h-8 text-[#d92121]" />
            <h2 className="text-5xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide">
              The Captain's Log
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* --- LEFT SIDE: THE PORTHOLE (Photo) --- */}
          <motion.div variants={itemVariants} className="flex justify-center relative">
             {/* The Porthole Container */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 group">
              
              {/* The Outer Brass Ring (with rivets) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4a017] to-[#8b6f58] shadow-[0px_10px_20px_rgba(0,0,0,0.3)] border-4 border-[#5a3a2a] flex items-center justify-center">
                 {/* Rivets (Dots around the circle) */}
                 {[...Array(8)].map((_, i) => (
                   <div 
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-[#5a3a2a] shadow-inner"
                      style={{ 
                        top: '50%', left: '50%', 
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg) translate(145px)` // Push rivets to edge
                      }} 
                   />
                 ))}
              </div>

              {/* The Inner Window Frame */}
              <div className="absolute inset-4 rounded-full border-[8px] border-[#5a3a2a] overflow-hidden bg-slate-800 z-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="Captain"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sepia-[0.3] group-hover:sepia-0"
                />
                
                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-50 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Hanging Rope Decor (Top) */}
            <div className="absolute -top-24 left-1/2 w-1 h-24 bg-[#5a3a2a] -translate-x-1/2 z-0"></div>
          </motion.div>

          {/* --- RIGHT SIDE: THE SCROLL (Bio) --- */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Scroll Background Shape */}
            <div className="bg-[#fff9e5] border-2 border-[#5a3a2a] p-8 md:p-10 shadow-[8px_8px_0px_rgba(90,58,42,0.2)] relative">
                
                {/* Scroll Rolled Edges (Visual Flair) */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-[#e6dcc3] border-2 border-[#5a3a2a] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-3 left-0 right-0 h-4 bg-[#e6dcc3] border-2 border-[#5a3a2a] rounded-full shadow-sm"></div>

                <div className="space-y-8 font-serif text-[#5a3a2a]">
                  
                  {/* Bio Item 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Anchor className="w-5 h-5 text-[#d92121]" />
                        <h3 className="text-xl font-bold uppercase tracking-wider border-b border-[#5a3a2a]/30 pb-1 w-full">
                            The Shipwright
                        </h3>
                    </div>
                    <p className="opacity-90 leading-relaxed italic">
                      "A passionate full-stack developer with a dream to build legendary applications that sail across the digital seas. I craft experiences that are sturdy as a galleon and beautiful as a sunset."
                    </p>
                  </div>

                  {/* Bio Item 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Map className="w-5 h-5 text-[#d92121]" />
                        <h3 className="text-xl font-bold uppercase tracking-wider border-b border-[#5a3a2a]/30 pb-1 w-full">
                            The Journey
                        </h3>
                    </div>
                    <p className="opacity-90 leading-relaxed italic">
                      "From humble beginnings, I've navigated through the islands of React and Node.js. Every bug is a sea monster to defeat, and every deployed project is a new island discovered."
                    </p>
                  </div>
                  
                  {/* Signature / Stamp */}
                  <div className="mt-6 flex justify-end">
                      <div className="border-4 border-[#d92121] text-[#d92121] px-3 py-1 font-black transform -rotate-12 opacity-80 text-sm uppercase tracking-widest rounded-sm">
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