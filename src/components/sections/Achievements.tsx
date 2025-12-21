import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { InternshipTimeline } from '@/components/InternshipTimeline';
import { CertificateGrid } from '@/components/CertificateGrid';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';
import { getAchievementsData } from '@/api/achievements';
import { useState, useEffect } from 'react';
import { AchievementsData } from '@/types';
import { Anchor, Award, Map, Ship } from 'lucide-react';

export function Achievements() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [achievements, setAchievements] = useState<AchievementsData | null>(null);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await getAchievementsData();
        setAchievements(data);
      } catch (error) {
        console.error('Failed to load achievements:', error);
      }
    };
    loadAchievements();
  }, []);

  if (!achievements) return null;

  return (
    <section id="achievements" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2]">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- MAIN HEADER --- */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex flex-col items-center">
             <div className="flex items-center gap-3 mb-2">
                <Anchor className="w-8 h-8 text-[#d92121]" />
                <h2 className="text-5xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide">
                  Grand Fleet History
                </h2>
                <Anchor className="w-8 h-8 text-[#d92121]" />
             </div>
             <div className="h-1 w-2/3 bg-[#5a3a2a]/20 rounded-full"></div>
             <p className="mt-4 text-[#8b6f58] font-serif text-lg italic">
               "The islands visited and the treasures collected along the voyage."
             </p>
          </div>
        </motion.div>

        {/* --- SECTION 1: INTERNSHIPS (The Map) --- */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Sub-header */}
          <div className="flex items-center justify-center gap-3 mb-12">
             <div className="h-[2px] w-12 bg-[#5a3a2a]"></div>
             <Ship className="w-6 h-6 text-[#5a3a2a]" />
             <h3 className="text-3xl font-serif font-bold text-[#5a3a2a] uppercase tracking-wider">
               Voyage Log (Experience)
             </h3>
             <div className="h-[2px] w-12 bg-[#5a3a2a]"></div>
          </div>
          
          {/* Timeline Component */}
          <div className="bg-[#f0e6d2] p-4 rounded-lg">
             <InternshipTimeline internships={achievements.internships} />
          </div>
        </motion.div>

        {/* --- SECTION 2: CERTIFICATES (The Treasure) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
           {/* Sub-header */}
          <div className="flex items-center justify-center gap-3 mb-12">
             <div className="h-[2px] w-12 bg-[#d4a017]"></div>
             <Award className="w-6 h-6 text-[#d4a017]" />
             <h3 className="text-3xl font-serif font-bold text-[#5a3a2a] uppercase tracking-wider">
               Treasure Chest (Certificates)
             </h3>
             <div className="h-[2px] w-12 bg-[#d4a017]"></div>
          </div>

          {/* Grid Component */}
          <div className="relative">
            <CertificateGrid certificates={achievements.certificates} />
            <div className="opacity-40 hover:opacity-100">
              <RoadPoneglyph id="WEST" codeFragment="RISE" hint="The Final Word" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}