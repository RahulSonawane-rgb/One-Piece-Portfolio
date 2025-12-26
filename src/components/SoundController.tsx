import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export function SoundController() {
  const { isPlaying, toggleSound } = useAudio();

  return (
    <motion.button
      onClick={toggleSound}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-[0_0_20px_rgba(212,160,23,0.5)] border-2 border-[#d4a017] flex items-center justify-center transition-all duration-300 ${
        isPlaying ? 'bg-[#d92121] text-white' : 'bg-[#2a1a0a] text-[#d4a017]'
      }`}
    >
      {isPlaying ? (
        <div className="relative">
          <Volume2 className="w-6 h-6 animate-pulse" />
          <motion.div
            className="absolute -top-8 -left-2"
            animate={{ y: -20, opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Music className="w-4 h-4 text-yellow-300" />
          </motion.div>
        </div>
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </motion.button>
  );
}