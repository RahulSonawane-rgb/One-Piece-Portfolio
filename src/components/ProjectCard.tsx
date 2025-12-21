import { motion } from 'framer-motion';
import { ExternalLink, Github, Bird } from 'lucide-react';
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[380px] mx-auto h-[600px] group mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* --- THE RUSTY PAPER CONTAINER --- */}
      <div 
        className="w-full h-full flex flex-col relative transition-all duration-500 ease-out hover:-translate-y-3 hover:rotate-1"
        style={{ 
          // 1. The "Rusty Edge" Effect using Box Shadows
          boxShadow: `
            0px 20px 40px -10px rgba(0,0,0,0.6),    /* Deep Drop Shadow */
            inset 0 0 40px 5px rgba(139, 69, 19, 0.4), /* Inner Rust/Burn Mark */
            inset 0 0 0 1px rgba(139, 69, 19, 0.3)     /* Thin Brown Border */
          `,
          backgroundColor: '#fdfbf7',
          // 2. The Jagged "Torn" Bottom Edge
          clipPath: "polygon(0% 0%, 100% 0%, 100% 96%, 95% 98%, 90% 96%, 85% 98%, 80% 96%, 75% 98%, 70% 96%, 65% 98%, 60% 96%, 55% 98%, 50% 96%, 45% 98%, 40% 96%, 35% 98%, 30% 96%, 25% 98%, 20% 96%, 15% 98%, 10% 96%, 5% 98%, 0% 96%)"
        }}
      >
        
        {/* --- TEXTURE LAYERS --- */}
        {/* Gritty Noise Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] mix-blend-multiply z-0"></div>
        {/* Aged Yellow Tint */}
        <div className="absolute inset-0 bg-[#d4a017] opacity-10 mix-blend-multiply pointer-events-none z-0"></div>
        {/* Burnt Corners Overlay (Gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(100,50,20,0.3)_100%)] pointer-events-none z-0"></div>


        {/* --- HEADER (Masthead) --- */}
        <div className="border-b-4 border-[#2a1a0a] p-4 pb-2 text-center relative z-10 shrink-0">
          
          {/* Top Info Bar */}
          <div className="flex justify-between text-[9px] font-sans font-black uppercase tracking-widest border-b border-[#2a1a0a]/50 mb-2 pb-1 text-[#5a3a2a]">
             <span>Vol. {project.id}</span>
             <span>News Coo Express</span>
             <span>{project.bounty} ฿</span>
          </div>

          {/* Logo & Name */}
          <div className="flex items-center justify-center gap-3">
             <Bird className="w-6 h-6 text-[#2a1a0a]" />
             <h2 className="text-3xl font-serif font-black uppercase tracking-tighter text-[#2a1a0a] transform scale-y-110 drop-shadow-sm">
               Big News
             </h2>
             <Bird className="w-6 h-6 text-[#2a1a0a] transform scale-x-[-1]" />
          </div>
        </div>

        {/* --- HEADLINE (Title) --- */}
        <div className="px-5 py-3 text-center border-b-2 border-[#2a1a0a] relative z-10 shrink-0 bg-[#fdfbf7]/50">
           <h1 className="text-3xl font-serif font-black leading-[0.9] uppercase tracking-tight text-[#2a1a0a]">
             {project.title}
           </h1>
        </div>

        {/* --- THE IMAGE (The Scoop) --- */}
        <div className="relative w-full h-44 border-b-2 border-[#2a1a0a] overflow-hidden shrink-0 z-10 bg-[#2a1a0a] group">
          <img 
            src={project.image} 
            alt={project.title} 
            // Effect: Sepia/Old Photo -> Full Color on Hover
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'sepia-0 scale-105' : 'sepia-[0.6] contrast-125 scale-100 grayscale-[0.3]'}`}
          />
          
          {/* Vignette on Image */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none"></div>

          {/* "Exclusive" Badge */}
          <div className="absolute bottom-2 right-2 bg-[#d92121] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest shadow-md transform -rotate-2">
             Top Secret
          </div>
        </div>

        {/* --- ARTICLE BODY (Scrollable Text) --- */}
        <div className="flex-1 p-5 pb-8 overflow-y-auto custom-scrollbar relative z-10 bg-transparent">
          
          {/* The Story */}
          <div className="font-serif text-[#2a1a0a] text-sm leading-relaxed text-justify mb-4 opacity-90">
             {/* Drop Cap */}
             <span className="float-left text-5xl font-black mr-2 mt-[-8px] font-serif text-[#2a1a0a]">
               {project.description.charAt(0)}
             </span>
             {project.description.slice(1)}
          </div>

          {/* Divider Line (Hand-drawn style) */}
          <div className="w-full h-[2px] bg-[#2a1a0a] my-4 opacity-20 rounded-full"></div>

          {/* "Arsenal" (Tech Stack) */}
          <div className="mb-2">
             <h4 className="font-sans text-[9px] font-black uppercase tracking-widest mb-3 text-[#5a3a2a] border-b border-[#5a3a2a]/30 inline-block">
               Ship Arsenal & Tools
             </h4>
             <div className="flex flex-wrap gap-1.5">
               {project.techStack.map((tech) => (
                 <span key={tech} className="text-[10px] font-bold font-mono text-[#2a1a0a] bg-[#e6dcc3] border border-[#5a3a2a]/40 px-2 py-0.5 shadow-sm rounded-sm">
                   {tech}
                 </span>
               ))}
             </div>
          </div>
        </div>

        {/* --- FOOTER (Actions) --- */}
        {/* Extra padding bottom for the torn effect */}
        <div className="px-5 pb-8 pt-3 bg-[#e6dcc3] border-t-2 border-[#2a1a0a] flex items-center justify-between gap-3 relative z-10 shrink-0">
          
          <div className="flex flex-col">
            <span className="text-[8px] font-bold uppercase text-[#5a3a2a] tracking-widest">Issued By</span>
            <span className="font-serif font-black text-xs text-[#2a1a0a]">World Govt.</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-8 bg-[#2a1a0a] hover:bg-[#000] text-[#e6dcc3] font-bold text-xs border border-[#2a1a0a] shadow-[2px_2px_0px_rgba(90,58,42,0.4)] active:translate-y-[1px] active:shadow-none transition-all"
              onClick={() => window.open(project.liveLink, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border border-[#2a1a0a] text-[#2a1a0a] hover:bg-[#fff9e5] font-bold text-xs bg-transparent shadow-[2px_2px_0px_rgba(90,58,42,0.2)] active:translate-y-[1px] active:shadow-none transition-all"
              onClick={() => window.open(project.githubLink, '_blank')}
            >
              <Github className="w-3 h-3 mr-1" />
              Log
            </Button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}