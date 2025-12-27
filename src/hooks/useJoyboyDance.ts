import { useAudio } from '@/context/AudioContext';
import { useRef } from 'react';

export function useJoyboyDance() {
  const { isPlaying, beatStrength } = useAudio();
  
  // Stores the current dance step (0, 1, 2, or 3)
  const step = useRef(0);
  const lastBeatTime = useRef(0);

  // --- 1. BEAT DETECTION ---
  // High threshold to only catch the "Kick" drum
  let cleanBeat = beatStrength;
  if (cleanBeat < 0.25) cleanBeat = 0; 
  
  const impulse = Math.pow(cleanBeat, 2);

  // --- 2. STEP SEQUENCER ---
  // If a hard beat hits, move to the next dance step
  if (impulse > 0.3 && Date.now() - lastBeatTime.current > 300) {
    step.current = (step.current + 1) % 4; // Cycle 0 -> 1 -> 2 -> 3 -> 0
    lastBeatTime.current = Date.now();
  }

  // --- 3. CHOREOGRAPHY ENGINE ---
  let x = 0;
  let y = 0;
  let rotate = 0;
  let scaleY = 1;
  let scaleX = 1;

  if (isPlaying && cleanBeat > 0) {
    // Apply the move based on which step we are on
    switch (step.current) {
      case 0: // MOVE LEFT
        x = -4; 
        rotate = -3;
        break;
      case 1: // MOVE RIGHT
        x = 4;
        rotate = 3;
        break;
      case 2: // JUMP UP
        y = -8;
        scaleX = 0.95; // Narrow
        break;
      case 3: // SQUASH DOWN
        y = 2;
        scaleY = 0.90; // Flatten
        scaleX = 1.05; // Widen
        break;
    }

    // Multiply everything by impulse so it's subtle on weak beats, strong on loud beats
    x *= impulse;
    y *= impulse;
    rotate *= impulse;
  }

  return {
    animate: {
      x,
      y,
      rotate,
      scaleX: isPlaying ? scaleX : 1,
      scaleY: isPlaying ? scaleY : 1,
    },
    transition: {
      // DANCE PHYSICS
      // Stiffness 400 = Fast but follows the music
      // Damping 15 = Lets it flow a bit
      type: "spring" as const,
      stiffness: 400,
      damping: 15,     
      mass: 0.5,       
    }
  };
}