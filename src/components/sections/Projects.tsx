import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from '@/components/ProjectCard';
import { getProjectsData } from '@/api/projects';
import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { Skull, Swords } from 'lucide-react';

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
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER (The Bounty Board Title) --- */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block relative">
             {/* Decorative 'X' behind text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-[#d92121] opacity-20 -rotate-3"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-[#d92121] opacity-20 rotate-3"></div>
             
             <h2 className="text-5xl md:text-6xl font-serif font-black text-[#5a3a2a] uppercase tracking-widest drop-shadow-sm flex items-center justify-center gap-4">
                <Skull className="w-10 h-10 md:w-12 md:h-12" />
                <span>The Bounty List</span>
                <Skull className="w-10 h-10 md:w-12 md:h-12 transform scale-x-[-1]" />
             </h2>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-[#8b6f58]">
             <Swords className="w-5 h-5" />
             <p className="font-serif font-bold italic text-xl">
               "Legendary applications wanted: Dead or Alive"
             </p>
             <Swords className="w-5 h-5 transform scale-x-[-1]" />
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