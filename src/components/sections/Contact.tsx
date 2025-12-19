import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ContactForm } from '@/components/ContactForm';
import { SocialLinks } from '@/components/SocialLinks';
import { Phone, Radio, Waves } from 'lucide-react';

export function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="contact" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2]">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Signal Animation Icon */}
          <div className="flex justify-center mb-4">
             <div className="relative">
                <Radio className="w-12 h-12 text-[#5a3a2a]" />
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                   <Waves className="w-6 h-6 text-[#d92121]" />
                </motion.div>
             </div>
          </div>

          <h2 className="text-5xl font-serif font-black text-[#5a3a2a] mb-4 uppercase tracking-wide">
            Send a Den Den Mushi
          </h2>
          
          <div className="inline-block bg-[#5a3a2a] text-[#f0e6d2] px-4 py-1 font-mono text-sm rounded-full mb-2">
             STATUS: TRANSMISSION OPEN
          </div>
          
          <p className="text-[#8b6f58] text-lg font-serif italic mt-2">
            "Puru puru puru... Pick up the phone! Let's talk about your next adventure."
          </p>
        </motion.div>

        {/* --- THE FORM CONTAINER (The Device) --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
             {/* Decorative 'Device' Border */}
             <div className="absolute inset-0 border-4 border-[#5a3a2a] rounded-xl bg-[#fff9e5] shadow-[8px_8px_0px_rgba(90,58,42,0.2)] transform rotate-1"></div>
             
             {/* The Actual Form Area */}
             <div className="relative bg-[#f0e6d2]/80 backdrop-blur-sm border border-[#5a3a2a]/30 rounded-xl p-8 md:p-10">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5a3a2a] text-[#d4a017] px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-b-lg shadow-md">
                    Secure Line
                 </div>
                 <ContactForm />
             </div>
          </div>
        </motion.div>

        {/* --- SOCIAL LINKS --- */}
        <motion.div
          className="mt-20 pt-10 border-t-2 border-[#5a3a2a]/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-6">
             <span className="font-serif font-bold text-[#5a3a2a] text-xl">Find me on other islands:</span>
          </div>
          <SocialLinks />
        </motion.div>
        
      </div>
    </section>
  );
}