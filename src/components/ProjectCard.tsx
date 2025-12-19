import { motion } from 'framer-motion';
import { ExternalLink, Github, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    bounty: string;
    liveLink: string;
    githubLink: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Paper Texture Background - The "Parchment" look */}
      <div className="bg-[#f0e6d2] border-[12px] border-double border-[#8b6f58] rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 h-full flex flex-col relative">
        
        {/* Paper Grain Texture Overlay (Optional subtle noise) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

        {/* --- POSTER HEADER --- */}
        <div className="pt-4 px-4 text-center space-y-1 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-widest text-[#5a3a2a] opacity-90 scale-y-125" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
            WANTED
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-8 bg-[#5a3a2a]/60"></div>
            <p className="text-xs font-serif font-bold tracking-widest text-[#5a3a2a]">DEAD OR ALIVE</p>
            <div className="h-[2px] w-8 bg-[#5a3a2a]/60"></div>
          </div>
        </div>

        {/* --- IMAGE AREA --- */}
        <div className="p-4 pb-2 relative z-10">
          <div className="relative h-48 border-4 border-[#5a3a2a] shadow-inner bg-gray-800 overflow-hidden">
            {/* The Image */}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 sepia-0' : 'sepia-[.3]'}`}
            />
            
            {/* Hover Actions (Overlay) */}
            <motion.div
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                className="bg-[#d4a017] hover:bg-[#b8860b] text-[#2a1a0a] font-bold border-2 border-[#5a3a2a]"
                onClick={() => window.open(project.liveLink, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Island
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-[#f0e6d2] hover:bg-white text-[#5a3a2a] border-2 border-[#5a3a2a] font-bold"
                onClick={() => window.open(project.githubLink, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Log Pose (Code)
              </Button>
            </motion.div>
          </div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <div className="px-5 pb-6 flex-1 flex flex-col items-center text-center relative z-10">
          
          {/* Project Title (The "Pirate Name") */}
          <h3 className="text-3xl font-serif font-black text-[#2a1a0a] uppercase tracking-tighter mb-2 scale-y-110">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#5a3a2a] font-serif text-sm leading-tight mb-4 flex-1 line-clamp-3 italic opacity-90">
            "{project.description}"
          </p>

          {/* Tech Stack (Skills) */}
          <div className="w-full flex flex-wrap justify-center gap-1 mb-4">
             {project.techStack.map((tech) => (
               <span key={tech} className="px-2 py-0.5 text-[10px] font-bold uppercase border border-[#5a3a2a]/30 text-[#5a3a2a] bg-[#e6dcc3]">
                 {tech}
               </span>
             ))}
          </div>

          {/* --- BOUNTY SECTION --- */}
          <div className="w-full border-t-2 border-b-2 border-[#5a3a2a] py-2 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-opacity-50">
             <div className="flex items-end justify-center gap-2 text-[#2a1a0a]">
                <span className="font-serif font-bold text-sm mb-1">BOUNTY</span>
                <span className="font-serif font-black text-2xl tracking-widest flex items-center">
                   <Skull className="w-5 h-5 mr-2 inline-block opacity-80" />
                   {project.bounty}
                   <span className="text-sm ml-1">-</span>
                </span>
             </div>
          </div>
          
          <p className="text-[10px] text-[#5a3a2a]/60 mt-2 font-mono">MARINE HQ • {project.id}</p>

        </div>
      </div>
    </motion.div>
  );
}