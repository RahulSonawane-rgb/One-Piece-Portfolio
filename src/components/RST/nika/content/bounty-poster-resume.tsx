import { motion } from 'framer-motion';
import { Download, Eye, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/useToast';

export function BountyPosterResume() {
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "BOUNTY ACQUIRED!",
        description: "The 'Wanted Poster' Resume has been saved to your ship's log.",
        className: "bg-amber-900 border-2 border-yellow-500 text-yellow-100",
      });
      // In a real app, you would trigger a file download here:
      // window.location.href = '/assets/resumes/bounty-resume.pdf';
    }, 2000);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotateZ: 2 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer h-full w-full max-w-sm mx-auto md:max-w-none"
      >
        {/* Wanted Poster Frame */}
        <div className="bg-[#fdfbf7] p-4 md:p-6 rounded-sm shadow-xl border-4 md:border-[6px] border-[#5a3a2a] relative overflow-hidden h-full flex flex-col">
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")`,
            backgroundBlendMode: 'multiply'
          }} />

          {/* Top Banner */}
          <div className="text-center mb-2 md:mb-4 relative z-10">
            <h3 className="text-3xl md:text-5xl text-[#2a1a0a] uppercase tracking-widest font-black" style={{ fontFamily: 'serif', transform: 'scaleY(1.2)' }}>
              WANTED
            </h3>
            <div className="flex items-center justify-between text-[8px] md:text-[10px] font-bold text-[#5a3a2a] px-1 md:px-2 mt-1">
              <span>DEAD OR ALIVE</span>
              <span>SDE-KING</span>
            </div>
          </div>

          {/* Photo Placeholder */}
          <div className="bg-[#5a3a2a] p-1 mb-2 md:mb-4 shadow-inner relative z-10">
             <div className="bg-[#fdfbf7] aspect-[4/3] flex items-center justify-center border border-[#2a1a0a]/20">
                <span className="text-3xl md:text-4xl grayscale opacity-50">☠️</span>
             </div>
          </div>

          {/* Name */}
          <h4 className="text-xl md:text-3xl text-center text-[#2a1a0a] uppercase font-black mb-1 md:mb-2 leading-none break-words" style={{ fontFamily: 'serif' }}>
            RAHUL SONAWANE
          </h4>

          {/* Bounty */}
          <div className="text-center mb-auto relative z-10 mt-2 md:mt-4">
            <div className="flex items-center justify-center gap-1 md:gap-2 text-[#2a1a0a] font-serif font-black text-xl md:text-3xl">
              <span className="text-lg md:text-xl">฿</span>
              <span>1,500,000,000</span>
              <span className="text-xs md:text-sm mt-2">-</span>
            </div>
          </div>

          {/* Bottom Notice */}
          <div className="text-center text-[10px] md:text-xs font-bold text-[#2a1a0a] border-t-2 md:border-t-4 border-[#2a1a0a] pt-2 mt-4 md:mt-6 relative z-10 uppercase tracking-widest">
            Marine HQ • Official
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button
              onClick={() => setShowPreview(true)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm md:text-base"
            >
              <Eye className="w-4 h-4 mr-2" />
              Examine
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-white hover:bg-gray-200 text-black font-bold text-sm md:text-base"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              {isDownloading ? "Seizing..." : "Steal Poster"}
            </Button>
          </div>
        </div>

        {/* Label */}
        <div className="mt-4 text-center">
          <p className="text-yellow-400 font-bold text-base md:text-lg" style={{ fontFamily: 'serif' }}>The "Wanted" Resume</p>
          <p className="text-white/50 text-[10px] md:text-xs">Creative • Bold • Distinctive</p>
        </div>
      </motion.div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[90vw] md:max-w-3xl bg-[#fdfbf7] border-4 border-[#5a3a2a] p-0 overflow-hidden text-[#2a1a0a]">
          <DialogHeader className="p-4 md:p-6 bg-[#5a3a2a] text-yellow-400">
            <DialogTitle className="flex items-center gap-2 text-lg md:text-xl font-serif">
              📜 Bounty Poster Template Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 md:p-8 overflow-y-auto max-h-[70vh] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
               {/* Visual Preview */}
               <div className="w-full md:w-1/2 bg-white shadow-2xl p-2 md:p-4 rotate-1 border border-gray-200">
                  <div className="border-4 border-black p-4 h-48 md:h-64 flex items-center justify-center bg-gray-50 text-center text-sm md:text-base">
                     (Full PDF Preview would render here)
                  </div>
               </div>

               {/* Details */}
               <div className="w-full md:w-1/2 space-y-3 md:space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold uppercase border-b-2 border-[#5a3a2a] pb-2">Why this format?</h3>
                  <ul className="space-y-2 md:space-y-3 text-xs md:text-sm font-medium">
                     <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                       <span><strong>Unforgettable First Impression:</strong> Recruiters see hundreds of boring docs. They won't forget a bounty poster.</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                       <span><strong>ATS Compatible Layer:</strong> The text is selectable and readable by bots, despite the graphics.</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                       <span><strong>Perfect for:</strong> Frontend Devs, Designers, and Game Devs.</span>
                     </li>
                  </ul>
                  
                  <Button onClick={handleDownload} className="w-full mt-2 md:mt-4 bg-[#5a3a2a] text-yellow-400 hover:bg-[#4a2a1a] text-sm md:text-base">
                     Download Template Package
                  </Button>
               </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}