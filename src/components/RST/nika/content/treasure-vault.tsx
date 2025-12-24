import { motion } from 'framer-motion';
import { BountyPosterResume } from './bounty-poster-resume';
import { MarineFileResume } from './marine-file-resume';
import { LogPoseResume } from './log-pose-resume';
import { DevilFruitLibrary } from './devil-fruit-library';
import { Scroll, Award } from 'lucide-react';

export function TreasureVault() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className="w-10 h-10 text-yellow-400" />
          <h2 className="text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200" style={{ fontFamily: 'serif' }}>
            The Treasure Vault
          </h2>
          <Award className="w-10 h-10 text-yellow-400" />
        </div>
        <p className="text-xl text-yellow-100/80">
          Legendary rewards worthy of your journey
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Bounty Resume Templates */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Scroll className="w-8 h-8 text-yellow-400" />
            <h3 className="text-3xl md:text-4xl text-yellow-300" style={{ fontFamily: 'serif' }}>
              The Bounty Resume Collection
            </h3>
          </div>
          <p className="text-amber-50/80 mb-8 max-w-3xl">
            Three legendary resume templates, each crafted to help you stand out in the job market. 
            Download, customize, and make them your own.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <BountyPosterResume />
            <MarineFileResume />
            <LogPoseResume />
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
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
    </section>
  );
}
