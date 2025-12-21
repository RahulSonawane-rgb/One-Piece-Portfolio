import { useState } from 'react';
import { usePoneglyph } from '@/context/PoneglyphContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X, Lock, Map, CheckCircle, RefreshCcw, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';


export function QuestLog() {
  const { foundStones, solvedStones, solveStone, resetProgress, isAllSolved, unlockGate } = usePoneglyph();
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [finalInput, setFinalInput] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // --- CONFIGURATION ---
  const FINAL_ANSWERS = ["LILI", "LILY", "NEFERTARILILI", "QUEENLILI"]; 

  const quests = [
    {
      id: 'NORTH',
      title: 'North (Alabasta)',
      location_hint: "Seek the visage of the criminal worth 1.5 Billion (About Section - Wanted Poster).",
      
      // Question: About the Princess
      question: "Who is the Princess of Alabasta?",
      
      // ANSWERS: Covers first name, full name, titles, and aliases
      valid_answers: [
        "VIVI", 
        "NEFERTARIVIVI", 
        "PRINCESSVIVI", 
        "MISSWEDNESDAY", 
        "BIBI", // Common typo/romanization
        "NEFERTARIDVIVI" // In case they guess the D early
      ],
      reward_line: "From sands of struggle where a princess fights..."
    },
    {
      id: 'SOUTH',
      title: 'South (Skypiea)',
      location_hint: "History is silent until you open it. Check the 'Voyage Log' (Experience Modal).",
      
      // Question: About the Golden City (Shandora)
      question: "What is the name of the Golden City thrown into the sky?",
      
      // ANSWERS: Covers the city name, descriptive names
      valid_answers: [
        "SHANDORA", 
        "CITYOFGOLD", 
        "GOLDENCITY", 
        "SHANDORACITY",
        "GOLDENCITYSHANDORA",
        "SHANDIA" 
      ],
      reward_line: "...to clouds of thunder where old gods take wing..."
    },
    {
      id: 'EAST',
      title: 'East (Water 7)',
      location_hint: "I rest in the East, beneath the Captain's declaration of ships (Projects Header).",
      
      // NEW QUESTION: About the Ancient Weapon (Fits the 'Builder' theme)
      question: "What Ancient Weapon's blueprints were burned by Franky?",
      
      // ANSWERS: Covers the weapon name
      valid_answers: [
        "PLUTON", 
        "ANCIENTWEAPONPLUTON", 
        "BATTLESHIPPLUTON",
        "PLUTO" // Common misspelling
      ],
      reward_line: "...through docks of tears where a builder's fire burns..."
    },
    {
      id: 'WEST',
      title: 'West (Thriller Bark)',
      location_hint: "Buried deep beneath the pile of golden papers (Certificates).",
      
      // Question: About the Warlord
      question: "Who was the Warlord stealing shadows in the Florian Triangle?",
      
      // ANSWERS: Covers full name, variations, and spellings
      valid_answers: [
        "MORIA", 
        "GECKOMORIA", 
        "GEKKOMORIA", // Japanese spelling
        "GEKKOMORIAH", 
        "GECKOMORIAH",
        "CAPTAINMORIA",
        "KISHIBUKAIMORIA"
      ],
      reward_line: "...in fog of shadows where the dead refuse to rest."
    }
  ];

  // --- HANDLERS ---
  
  // Handle Mini-Quiz Submission
  const handleQuizSubmit = (questId: string, validAnswers: string[]) => {
    const val = (inputs[questId] || '').toUpperCase().replace(/\s/g, '');
    if (validAnswers.includes(val)) {
       solveStone(questId as any);
    } else {
       toast({ title: "INCORRECT", description: "The stone remains locked.", variant: "destructive" });
    }
  };

  // Handle Final Submission
  const handleFinalUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = finalInput.toUpperCase().replace(/\s/g, '').replace(/['.-]/g, '');
    
    if (FINAL_ANSWERS.includes(cleanInput)) {
      // 1. UNLOCK THE GATE IN CONTEXT
      unlockGate(); 

      toast({ 
        title: "THE WILL OF D. LIVES ON!", 
        description: "The Poneglyphs guide you to the end...",
        className: "bg-[#d4a017] text-[#2a1a0a] border-4 border-[#2a1a0a] font-black" 
      });
      
      // 2. NAVIGATE
      setTimeout(() => navigate('/laughtale'), 2000);
    } else {
      toast({ title: "HISTORY REMAINS SILENT", description: "That is not her name.", variant: "destructive" });
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[60] bg-[#2a1a0a] border-2 border-[#d4a017] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,160,23,0.3)] hover:scale-110 transition-transform group"
        whileHover={{ rotate: 15 }}
      >
        <Compass className={`w-8 h-8 text-[#d4a017] ${!isAllSolved ? 'animate-spin-slow' : ''}`} />
        {!isAllSolved && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#d92121] rounded-full border-2 border-[#2a1a0a] flex items-center justify-center text-[8px] text-white font-bold">
            {4 - solvedStones.length}
          </span>
        )}
      </motion.button>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#f0e6d2] border-[6px] border-[#5a3a2a] rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Paper Texture */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

              {/* Header */}
              <div className="bg-[#5a3a2a] p-4 flex justify-between items-center relative z-10">
                 <div className="flex items-center gap-3">
                    <Map className="text-[#d4a017] w-6 h-6" />
                    <h2 className="text-[#d4a017] font-serif font-black uppercase tracking-widest text-xl">
                      Poneglyph Log
                    </h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="text-[#d4a017] hover:text-white"><X /></button>
              </div>

              {/* --- CONTENT --- */}
              <div className="p-6 overflow-y-auto custom-scrollbar relative z-10 flex-1">
                
                {/* 1. THE 4 STONES LIST */}
                <div className="space-y-4 mb-8">
                  {quests.map((quest) => {
                    const isFound = foundStones.includes(quest.id as any);
                    const isSolved = solvedStones.includes(quest.id as any);
                    
                    return (
                      <div key={quest.id} className={`border-2 rounded p-3 transition-all ${isSolved ? 'bg-[#d92121]/10 border-[#d92121]' : 'bg-white border-[#5a3a2a]/30'}`}>
                         
                         {/* Header Row */}
                         <div className="flex justify-between items-center mb-2">
                            <h3 className={`font-black uppercase text-xs tracking-wider ${isSolved ? 'text-[#d92121]' : 'text-[#5a3a2a]'}`}>
                               {quest.title}
                            </h3>
                            {isSolved ? <CheckCircle className="w-4 h-4 text-[#d92121]" /> : <Lock className="w-4 h-4 text-[#5a3a2a]/40" />}
                         </div>

                         {/* Content Logic */}
                         {!isFound ? (
                            // State A: Not Found Yet
                            <p className="text-xs font-mono text-[#8b6f58]">Hint: {quest.location_hint}</p>
                         ) : !isSolved ? (
                            // State B: Found, needs Quiz Answer
                            <div className="mt-2 animate-in slide-in-from-left">
                               <p className="text-[#2a1a0a] font-bold text-sm mb-2">
                                 Question: {quest.question}
                               </p>
                               <div className="flex gap-2">
                                  <Input 
                                    placeholder="Answer..." 
                                    className="h-8 bg-white border-[#5a3a2a]/50 text-xs"
                                    value={inputs[quest.id] || ''}
                                    onChange={(e) => setInputs(prev => ({...prev, [quest.id]: e.target.value}))}
                                  />
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-[#5a3a2a] text-[#d4a017]"
                                    onClick={() => handleQuizSubmit(quest.id, quest.valid_answers)}
                                  >
                                    Verify
                                  </Button>
                               </div>
                            </div>
                         ) : (
                            // State C: Solved, show Reward Line
                            <p className="font-serif italic text-sm text-[#2a1a0a] font-bold leading-relaxed border-l-2 border-[#d92121] pl-3">
                               "{quest.reward_line}"
                            </p>
                         )}
                      </div>
                    );
                  })}
                </div>

                {/* 2. THE FINAL QUESTION (Only if all 4 solved) */}
                {isAllSolved && (
                  <div className="bg-[#2a1a0a] p-6 rounded text-[#d4a017] border-4 border-[#d4a017] text-center animate-in zoom-in duration-500">
                     <HelpCircle className="w-10 h-10 mx-auto mb-3 text-[#d92121]" />
                     <h2 className="font-black uppercase tracking-widest text-lg mb-2">The Forgotten Queen</h2>
                     <p className="font-serif text-sm italic opacity-80 mb-4 leading-relaxed">
                        "What forgotten queen's name rides these waves of rebellion and ruin—the desert's defiant mother, who carved stones to mock the gods and hid her legacy in the blood of 'D.'?"
                     </p>
                     
                     <form onSubmit={handleFinalUnlock} className="flex gap-2">
                        <Input 
                          value={finalInput}
                          onChange={(e) => setFinalInput(e.target.value)}
                          placeholder="ENTER HER NAME..."
                          className="bg-white border-none text-[#2a1a0a] font-black text-center uppercase h-12 text-lg"
                        />
                        <Button className="bg-[#d92121] hover:bg-[#b91c1c] text-white font-black h-12 px-6">
                          UNLOCK
                        </Button>
                     </form>
                  </div>
                )}

                {/* 3. RESTART BUTTON */}
                <div className="mt-8 pt-4 border-t border-[#5a3a2a]/20 text-center">
                   <button 
                     onClick={() => {
                        if(confirm("Are you sure you want to reset your Poneglyph progress?")) {
                           resetProgress();
                           setInputs({});
                           setFinalInput('');
                        }
                     }}
                     className="text-[10px] uppercase font-bold text-[#5a3a2a]/50 hover:text-[#d92121] flex items-center justify-center gap-1 mx-auto transition-colors"
                   >
                     <RefreshCcw className="w-3 h-3" /> Restart Journey
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