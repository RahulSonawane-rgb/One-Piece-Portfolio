import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';

type PoneglyphId = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

interface PoneglyphContextType {
  foundStones: PoneglyphId[];
  solvedStones: PoneglyphId[];
  isGateOpen: boolean; // <--- NEW: The Key to Laughtale
  collectStone: (id: PoneglyphId) => void;
  solveStone: (id: PoneglyphId) => void;
  unlockGate: () => void; // <--- NEW: Function to turn the key
  resetProgress: () => void;
  isAllFound: boolean;
  isAllSolved: boolean;
}

const PoneglyphContext = createContext<PoneglyphContextType | undefined>(undefined);

export function PoneglyphProvider({ children }: { children: ReactNode }) {
  const [foundStones, setFoundStones] = useState<PoneglyphId[]>([]);
  const [solvedStones, setSolvedStones] = useState<PoneglyphId[]>([]);
  const [isGateOpen, setIsGateOpen] = useState(false); // Default is Locked
  const { toast } = useToast();

  // Load from LocalStorage
  useEffect(() => {
    const savedFound = localStorage.getItem('road_poneglyphs_found');
    const savedSolved = localStorage.getItem('road_poneglyphs_solved');
    const savedGate = localStorage.getItem('laughtale_gate_open'); // Check if key exists
    
    if (savedFound) setFoundStones(JSON.parse(savedFound));
    if (savedSolved) setSolvedStones(JSON.parse(savedSolved));
    if (savedGate === 'true') setIsGateOpen(true);
  }, []);

  const collectStone = (id: PoneglyphId) => {
    if (!foundStones.includes(id)) {
      const newStones = [...foundStones, id];
      setFoundStones(newStones);
      localStorage.setItem('road_poneglyphs_found', JSON.stringify(newStones));
      toast({
        title: "PONEGLYPH DISCOVERED!",
        description: "Check your Quest Log.",
        className: "bg-[#991b1b] text-[#fee2e2] border-4 border-[#2a1a0a] font-serif font-black tracking-widest",
      });
    }
  };

  const solveStone = (id: PoneglyphId) => {
    if (!solvedStones.includes(id)) {
      const newSolved = [...solvedStones, id];
      setSolvedStones(newSolved);
      localStorage.setItem('road_poneglyphs_solved', JSON.stringify(newSolved));
      toast({
        title: "FRAGMENT DECIPHERED",
        description: "The ancient text becomes clear...",
        className: "bg-[#15803d] text-white border-2 border-[#2a1a0a]",
      });
    }
  };

  // --- NEW: The function called when they type "LILI" ---
  const unlockGate = () => {
    setIsGateOpen(true);
    localStorage.setItem('laughtale_gate_open', 'true');
  };

  const resetProgress = () => {
    setFoundStones([]);
    setSolvedStones([]);
    setIsGateOpen(false);
    localStorage.removeItem('road_poneglyphs_found');
    localStorage.removeItem('road_poneglyphs_solved');
    localStorage.removeItem('laughtale_gate_open');
    toast({ title: "JOURNEY RESET", description: "The Poneglyphs have scattered once more." });
  };

  const isAllFound = foundStones.length === 4;
  const isAllSolved = solvedStones.length === 4;

  return (
    <PoneglyphContext.Provider value={{ foundStones, solvedStones, isGateOpen, collectStone, solveStone, unlockGate, resetProgress, isAllFound, isAllSolved }}>
      {children}
    </PoneglyphContext.Provider>
  );
}

export const usePoneglyph = () => {
  const context = useContext(PoneglyphContext);
  if (!context) throw new Error('usePoneglyph must be used within a PoneglyphProvider');
  return context;
};