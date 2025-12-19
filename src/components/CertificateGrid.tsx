import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Award, ExternalLink, Scroll } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Certificate {
  id: string;
  name: string;
  organization: string;
  dateEarned: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
}

interface CertificateGridProps {
  certificates: Certificate[];
}

export function CertificateGrid({ certificates }: CertificateGridProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="flex flex-col items-center"
            onClick={() => setSelectedCertificate(cert)}
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* --- THE COIN --- */}
              <div className="w-32 h-32 rounded-full relative shadow-[0px_10px_20px_rgba(0,0,0,0.4)] transition-shadow duration-300 group-hover:shadow-[0px_0px_30px_rgba(212,160,23,0.6)]">
                
                {/* 1. Outer Gold Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4a017] via-[#8b6f58] to-[#d4a017] border-4 border-[#5a3a2a]"></div>
                
                {/* 2. Inner Inset (The Stamped Area) */}
                <div className="absolute inset-2 rounded-full bg-[#f0e6d2] border-2 border-[#5a3a2a] flex items-center justify-center overflow-hidden">
                   {/* Background Star Pattern */}
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#5a3a2a_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
                   
                   {/* Center Icon */}
                   <div className="relative z-10 flex flex-col items-center justify-center text-center p-1">
                      <Award className="w-8 h-8 text-[#d92121] drop-shadow-sm mb-1" />
                      <p className="text-[10px] font-serif font-black uppercase text-[#5a3a2a] leading-tight line-clamp-2">
                        {cert.organization}
                      </p>
                   </div>
                </div>

                {/* 3. Shine Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Label below coin */}
            <div className="mt-4 text-center">
              <h4 className="text-[#5a3a2a] font-serif font-bold text-sm leading-tight group-hover:text-[#d92121] transition-colors">
                {cert.name}
              </h4>
              <p className="text-xs text-[#8b6f58] mt-1 italic">{cert.dateEarned}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- TREASURE CHEST MODAL --- */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="bg-[#2a1a0a] border-4 border-[#d4a017] text-[#f0e6d2] max-w-2xl shadow-2xl p-0 overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-[#d4a017] p-4 flex items-center gap-3 border-b-4 border-[#5a3a2a]">
             <Scroll className="w-6 h-6 text-[#2a1a0a]" />
             <DialogTitle className="text-[#2a1a0a] font-serif font-black uppercase tracking-widest text-xl">
               Treasure Found
             </DialogTitle>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <DialogHeader className="hidden">
               {/* Hidden for accessibility, visual header is above */}
               <DialogDescription>{selectedCertificate?.name}</DialogDescription>
            </DialogHeader>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-serif font-bold text-[#d4a017]">{selectedCertificate?.name}</h3>
              <p className="text-[#f0e6d2]/70 font-mono text-sm uppercase tracking-widest">
                Issued by: {selectedCertificate?.organization}
              </p>
            </div>

            {selectedCertificate?.image && (
              <div className="relative p-2 bg-[#f0e6d2] rounded border-2 border-[#8b6f58] shadow-inner rotate-1 transform hover:rotate-0 transition-transform duration-500">
                {/* "Corner Tape" Visuals */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#d92121]/80 rotate-45 shadow-sm z-10"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#d92121]/80 rotate-45 shadow-sm z-10"></div>
                
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="w-full rounded border border-[#5a3a2a]/20"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm font-mono border-t border-[#d4a017]/30 pt-4 mt-4">
              <div>
                <p className="text-[#d4a017]">Date Acquired</p>
                <p className="text-[#f0e6d2]">{selectedCertificate?.dateEarned}</p>
              </div>
              {selectedCertificate?.credentialId && (
                <div>
                  <p className="text-[#d4a017]">ID Number</p>
                  <p className="text-[#f0e6d2] truncate" title={selectedCertificate.credentialId}>
                    {selectedCertificate.credentialId}
                  </p>
                </div>
              )}
            </div>

            {selectedCertificate?.credentialUrl && (
              <div className="pt-2">
                <Button 
                   className="w-full bg-[#d4a017] hover:bg-[#b8860b] text-[#2a1a0a] font-bold border-2 border-[#5a3a2a]"
                   onClick={() => window.open(selectedCertificate.credentialUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Inspect Original Document
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}