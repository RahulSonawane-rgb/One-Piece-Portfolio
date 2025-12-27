import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Path to your file
const DRUMS_URL = '/audio/drums_of_liberation.mp3'; 

interface AudioContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  beatStrength: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatStrength, setBeatStrength] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  
  // Track if we are getting real data or need to fake it
  const hasRealDataRef = useRef(false);

  // Initialize Audio Context (Lazy Load)
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    
    // Resume context if suspended (Chrome policy)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (!analyserRef.current && audioContextRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    // Connect source safely
    if (audioRef.current && audioContextRef.current && analyserRef.current && !sourceRef.current) {
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        // console.log("🔊 Audio Graph Connected Successfully");
      } catch (e) {
        console.error("Audio Graph Error:", e);
      }
    }
  };

  const loop = () => {
    if (!isPlaying) return;

    let strength = 0;

    // 1. Try to get Real Data
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Check Bass Frequencies
      let sum = 0;
      for (let i = 0; i < 5; i++) {
        sum += dataArray[i];
      }
      const average = sum / 5;
      
      if (average > 0) {
        hasRealDataRef.current = true;
        strength = average / 255; // Normalize 0-1
      }
    }

    // 2. FALLBACK: If real data is 0 (CORS/Browser Block), Simulate a Beat
    if (!hasRealDataRef.current) {
      // Create a 2Hz sine wave (approx 120 BPM)
      const time = Date.now() / 1000;
      // Oscillate between 0 and 0.8
      strength = Math.abs(Math.sin(time * 8)) * 0.8; 
    }

    setBeatStrength(strength);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  const toggleSound = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // STOP
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setBeatStrength(0);
      cancelAnimationFrame(animationFrameRef.current);
      hasRealDataRef.current = false;
    } else {
      // PLAY
      try {
        initAudioContext();
        await audioRef.current.play();
        setIsPlaying(true);
        // Start Loop
        loop();
      } catch (e) {
        console.error("Play failed:", e);
      }
    }
  };

  // Watch isPlaying to start/stop loop
  useEffect(() => {
    if (isPlaying) {
      loop();
    } else {
      cancelAnimationFrame(animationFrameRef.current);
      setBeatStrength(0);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, beatStrength }}>
      {/* IMPORTANT: Removed 'crossOrigin' attribute. 
         Sometimes locally served files get blocked by CORS if this is present.
      */}
      <audio 
        ref={audioRef} 
        src={DRUMS_URL} 
        onEnded={() => {
          setIsPlaying(false);
          setBeatStrength(0);
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};