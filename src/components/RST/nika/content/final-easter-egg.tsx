import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Laugh, Crown, Sparkles, Lock, ArrowRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

export function FinalEasterEgg() {
  const [laughCount, setLaughCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  // Password State
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const handleLaugh = (e: React.MouseEvent) => {
    const newCount = laughCount + 1;
    setLaughCount(newCount);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newParticle = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);

    if (newCount === 10) {
      setShowSecret(true);
      toast({
        title: "SECRET REVEALED!",
        description: "You laughed like a true Pirate King!",
        className: "bg-yellow-500 text-black font-bold",
      });
    }
  };

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Hint was "Pirate King's catchphrase (one word)". 
    // Let's accept 'meat', 'freedom', 'kaizoku', or 'king'.
    const valid = ['freedom', 'meat', 'kaizoku', 'king'];
    
    if (valid.includes(password.toLowerCase().trim())) {
      setIsUnlocked(true);
      toast({
        title: "ACCESS GRANTED",
        description: "Welcome to the inner circle.",
        className: "bg-green-600 text-white",
      });
    } else {
      toast({
        title: "ACCESS DENIED",
        description: "That is not what the King seeks.",
        variant: "destructive",
      });
      setPassword('');
    }
  };

  return (
    <footer className="relative py-20 px-4 mt-20 border-t-2 border-yellow-600/30">
      <div className="max-w-7xl mx-auto">
        {/* The D. Initial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block relative cursor-default"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 
              className="text-9xl md:text-[12rem] text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600 opacity-20 select-none"
              style={{ 
                fontFamily: 'serif',
                WebkitTextStroke: '2px rgba(255, 215, 0, 0.3)'
              }}
            >
              D.
            </h2>
          </motion.div>
          
          <p className="text-amber-100/60 text-sm italic mt-4">
            "The Will of D. lives on in those who chase their dreams."
          </p>
        </motion.div>

        {/* Hidden Laugh Button */}
        <div className="text-center mb-12">
          <p className="text-yellow-200/70 mb-4 text-sm">
            You've found Laugh Tale... but have you found <em>the laugh</em>?
          </p>
          
          <motion.button
            onClick={handleLaugh}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 px-8 py-4 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Laugh className="w-6 h-6" />
            <span className="font-bold text-lg">
              {laughCount === 0 ? "Laugh!" : `Laugh! (${laughCount}/10)`}
            </span>

            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute pointer-events-none text-2xl"
                  initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 0 }}
                  animate={{ y: particle.y - 100, opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  😂
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Secret Message Modal */}
        <AnimatePresence>
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mb-20"
            >
              <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-xl border border-yellow-400/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                
                <button 
                  onClick={() => setShowSecret(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center relative z-10">
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-3xl text-yellow-300 mb-6 font-bold" style={{ fontFamily: 'serif' }}>
                    The Final Treasure
                  </h3>

                  {!isUnlocked ? (
                    /* Locked State */
                    <div className="space-y-6">
                      <p className="text-amber-100">
                        To access the private repository, you must answer the final riddle:
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <p className="text-yellow-200 font-serif italic text-lg">
                          "I want the most ridiculous power in the world. I am the warrior of..."
                        </p>
                      </div>
                      
                      <form onSubmit={checkPassword} className="flex gap-2 max-w-sm mx-auto">
                        <Input
                          type="text"
                          placeholder="Enter the word..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-black/50 border-yellow-600/50 text-white placeholder:text-white/30"
                        />
                        <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black">
                           <Lock className="w-4 h-4" />
                        </Button>
                      </form>
                      <p className="text-xs text-white/40">Hint: It's what Luffy fights for.</p>
                    </div>
                  ) : (
                    /* Unlocked State */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-6 bg-green-900/30 rounded-lg border border-green-500/30">
                         <p className="text-xl text-green-300 font-bold mb-2">🔓 REPOSITORY UNLOCKED</p>
                         <p className="text-amber-100/80 text-sm mb-4">
                           You have proven your worth. Here is the link to my complete Portfolio, 
                           design systems, and production assets.
                         </p>
                         <Button 
                           onClick={() => window.open('https://github.com/RahulSonawane-rgb/One-Piece-Portfolio', '_blank')}
                           className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-6 text-lg"
                         >
                            Go to Secret GitHub Repo <ArrowRight className="ml-2 w-5 h-5" />
                         </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <div className="text-center mt-16 text-amber-100/40 text-xs space-y-2">
          <p>© {new Date().getFullYear()} • Built with the power of the Gomu Gomu no Mi</p>
        </div>
      </div>
    </footer>
  );
}