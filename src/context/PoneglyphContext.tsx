import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { PoneQuestion, PoneLocation, QUESTION_POOL, LOCATION_POOL } from '@/api/poneglyphData';

type StoneId = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

// Defines the current "Active" setup for a specific stone
interface StoneConfig {
  stoneId: StoneId;
  locationId: string; // Where it is currently hidden
  locationHint: string;
  question: PoneQuestion;
  fragmentLine: string; // The poetic line (fixed per direction)
}

interface PoneglyphContextType {
  activeConfig: Record<StoneId, StoneConfig | null>; // The randomized setup
  foundStones: StoneId[];
  solvedStones: StoneId[];
  isGateOpen: boolean;
  collectStone: (locationId: string) => void;
  solveStone: (stoneId: StoneId) => void;
  unlockGate: () => void;
  resetProgress: () => void;
  isAllFound: boolean;
  isAllSolved: boolean;
}

const PoneglyphContext = createContext<PoneglyphContextType | undefined>(undefined);

// Helper to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function PoneglyphProvider({ children }: { children: ReactNode }) {
  const [activeConfig, setActiveConfig] = useState<Record<StoneId, StoneConfig | null>>({
    NORTH: null, SOUTH: null, EAST: null, WEST: null
  });
  const [foundStones, setFoundStones] = useState<StoneId[]>([]);
  const [solvedStones, setSolvedStones] = useState<StoneId[]>([]);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const { toast } = useToast();

  // --- INITIALIZE / LOAD GAME ---
  useEffect(() => {
    const savedConfig = localStorage.getItem('pone_active_config');
    const savedFound = localStorage.getItem('pone_found');
    const savedSolved = localStorage.getItem('pone_solved');
    const savedGate = localStorage.getItem('pone_gate');

    if (savedConfig) {
      // Load existing game
      setActiveConfig(JSON.parse(savedConfig));
      if (savedFound) setFoundStones(JSON.parse(savedFound));
      if (savedSolved) setSolvedStones(JSON.parse(savedSolved));
      if (savedGate) setIsGateOpen(JSON.parse(savedGate));
    } else {
      // START NEW GAME (Randomize)
      randomizeGame();
    }
  }, []);

  const randomizeGame = () => {
    // 1. Shuffle Locations and pick 4
    const locs = shuffle(LOCATION_POOL).slice(0, 4);
    // 2. Shuffle Questions and pick 4
    const qs = shuffle(QUESTION_POOL).slice(0, 4);

    const newConfig: Record<StoneId, StoneConfig> = {
      NORTH: { 
        stoneId: 'NORTH', 
        locationId: locs[0].id, 
        locationHint: locs[0].hint, 
        question: qs[0], 
        fragmentLine: "From sands of struggle where a princess fights..." 
      },
      SOUTH: { 
        stoneId: 'SOUTH', 
        locationId: locs[1].id, 
        locationHint: locs[1].hint, 
        question: qs[1], 
        fragmentLine: "...to clouds of thunder where old gods take wing..." 
      },
      EAST: { 
        stoneId: 'EAST', 
        locationId: locs[2].id, 
        locationHint: locs[2].hint, 
        question: qs[2], 
        fragmentLine: "...through docks of tears where a builder's fire burns..." 
      },
      WEST: { 
        stoneId: 'WEST', 
        locationId: locs[3].id, 
        locationHint: locs[3].hint, 
        question: qs[3], 
        fragmentLine: "...in fog of shadows where the dead refuse to rest." 
      }
    };

    setActiveConfig(newConfig);
    setFoundStones([]);
    setSolvedStones([]);
    setIsGateOpen(false);
    
    // Save to local storage
    localStorage.setItem('pone_active_config', JSON.stringify(newConfig));
    // Clear other storages
    localStorage.removeItem('pone_found');
    localStorage.removeItem('pone_solved');
    localStorage.removeItem('pone_gate');
  };

  // --- ACTIONS ---

  const collectStone = (locationId: string) => {
    // Find which stone is at this location
    const stoneEntry = Object.values(activeConfig).find(c => c?.locationId === locationId);
    if (!stoneEntry) return; // Should not happen

    if (!foundStones.includes(stoneEntry.stoneId)) {
      const newFound = [...foundStones, stoneEntry.stoneId];
      setFoundStones(newFound);
      localStorage.setItem('pone_found', JSON.stringify(newFound));
      toast({
        title: "PONEGLYPH DISCOVERED!",
        description: "Check your Quest Log to decipher it.",
        className: "bg-[#991b1b] text-[#fee2e2] border-4 border-[#2a1a0a] font-black tracking-widest",
      });
    }
  };

  const solveStone = (stoneId: StoneId) => {
    if (!solvedStones.includes(stoneId)) {
      const newSolved = [...solvedStones, stoneId];
      setSolvedStones(newSolved);
      localStorage.setItem('pone_solved', JSON.stringify(newSolved));
      toast({ title: "FRAGMENT DECIPHERED", className: "bg-[#15803d] text-white" });
    }
  };

  const unlockGate = () => {
    setIsGateOpen(true);
    localStorage.setItem('pone_gate', 'true');
  };

  const resetProgress = () => {
    randomizeGame(); // Re-shuffles everything!
    toast({ title: "WORLD RESET", description: "The Poneglyphs have moved to new locations." });
  };

  return (
    <PoneglyphContext.Provider value={{ 
      activeConfig, foundStones, solvedStones, isGateOpen, 
      collectStone, solveStone, unlockGate, resetProgress, 
      isAllFound: foundStones.length === 4, 
      isAllSolved: solvedStones.length === 4 
    }}>
      {children}
    </PoneglyphContext.Provider>
  );
}

export const usePoneglyph = () => {
  const context = useContext(PoneglyphContext);
  if (!context) throw new Error('usePoneglyph error');
  return context;
};