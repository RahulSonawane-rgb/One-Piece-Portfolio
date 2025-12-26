import { useAudio } from '@/context/AudioContext';
import { useState, useEffect } from 'react';

export function useJoyboyDance() {
  const { isPlaying, beatStrength } = useAudio();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // --- NIKA PHYSICS CONFIGURATION ---
  
  // 1. ELASTICITY (The Rubber Effect)
  // On desktop, we allow more stretch. On mobile, we keep it tight.
  const stretchFactor = isMobile ? 0.03 : 0.08; 
  
  // 2. THE JUMP (Gravity Defying)
  // Nika floats and bounces high.
  const jumpHeight = isMobile ? -5 : -12;

  // 3. THE LAUGH (Chaotic Rotation)
  // Rotates wildly like Luffy laughing side-to-side
  const maxRotation = isMobile ? 1.5 : 4; 

  // --- REAL-TIME CALCULATIONS ---

  // Scale: Uses a power curve so hard beats make it pop exponentially
  const scale = 1 + Math.pow(beatStrength, 2) * stretchFactor;

  // Y-Axis: Jumps up when the beat hits
  const y = beatStrength * jumpHeight;

  // Rotation: If the beat is strong (>0.3), pick a random tilt direction
  // This creates that "wobbly/rubbery" look
  const rotate = (beatStrength > 0.3) 
    ? Math.sin(Date.now() / 100) * (beatStrength * maxRotation) 
    : 0;

  return {
    animate: {
      scale: isPlaying ? scale : 1,
      y: isPlaying ? y : 0,
      rotate: isPlaying ? rotate : 0,
    },
    transition: {
      // THE GEAR 5 PHYSICS
      type: "spring" as const,
      stiffness: 500,  // Very snappy (Rubber snapping back)
      damping: 12,     // Low friction (Bouncy)
      mass: 0.6,       // Lightweight (Floaty)
    }
  };
}