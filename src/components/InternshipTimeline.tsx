import { motion } from 'framer-motion';
import { useState } from 'react';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';
import { useJoyboyDance } from '@/hooks/useJoyboyDance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Ship, MapPin, Calendar, Anchor } from 'lucide-react';

interface Internship {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface InternshipTimelineProps {
  internships: Internship[];
}

export function InternshipTimeline({ internships }: InternshipTimelineProps) {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const joyboy = useJoyboyDance();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <motion.div
        className="relative py-10 px-2 md:px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div {...joyboy}>
          {/* --- MAP ROUTE LINE (Dashed) --- */}
          {/* Mobile: Left aligned | Desktop: Center aligned */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full border-l-4 border-dashed border-[#5a3a2a]/30" />

          <div className="space-y-12">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                variants={itemVariants}
                className={`flex w-full relative ${
                  // Mobile: Always standard flex | Desktop: Alternating
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card (Logbook Entry) */}
                <div 
                  className={`w-full md:w-1/2 pl-12 md:pl-0 
                  ${index % 2 === 0 ? 'md:pr-12 md:text-right text-left' : 'md:pl-12 text-left'}`}
                >
                  <motion.div
                    className="bg-[#fff9e5] border-2 border-[#5a3a2a] rounded-sm p-6 cursor-pointer shadow-[4px_4px_0px_rgba(90,58,42,0.2)] hover:shadow-[6px_6px_0px_rgba(217,33,33,0.2)] hover:-translate-y-1 transition-all duration-300 relative group"
                    onClick={() => setSelectedInternship(internship)}
                  >
                    {/* Decorative corner tape */}
                    <div className={`absolute -top-2 w-8 h-8 bg-[#d4a017]/80 shadow-sm z-10 ${index % 2 === 0 ? '-right-2 rotate-12' : '-left-2 -rotate-12'}`}></div>

                    <h4 className="text-xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide group-hover:text-[#d92121] transition-colors">
                      {internship.company}
                    </h4>
                    
                    {/* Position & Anchor Icon Logic */}
                    <p className={`text-[#8b6f58] font-bold font-serif mb-2 flex items-center gap-2 ${
                      index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'
                    }`}>
                      {/* Show Anchor on LEFT for odd items (or mobile default) */}
                      {(index % 2 !== 0 || typeof window !== 'undefined' && window.innerWidth < 768) && <Anchor className="w-4 h-4 hidden md:block" />}
                      {/* Mobile Only Anchor */}
                      <Anchor className="w-4 h-4 md:hidden" />
                      
                      {internship.position}
                      
                      {/* Show Anchor on RIGHT for even items (Desktop only) */}
                      {index % 2 === 0 && <Anchor className="w-4 h-4 hidden md:block" />}
                    </p>
                    
                    <div className={`flex items-center gap-2 text-xs font-mono text-[#5a3a2a]/60 mb-3 ${
                      index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {internship.duration}
                    </div>
                    
                    <p className="text-[#5a3a2a] text-sm line-clamp-2 italic font-serif opacity-90">
                      "{internship.description}"
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Node (Map Pin) */}
                {/* Mobile: Left aligned | Desktop: Center aligned */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex justify-center items-center z-10">
                  <motion.div
                    className="w-10 h-10 bg-[#d92121] rounded-full border-4 border-[#fff9e5] shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapPin className="w-5 h-5 text-white" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Empty space for the other side (Hidden on Mobile) */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div {...joyboy}>
        {/* --- MODAL (Logbook Detail) --- */}
        <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
          {/* Added w-[95vw] for mobile width safety */}
          <DialogContent className="bg-[#2a1a0a] border-4 border-[#d4a017] text-[#f0e6d2] w-[95vw] max-w-2xl p-0 overflow-hidden shadow-2xl rounded-sm">
            
            {/* Header */}
            <div className="bg-[#d4a017] p-4 flex items-center gap-3 border-b-4 border-[#5a3a2a]">
              <Ship className="w-6 h-6 text-[#2a1a0a]" />
              <DialogTitle className="text-[#2a1a0a] font-serif font-black uppercase tracking-widest text-lg md:text-xl">
                Voyage Log Entry
              </DialogTitle>
            </div>

            <div className="p-4 md:p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <DialogHeader className="hidden">
                <DialogDescription>{selectedInternship?.company}</DialogDescription>
              </DialogHeader>

              {/* Title Section */}
              <div className="border-b border-[#d4a017]/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#d4a017] mb-1">{selectedInternship?.company}</h2>
                <p className="text-lg md:text-xl text-[#f0e6d2] font-serif italic">{selectedInternship?.position}</p>
                <div className="flex items-center gap-2 mt-2 text-[#d4a017]/70 font-mono text-sm">
                    <Calendar className="w-4 h-4" />
                    {selectedInternship?.duration}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-[#f0e6d2]/90 leading-relaxed font-serif text-base md:text-lg italic border-l-4 border-[#d92121] pl-4">
                  "{selectedInternship?.description}"
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[#d4a017] font-bold font-serif uppercase tracking-wider mb-3 text-sm">
                  Arsenal (Tech Used)
                </p>
                <div className="absolute bottom-20 right-40 opacity-30 hover:opacity-100 z-50">
                  <RoadPoneglyph locationId="EXPERIENCE_IN_ACHIEVEMENTS" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedInternship?.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#5a3a2a] text-[#d4a017] px-3 py-1 text-xs font-bold border border-[#d4a017]/50 uppercase tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-[#f0e6d2]/10 p-4 rounded border border-[#d4a017]/30">
                <p className="text-[#d4a017] font-bold font-serif uppercase tracking-wider mb-3 text-sm">
                  Battle Records (Achievements)
                </p>
                <ul className="space-y-3">
                  {selectedInternship?.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-[#f0e6d2] flex items-start gap-3 text-sm">
                      <span className="text-[#d92121] mt-1">★</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
}