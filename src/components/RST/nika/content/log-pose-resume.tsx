import { motion } from 'framer-motion';
import { Download, Eye, Navigation, Compass, Loader2, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/useToast';

export function LogPoseResume() {
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "DATA DOWNLOADED",
        description: "Log Pose coordinates (Resume) transferred to local drive.",
        className: "bg-cyan-950 border-2 border-cyan-500 text-cyan-100",
      });
    }, 2000);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotateZ: 1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer h-full"
      >
        {/* Modern Tech Resume */}
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-2xl border border-cyan-500/50 relative overflow-hidden h-full flex flex-col">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
          />

          {/* Header */}
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="relative p-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              <Compass className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg text-cyan-400 font-bold tracking-widest font-mono">
                LOG POSE v2.0
              </h3>
              <p className="text-[10px] text-slate-400 uppercase">Navigation System Online</p>
            </div>
          </div>

          {/* Tech Content Preview */}
          <div className="space-y-3 mb-6 relative z-10">
             <div className="flex justify-between text-xs text-cyan-200/70 font-mono">
                <span>React.js</span>
                <span>[==========] 100%</span>
             </div>
             <div className="flex justify-between text-xs text-cyan-200/70 font-mono">
                <span>TypeScript</span>
                <span>[========= ] 90%</span>
             </div>
             <div className="flex justify-between text-xs text-cyan-200/70 font-mono">
                <span>Node.js</span>
                <span>[========  ] 80%</span>
             </div>
          </div>

          <div className="mt-auto relative z-10 bg-cyan-950/50 border border-cyan-500/20 p-3 rounded text-center">
             <Code className="w-4 h-4 text-cyan-500 mx-auto mb-1" />
             <p className="text-[10px] text-cyan-300 font-mono">
               &lt;System status="ReadyForHire" /&gt;
             </p>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-4 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
            <Button
              onClick={() => setShowPreview(true)}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold"
            >
              <Eye className="w-4 h-4 mr-2" />
              Scan Data
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950 font-bold"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              {isDownloading ? "Transferring..." : "Download Log"}
            </Button>
          </div>
        </div>

        {/* Label */}
        <div className="mt-4 text-center">
          <p className="text-cyan-400 font-bold text-lg" style={{ fontFamily: 'serif' }}>The "Log Pose" Resume</p>
          <p className="text-white/50 text-xs">Modern • Technical • Clean</p>
        </div>
      </motion.div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl bg-[#0f172a] border border-cyan-500 text-cyan-100">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-mono text-cyan-400">
              <Navigation className="w-5 h-5" /> Navigation Data Preview
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
             <div className="bg-slate-900 p-6 rounded border border-slate-700 font-mono text-sm leading-relaxed">
                <p className="text-green-400">{'// Resume_Config.json'}</p>
                <p>{'{'}</p>
                <p className="pl-4">"style": "Modern Minimalist",</p>
                <p className="pl-4">"features": ["Skill Bars", "Project Links", "Dark Mode Ready"],</p>
                <p className="pl-4">"target_audience": "Tech Startups, AI Labs, Web3 Companies"</p>
                <p>{'}'}</p>
             </div>
             
             <p className="text-slate-300">
                This template mimics a HUD interface. It's built for developers who want to show code fluency immediately. 
                Includes Figma layout and CSS snippets.
             </p>

             <Button onClick={handleDownload} className="w-full bg-cyan-600 hover:bg-cyan-500">
                Initiate Download Sequence
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}