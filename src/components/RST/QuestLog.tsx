import { useState } from 'react';
import { usePoneglyph } from '@/context/PoneglyphContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X, Lock, Map, CheckCircle, RefreshCcw, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';
import { useNavigate } from 'react-router-dom';

export function QuestLog() {
  const { activeConfig, foundStones, solvedStones, solveStone, resetProgress, isAllSolved, unlockGate } = usePoneglyph();
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [finalInput, setFinalInput] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const FINAL_ANSWERS = ["LILI", "LILY", "NEFERTARILILI", "QUEENLILI"]; 

  const handleQuizSubmit = (stoneId: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST') => {
    const config = activeConfig[stoneId];
    if(!config) return;

    const val = (inputs[stoneId] || '').toUpperCase().replace(/\s/g, '');
    if (config.question.validAnswers.includes(val)) {
       solveStone(stoneId);
    } else {
       toast({ title: "INCORRECT", description: "The stone remains locked.", variant: "destructive" });
    }
  };

  const handleFinalUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = finalInput.toUpperCase().replace(/\s/g, '').replace(/['.-]/g, '');
    if (FINAL_ANSWERS.includes(cleanInput)) {
      unlockGate();
      toast({ 
        title: "THE WILL OF D. LIVES ON!", 
        description: "The Poneglyphs guide you to the end...",
        className: "bg-[#d4a017] text-[#2a1a0a] border-4 border-[#2a1a0a] font-black" 
      });
      setTimeout(() => navigate('/laughtale'), 2000);
      setTimeout(() => setIsOpen(false), 3000);
    } else {
      toast({ title: "SILENCE...", description: "That is not her name.", variant: "destructive" });
    }
  };

  // Helper to render a quest row
  const renderQuestRow = (stoneId: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST') => {
    const config = activeConfig[stoneId];
    if (!config) return null; // Loading state

    const isFound = foundStones.includes(stoneId);
    const isSolved = solvedStones.includes(stoneId);

    return (
      <div key={stoneId} className={`border-2 rounded p-3 transition-all ${isSolved ? 'bg-[#d92121]/10 border-[#d92121]' : 'bg-white border-[#5a3a2a]/30'}`}>
         <div className="flex justify-between items-center mb-2">
            <h3 className={`font-black uppercase text-xs tracking-wider ${isSolved ? 'text-[#d92121]' : 'text-[#5a3a2a]'}`}>
               {stoneId} Stone
            </h3>
            {isSolved ? <CheckCircle className="w-4 h-4 text-[#d92121]" /> : <Lock className="w-4 h-4 text-[#5a3a2a]/40" />}
         </div>

         {!isFound ? (
            // Dynamic Hint from Config
            <p className="text-xs font-mono text-[#8b6f58]">Hint: {config.locationHint}</p>
         ) : !isSolved ? (
            // Dynamic Question from Config
            <div className="mt-2 animate-in slide-in-from-left">
               <p className="text-[#2a1a0a] font-bold text-sm mb-2">
                 {config.question.question}
               </p>
               <div className="flex gap-2">
                  <Input 
                    placeholder="Answer..." className="h-8 bg-white border-[#5a3a2a]/50 text-xs"
                    value={inputs[stoneId] || ''}
                    onChange={(e) => setInputs(prev => ({...prev, [stoneId]: e.target.value}))}
                  />
                  <Button size="sm" className="h-8 bg-[#5a3a2a] text-[#d4a017]" onClick={() => handleQuizSubmit(stoneId)}>Verify</Button>
               </div>
            </div>
         ) : (
            // Fixed Reward Line
            <p className="font-serif italic text-sm text-[#2a1a0a] font-bold leading-relaxed border-l-2 border-[#d92121] pl-3">
               "{config.fragmentLine}"
            </p>
         )}
      </div>
    );
  };

  return (
    <>
      <motion.button onClick={() => setIsOpen(true)} className="fixed bottom-6 left-6 z-[60] bg-[#2a1a0a] border-2 border-[#d4a017] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <Compass className={`w-8 h-8 text-[#d4a017] ${!isAllSolved ? 'animate-spin-slow' : ''}`} />
        {!isAllSolved && <span className="absolute top-0 right-0 w-4 h-4 bg-[#d92121] rounded-full border-2 border-[#2a1a0a] flex items-center justify-center text-[8px] text-white font-bold">{4 - solvedStones.length}</span>}
      </motion.button>
    
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-2xl bg-[#f0e6d2] border-[6px] border-[#5a3a2a] rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="bg-[#5a3a2a] p-4 flex justify-between items-center relative z-10">
                 <h2 className="text-[#d4a017] font-serif font-black uppercase tracking-widest text-xl">Log Pose</h2>
                 <div className="absolute top-2 left-40 opacity-30 hover:opacity-100 z-50">
                    <RoadPoneglyph locationId="HINT_SECTION" />
                  </div>
                 <button onClick={() => setIsOpen(false)} className="text-[#d4a017] hover:text-white"><X /></button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar relative z-10 flex-1">
                <div className="space-y-4 mb-8">
                  {activeConfig.NORTH && renderQuestRow('NORTH')}
                  {activeConfig.SOUTH && renderQuestRow('SOUTH')}
                  {activeConfig.EAST && renderQuestRow('EAST')}
                  {activeConfig.WEST && renderQuestRow('WEST')}
                </div>

                {isAllSolved && (
                  <div className="bg-[#2a1a0a] p-6 rounded text-[#d4a017] border-4 border-[#d4a017] text-center animate-in zoom-in duration-500">
                     <HelpCircle className="w-10 h-10 mx-auto mb-3 text-[#d92121]" />
                     <p className="font-serif text-sm italic opacity-80 mb-4 leading-relaxed">
                        "What forgotten queen's name rides these waves of rebellion and ruin—the desert's defiant mother, who carved stones to mock the gods and hid her legacy in the blood of 'D.'?"
                     </p>
                     <form onSubmit={handleFinalUnlock} className="flex gap-2">
                        <Input value={finalInput} onChange={(e) => setFinalInput(e.target.value)} placeholder="ENTER NAME..." className="bg-white border-none text-[#2a1a0a] font-black text-center uppercase h-12 text-lg" />
                        <Button className="bg-[#d92121] hover:bg-[#b91c1c] text-white font-black h-12 px-6">UNLOCK</Button>
                     </form>
                  </div>
                )}

                <div className="mt-8 pt-4 border-t border-[#5a3a2a]/20 text-center">
                   <button onClick={() => { if(confirm("Reshuffle stones?")) resetProgress(); }} className="text-[10px] uppercase font-bold text-[#5a3a2a]/50 hover:text-[#d92121] flex items-center justify-center gap-1 mx-auto transition-colors">
                     <RefreshCcw className="w-3 h-3" /> Reshuffle World
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}