import { motion } from 'framer-motion';
import { ExternalLink, Github, Anchor, Map, Compass } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-[420px] w-full max-w-sm mx-auto group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* --- THE CONTAINER (Compass Box) --- */}
      <div className="relative w-full h-full bg-[#1a2332] rounded-xl overflow-hidden shadow-2xl border-4 border-[#c9a050] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,160,80,0.3)]">
        
        {/* Background Map Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

        {/* --- IMAGE SECTION (Top Half) --- */}
        <div className="relative h-[55%] overflow-hidden border-b-4 border-[#c9a050]">
           {/* The Image */}
           <img 
             src={project.image} 
             alt={project.title} 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
           />
           
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] to-transparent opacity-80"></div>
           
           {/* Compass Overlay Decoration */}
           <div className="absolute top-4 right-4 text-[#c9a050] opacity-80 drop-shadow-lg">
              <Compass className="w-8 h-8 animate-[spin_10s_linear_infinite]" />
           </div>

           {/* Island Name (Title) - Always Visible */}
           <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center gap-2 mb-1">
                 <Map className="w-4 h-4 text-[#c9a050]" />
                 <span className="text-[#c9a050] font-mono text-xs tracking-widest uppercase">New World Island</span>
              </div>
              <h3 className="text-3xl font-serif font-black text-white uppercase tracking-wide drop-shadow-md">
                {project.title}
              </h3>
           </div>
        </div>

        {/* --- DETAILS SECTION (Bottom Half - Slides Up) --- */}
        <div className="relative h-[45%] bg-[#0f1724] p-6 flex flex-col justify-between group-hover:bg-[#162032] transition-colors duration-300">
           
           {/* Description */}
           <div>
              <p className="text-[#94a3b8] font-serif text-sm leading-relaxed line-clamp-3 group-hover:text-[#cbd5e1] transition-colors">
                "{project.description}"
              </p>
           </div>

           {/* Tech Stack Pills */}
           <div className="flex flex-wrap gap-2 mt-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-1 bg-[#1e293b] border border-[#c9a050]/30 text-[#c9a050] text-[10px] font-bold uppercase rounded tracking-wider">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-[#64748b] text-[10px] font-bold">+ {project.techStack.length - 4}</span>
              )}
           </div>

           {/* "Log Pose" Indicator */}
           <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <Anchor className="w-12 h-12 text-[#c9a050] transform rotate-[-15deg]" />
           </div>
        </div>

        {/* --- HIDDEN ACTION LAYER (Reveals on Hover) --- */}
        <motion.div 
          className="absolute inset-0 bg-[#c9a050]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20"
          initial={{ y: '100%' }}
          animate={{ y: isHovered ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
           <h4 className="text-[#2a1a0a] font-serif font-black text-2xl uppercase tracking-widest mb-2">
             Set Course?
           </h4>

           <Button
             className="w-48 bg-[#2a1a0a] hover:bg-[#452a18] text-[#c9a050] border-2 border-[#2a1a0a] font-bold shadow-xl"
             onClick={() => window.open(project.liveLink, '_blank')}
           >
             <ExternalLink className="w-4 h-4 mr-2" />
             Sail to Website
           </Button>

           <Button
             variant="outline"
             className="w-48 border-2 border-[#2a1a0a] text-[#2a1a0a] hover:bg-[#2a1a0a] hover:text-[#c9a050] font-bold bg-transparent"
             onClick={() => window.open(project.githubLink, '_blank')}
           >
             <Github className="w-4 h-4 mr-2" />
             Inspect Logbook
           </Button>

           <div className="mt-6 text-[#2a1a0a] font-mono text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
              Bounty Value: {project.id},00,000 Gold Coins
           </div>
        </motion.div>

      </div>
    </motion.div>
  );
}