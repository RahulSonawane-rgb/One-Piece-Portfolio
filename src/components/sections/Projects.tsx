import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from '@/components/ProjectCard';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';
import { getProjectsData } from '@/api/projects';
import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { ExternalLink, Github, Anchor, Map, Compass } from 'lucide-react';

export function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger a bit earlier
    triggerOnce: true,
  });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjectsData();
        setProjects(data.projects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    loadProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly slower stagger for dramatic effect
      },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2]">
      
      {/* Baund Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER (The Bounty Board Title) --- */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 mb-2">
             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#5a3a2a]"></div>
             <Compass className="w-8 h-8 text-[#5a3a2a] animate-[spin_20s_linear_infinite]" />
             <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#5a3a2a]"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-black [#5a3a2a] uppercase tracking-widest drop-shadow-md mb-4">
             Captain's Voyages
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-[#8b6f58]">
             <Map className="w-5 h-5" />
             <p className="font-serif italic text-xl tracking-wide">
               "Islands explored and treasures built across the digital sea."
             </p>
             <Anchor className="w-5 h-5" />
          </div>
          <div className="absolute bottom-80 right-10 opacity-30 hover:opacity-100 z-50">
            <RoadPoneglyph locationId="ON_RIGHT_PROJECT_CARD_2" />
          </div>
          <div className="absolute bottom-60 left-10 opacity-30 hover:opacity-100 z-50">
            <RoadPoneglyph locationId="ON_PROJECT_CARD_1" />
          </div>
        </motion.div>

        {/* --- THE GRID (Wall of Posters) --- */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <div key={project.id} className="h-full">
              {/* Wrap in a div to ensure height consistency */}
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}