import { motion } from 'framer-motion';
// 1. Import the new component
import { ResumeAppUnlock } from './resume-app-unlock';
import { DevilFruitLibrary } from './devil-fruit-library';
import { Award, Smartphone } from 'lucide-react'; // Changed icon

export function TreasureVault() {
  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Award className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 shrink-0" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 font-bold leading-tight" style={{ fontFamily: 'serif' }}>
            The Treasure Vault
          </h2>
          <Award className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 shrink-0" />
        </div>
        <p className="text-base md:text-xl text-yellow-100/80 px-4">
          Legendary rewards worthy of your journey
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* --- REPLACED: APP UNLOCK SECTION --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8 justify-center md:justify-start">
            <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 shrink-0" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-cyan-300 font-bold" style={{ fontFamily: 'serif' }}>
              The Ultimate Tool
            </h3>
          </div>
          
          {/* THE NEW COMPONENT */}
          <ResumeAppUnlock />
          
        </motion.div>
        {/* ----------------------------------- */}

        {/* Devil Fruit Component Library (Kept as is) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <DevilFruitLibrary />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
