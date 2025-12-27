import { motion } from 'framer-motion';
import { Download, Eye, Shield, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/useToast';

export function MarineFileResume() {
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "FILE DECLASSIFIED",
        description: "Official Marine Personnel File retrieved successfully.",
        className: "bg-blue-950 border-2 border-blue-500 text-blue-100",
      });
    }, 2000);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotateZ: -1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer h-full w-full max-w-sm mx-auto md:max-w-none"
      >
        {/* Marine File */}
        <div className="bg-slate-100 p-4 md:p-6 rounded-sm shadow-2xl border-t-8 md:border-t-[12px] border-blue-900 relative overflow-hidden h-full flex flex-col">
          {/* Top Secret Stamp */}
          <div className="absolute top-2 right-2 border-2 border-red-600 text-red-600 px-1.5 py-0.5 md:px-2 md:py-0.5 text-[8px] md:text-[10px] font-bold -rotate-12 opacity-70">
            TOP SECRET
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b-2 border-slate-300 pb-3 md:pb-4 mt-2">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-900 shrink-0" />
            <div>
              <h3 className="text-base md:text-lg text-blue-900 font-bold uppercase leading-none">
                PERSONNEL FILE
              </h3>
              <p className="text-[8px] md:text-[10px] text-slate-500 font-bold mt-1">MARINE HEADQUARTERS</p>
            </div>
          </div>

          {/* Content Lines */}
          <div className="space-y-2 md:space-y-3 font-mono text-[10px] md:text-xs text-slate-600 mb-4 md:mb-6">
             <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>NAME:</span>
                <span className="text-slate-900 font-bold">[REDACTED]</span>
             </div>
             <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>RANK:</span>
                <span className="text-slate-900 font-bold">ADMIRAL (DEV)</span>
             </div>
             <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>STATUS:</span>
                <span className="text-green-700 font-bold">DEPLOYABLE</span>
             </div>
          </div>

          <div className="mt-auto">
             <FileText className="w-6 h-6 md:w-8 md:h-8 text-slate-300 mx-auto" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-blue-900/90 flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button
              onClick={() => setShowPreview(true)}
              className="w-full bg-white hover:bg-slate-200 text-blue-900 font-bold text-sm md:text-base"
            >
              <Eye className="w-4 h-4 mr-2" />
              Inspect File
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-transparent border-2 border-white text-white hover:bg-blue-800 font-bold text-sm md:text-base"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              {isDownloading ? "Copying..." : "Declassify"}
            </Button>
          </div>
        </div>

        {/* Label */}
        <div className="mt-4 text-center">
          <p className="text-blue-300 font-bold text-base md:text-lg" style={{ fontFamily: 'serif' }}>The "Marine" Resume</p>
          <p className="text-white/50 text-[10px] md:text-xs">Corporate • Official • Structured</p>
        </div>
      </motion.div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[90vw] md:max-w-3xl bg-slate-50 text-slate-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg md:text-xl font-bold text-blue-900">
              <Shield className="w-5 h-5 md:w-6 md:h-6" /> Official Document Preview
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 md:p-8 overflow-y-auto max-h-[70vh]">
             <div className="border-l-4 border-blue-900 pl-4 md:pl-6 py-2 bg-blue-50 mb-4 md:mb-6">
                <p className="font-serif italic text-blue-800 text-sm md:text-base">
                   "Justice through Code."
                </p>
             </div>
             
             <p className="text-slate-700 mb-4 md:mb-6 text-xs md:text-base">
                This template is strict, organized, and authoritative. It strips away the graphics in favor of 
                hierarchical data presentation. Perfect for applying to large enterprises or government roles.
             </p>

             <Button onClick={handleDownload} className="w-full bg-blue-900 text-white hover:bg-blue-800 text-sm md:text-base">
                Retrieve Official Record
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}