import { Menu, X, Skull } from "lucide-react"
import { ThemeToggle } from "./ui/theme-toggle"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const navLinks = [
    { label: 'Deck', id: 'hero' },
    { label: 'Log', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Bounties', id: 'projects' },
    { label: 'Medals', id: 'achievements' },
    { label: 'Haki', id: 'onepiece' }, // Added the 3D section
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b-4 border-[#d4a017] bg-[#2a1a0a]/95 backdrop-blur-md shadow-lg">
      <div className="flex h-20 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Logo area */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          onClick={scrollToTop}
        >
          <div className="relative">
             <div className="absolute inset-0 bg-[#d4a017] blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
             <Skull className="w-8 h-8 text-[#d4a017]" />
          </div>
          <span className="text-xl md:text-2xl font-serif font-black tracking-wider text-[#f0e6d2] uppercase group-hover:text-[#d4a017] transition-colors">
             Captain's Log
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[#f0e6d2]/80 hover:text-[#d4a017] transition-all duration-300 font-bold uppercase tracking-widest text-sm relative group"
            >
              {link.label}
              {/* Hover Underline Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4a017] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#d4a017] p-2 border border-[#d4a017]/30 rounded hover:bg-[#d4a017]/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden bg-[#2a1a0a] border-t border-[#d4a017] absolute w-full left-0 top-20 shadow-2xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-6 py-4 text-[#f0e6d2] font-serif font-bold hover:text-[#2a1a0a] hover:bg-[#d4a017] hover:pl-8 transition-all duration-300 border-b border-[#d4a017]/20 last:border-0 uppercase tracking-widest"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}