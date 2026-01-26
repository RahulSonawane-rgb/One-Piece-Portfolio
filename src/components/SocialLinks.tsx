import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

// --- Custom Icons (Since Lucide doesn't have Reddit/X) ---
const RedditIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M17 13c0 2-2 3-5 3s-5-1-5-3c-3 0-4-3-4-3" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
    <path d="M16 8l-2-2 1-3" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const socialLinks = [
  // {
  //   name: 'GitHub',
  //   icon: Github,
  //   url: 'https://github.com/RahulSonawane-rgb',
  //   color: 'group-hover:text-gray-900',
  //   borderColor: 'group-hover:border-gray-900',
  // },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/rahulsonawane-rgb',
    color: 'group-hover:text-blue-700',
    borderColor: 'group-hover:border-blue-700',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/rahulsonawane1st_358/',
    color: 'group-hover:text-pink-700',
    borderColor: 'group-hover:border-pink-700',
  },
  {
    name: 'Reddit',
    icon: RedditIcon,
    url: 'https://www.reddit.com/u/Jumpy-Abies-2792/s/a5XEKECTXl',
    color: 'group-hover:text-orange-600',
    borderColor: 'group-hover:border-orange-600',
  },
  {
    name: 'X',
    icon: XIcon,
    url: 'https://x.com/RahulBtw',
    color: 'group-hover:text-slate-900',
    borderColor: 'group-hover:border-slate-900',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:sorahul54@gmail.com',
    color: 'group-hover:text-red-700',
    borderColor: 'group-hover:border-red-700',
  },
];

export function SocialLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-8 md:gap-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 10, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group flex flex-col items-center"
          >
            {/* --- GOLD COIN --- */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#d4a017] via-[#f9e076] to-[#b8860b] shadow-[0px_5px_0px_rgba(90,58,42,1)] active:shadow-none active:translate-y-[5px] border-4 border-[#5a3a2a] flex items-center justify-center relative transition-all duration-300 ${social.borderColor}`}>
              
              {/* Inner Ring (Engraving) */}
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#5a3a2a]/30"></div>
              
              {/* Shine Reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-50 pointer-events-none"></div>

              {/* Icon */}
              <Icon className={`w-8 h-8 md:w-10 md:h-10 text-[#5a3a2a] relative z-10 transition-colors duration-300 ${social.color}`} />
            </div>

            {/* --- RIBBON LABEL --- */}
            <div className="mt-4 relative">
               <div className="bg-[#fff9e5] border border-[#5a3a2a] px-3 py-1 text-xs font-serif font-bold text-[#5a3a2a] uppercase tracking-wider shadow-sm relative z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  {social.name}
               </div>
               {/* Ribbon tails (CSS triangles) */}
               <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#5a3a2a] transform rotate-45 -z-0"></div>
               <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#5a3a2a] transform rotate-45 -z-0"></div>
            </div>
            
          </motion.a>
        );
      })}
    </motion.div>
  );
}
