import { motion } from 'framer-motion';
import { Crown, Sparkles, Map } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 md:py-0">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Crown Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="flex justify-center mb-4 md:mb-6"
        >
          <div className="relative">
            <Crown className="w-16 h-16 md:w-24 md:h-24 text-yellow-400" strokeWidth={1.5} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4"
            >
              <Sparkles className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 text-yellow-300" />
              <Sparkles className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 text-yellow-300" />
              <Sparkles className="absolute bottom-0 left-1/2 w-4 h-4 md:w-6 md:h-6 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-8xl mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 leading-tight"
          style={{ 
            fontFamily: 'serif',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
          }}
        >
          You Found It!
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-2xl md:text-5xl mb-6 md:mb-8 text-yellow-100"
          style={{ fontFamily: 'serif' }}
        >
          Welcome to <span className="text-yellow-300">Laugh Tale</span>
        </motion.h2>

        {/* Congratulatory Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/60 to-purple-900/40 backdrop-blur-sm border-2 border-yellow-600/50 rounded-lg p-6 md:p-8 shadow-2xl shadow-yellow-500/20">
            <Map className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mx-auto mb-3 md:mb-4" />
            <p className="text-lg md:text-2xl text-amber-50 leading-relaxed mb-3 md:mb-4" style={{ fontFamily: 'serif' }}>
              "You have navigated the <span className="text-yellow-300 font-semibold">Grand Line</span> of my portfolio."
            </p>
            <p className="text-sm md:text-lg text-yellow-100/90 leading-relaxed">
              Your puzzle-solving prowess and determination are worthy of the Pirate King. 
              The treasures you seek are now within reach.
            </p>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-yellow-600/30">
              <p className="text-amber-100/80 italic text-xs md:text-base leading-relaxed">
                "Inherited will, the swelling of the changing times, and the dreams of people. 
                These are things that cannot be stopped. As long as people continue to pursue the meaning of freedom, 
                these things will never cease to be!"
              </p>
              <p className="text-yellow-400 mt-2 text-sm md:text-base">— Gol D. Roger</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-yellow-200/80 text-xs md:text-sm uppercase tracking-widest">Claim Your Treasure</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-400"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Gold Coins - Mobile Optimized Count */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-lg pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
}