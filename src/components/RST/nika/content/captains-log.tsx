import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { BehindTheScenes } from './behind-the-scenes';

export function CaptainsLog() {
  return (
    // Reduced vertical padding on mobile (py-12) vs desktop (md:py-20)
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            {/* Responsive Icons: smaller on mobile (w-6) */}
            <BookOpen className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 shrink-0" />
            
            {/* Responsive Text: text-3xl on mobile -> 6xl on desktop */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 leading-tight font-bold" style={{ fontFamily: 'serif' }}>
              The Captain's Log
            </h2>
            
            <BookOpen className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 shrink-0" />
          </div>
          
          <p className="text-sm md:text-xl text-yellow-100/80 px-4">
            Exclusive insights and direct contact with the captain
          </p>
        </motion.div>

        {/* Grid: 1 column on mobile, 2 columns on Large screens (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Behind the Scenes Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <BehindTheScenes />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
