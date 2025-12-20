import { motion } from "framer-motion"
import { Anchor, Skull } from "lucide-react"

export function Footer() {
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor jump

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Match your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'Deck', id: 'hero' },
    { label: 'Log', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Haki', id: 'onepiece' },
    { label: 'Voyages', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <footer className="w-full bg-[#2a1a0a] border-t-4 border-[#d4a017] relative z-20">
      <div className="container mx-auto px-6 py-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: Copyright & Motto */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-[#d4a017]">
               <Skull className="w-5 h-5" />
               <span className="font-serif font-bold tracking-widest uppercase">The Pirate King's Dev</span>
            </div>
            <p className="text-sm text-[#f0e6d2]/60 font-mono text-center md:text-left">
              © 2024 Captain's Log. Built with React & Devil Fruits.
            </p>
          </div>

          {/* Right Side: Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-bold text-[#f0e6d2]/80 hover:text-[#d4a017] transition-colors duration-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label === 'Deck' && <Anchor className="w-3 h-3" />}
                {link.label}
              </motion.a>
            ))}
          </div>

        </div>
        
        {/* Bottom decorative text */}
        <div className="mt-8 text-center border-t border-[#f0e6d2]/10 pt-4">
            <p className="text-[10px] text-[#f0e6d2]/30 font-mono select-none">
                TO BE CONTINUED...
            </p>
        </div>

      </div>
    </footer>
  )
}