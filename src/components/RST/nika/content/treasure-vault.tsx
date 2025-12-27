import { motion } from 'framer-motion';
import { BountyPosterResume } from './bounty-poster-resume';
import { MarineFileResume } from './marine-file-resume';
import { LogPoseResume } from './log-pose-resume';
import { DevilFruitLibrary } from './devil-fruit-library';
import { Scroll, Award } from 'lucide-react';

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

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
        {/* Bounty Resume Templates */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
            <Scroll className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 shrink-0" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-yellow-300 font-bold" style={{ fontFamily: 'serif' }}>
              The Bounty Resume Collection
            </h3>
          </div>
          <p className="text-amber-50/80 mb-6 md:mb-8 max-w-3xl text-sm md:text-base leading-relaxed">
            Three legendary resume templates, each crafted to help you stand out in the job market. 
            Download, customize, and make them your own.
          </p>
          
          {/* Resume Grid: Stacks 1 column on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="h-[400px] md:h-[500px]">
               <BountyPosterResume />
            </div>
            <div className="h-[400px] md:h-[500px]">
               <MarineFileResume />
            </div>
            <div className="h-[400px] md:h-[500px]">
               <LogPoseResume />
            </div>
          </div>
        </motion.div>

        {/* Devil Fruit Component Library */}
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