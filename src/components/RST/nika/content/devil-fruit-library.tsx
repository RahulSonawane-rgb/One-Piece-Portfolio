import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, Sparkles, Eye, Terminal, Filter, Zap, Layout, Box } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Flame, RefreshCcw, Shield, Menu, X } from 'lucide-react';

// ==========================================
// 1. COMPONENT DEFINITIONS (Live Demos)
// ==========================================

// --- FRUIT 1: GUM-GUM BUTTON (Bouncy UI) ---
const GumGumButton = () => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
    whileTap={{ scale: 0.9, borderRadius: "100%" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="px-8 py-3 bg-red-600 text-white font-black tracking-wider rounded-lg shadow-[0_5px_0_rgb(153,27,27)] active:shadow-none active:translate-y-[5px]"
  >
    GOMU GOMU NO...
  </motion.button>
);
const gumGumCode = `// 🟢 Gum-Gum Button (Bouncy Interaction)
import { motion } from 'framer-motion';

export const GumGumButton = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9, borderRadius: "100%" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="px-8 py-3 bg-red-600 text-white font-black rounded-lg 
               shadow-[0_5px_0_rgb(153,27,27)] active:shadow-none 
               active:translate-y-[5px]"
  >
    CLICK ME!
  </motion.button>
);`;

// --- FRUIT 2: LOGIA LOADER (Particle Animation) ---
const LogiaLoader = () => (
  <div className="relative w-16 h-16 flex items-center justify-center bg-black/20 rounded-full">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute inset-0 rounded-full border-t-4 border-orange-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5 - i * 0.2, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 1 - i * 0.3, scale: 1 - i * 0.1 }}
      />
    ))}
    <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
  </div>
);
const logiaCode = `// 🔥 Logia Loader (Elemental Spinner)
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export const LogiaLoader = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute inset-0 rounded-full border-t-4 border-orange-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5 - i*0.2, repeat: Infinity, ease: "linear" }}
      />
    ))}
    <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
  </div>
);`;

// --- FRUIT 3: BARI-BARI MODAL (Barrier UI) ---
const BariBariModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-32 w-full flex items-center justify-center">
      <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 z-10">
        {isOpen ? "Close Barrier" : "Cast Barrier"}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-green-500/20 backdrop-blur-sm border-2 border-green-400 rounded-xl flex items-center justify-center"
            style={{ backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(74, 222, 128, 0.1) 25%, rgba(74, 222, 128, 0.1) 50%, transparent 50%, transparent 75%, rgba(74, 222, 128, 0.1) 75%, rgba(74, 222, 128, 0.1) 100%)', backgroundSize: '20px 20px' }}
          >
            <Shield className="w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const bariCode = `// 🛡️ Bari-Bari Modal (Protective Overlay)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BariBariModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Barrier</button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-green-500/20 border-2 border-green-400 backdrop-blur-sm"
          >
             Barrier Active
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

// --- FRUIT 4: OPE-OPE MENU (Floating Action Button) ---
const OpeOpeMenu = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Room Circle */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-32 h-32 rounded-full border border-cyan-400/30 bg-cyan-400/10 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Floating Buttons */}
      <AnimatePresence>
        {active && [0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: Math.cos(deg * Math.PI / 180) * 45, 
              y: Math.sin(deg * Math.PI / 180) * 45, 
              opacity: 1 
            }}
            exit={{ x: 0, y: 0, opacity: 0 }}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"
          />
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setActive(!active)}
        whileTap={{ scale: 0.9 }}
        className="relative z-10 w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/50"
      >
        {active ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
      <span className="absolute -bottom-6 text-[10px] text-cyan-300 font-mono">{active ? "ROOM: ACTIVE" : "ROOM: OFF"}</span>
    </div>
  );
};
const opeCode = `// 💠 Ope-Ope Menu (Floating Action Button)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OpeOpeMenu = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      {/* The "Room" Field */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="absolute w-32 h-32 rounded-full bg-cyan-400/10 border border-cyan-400/30"
          />
        )}
      </AnimatePresence>

      {/* Main Toggle */}
      <motion.button
        onClick={() => setActive(!active)}
        className="w-12 h-12 bg-cyan-600 rounded-full text-white z-10"
      >
        {active ? "Close" : "Room"}
      </motion.button>
    </div>
  );
};`;


// ==========================================
// 2. MAIN LIBRARY COMPONENT
// ==========================================

export function DevilFruitLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, 'preview' | 'code'>>({});
  const [filter, setFilter] = useState<'ALL' | 'PARAMECIA' | 'LOGIA' | 'SPECIAL'>('ALL');

  const toggleTab = (id: string, tab: 'preview' | 'code') => {
    setActiveTab(prev => ({ ...prev, [id]: tab }));
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fruits = [
    { id: 'gum', name: 'Gum-Gum Button', type: 'PARAMECIA', icon: Layout, color: 'from-red-500 to-pink-500', desc: 'Elastic interaction feedback for CTAs.', component: <GumGumButton />, code: gumGumCode },
    { id: 'logia', name: 'Logia Loader', type: 'LOGIA', icon: Zap, color: 'from-orange-500 to-red-600', desc: 'Elemental particle loading state.', component: <LogiaLoader />, code: logiaCode },
    { id: 'bari', name: 'Bari-Bari Modal', type: 'PARAMECIA', icon: Shield, color: 'from-green-500 to-emerald-600', desc: 'Indestructible defensive overlay.', component: <BariBariModal />, code: bariCode },
    { id: 'ope', name: 'Ope-Ope Menu', type: 'SPECIAL', icon: Box, color: 'from-cyan-500 to-blue-600', desc: 'Spatial manipulation navigation.', component: <OpeOpeMenu />, code: opeCode },
  ];

  const filteredFruits = filter === 'ALL' ? fruits : fruits.filter(f => f.type === filter);

  return (
    <div className="relative w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-purple-900/50 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400 font-black tracking-tight" style={{ fontFamily: 'serif' }}>
                Devil Fruit Lab
              </h3>
              <p className="text-purple-300/60 text-sm font-mono tracking-widest mt-1">
                EXPERIMENTAL COMPONENT SYSTEM v4.0
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-purple-500/20">
          {['ALL', 'PARAMECIA', 'LOGIA', 'SPECIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${filter === f ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300/50 hover:text-purple-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredFruits.map((fruit) => {
            const isCodeMode = activeTab[fruit.id] === 'code';

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={fruit.id}
                className="group bg-[#0f0718] border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full hover:border-purple-500/40 transition-colors"
              >
                {/* Card Header */}
                <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-[#1a1025]">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${fruit.color} flex items-center justify-center shadow-lg`}>
                        <fruit.icon className="w-5 h-5 text-white mix-blend-overlay" />
                     </div>
                     <div>
                        <h4 className="text-base font-bold text-white">{fruit.name}</h4>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{fruit.type} TYPE</span>
                     </div>
                  </div>
                  
                  {/* View Toggle */}
                  <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                     <button 
                       onClick={() => toggleTab(fruit.id, 'preview')}
                       className={`px-3 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold transition-all ${!isCodeMode ? 'bg-purple-600 text-white shadow' : 'text-white/40 hover:text-white'}`}
                     >
                       <Eye className="w-3 h-3" /> PREVIEW
                     </button>
                     <button 
                       onClick={() => toggleTab(fruit.id, 'code')}
                       className={`px-3 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold transition-all ${isCodeMode ? 'bg-purple-600 text-white shadow' : 'text-white/40 hover:text-white'}`}
                     >
                       <Terminal className="w-3 h-3" /> CODE
                     </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 relative bg-black/60 min-h-[240px] flex flex-col">
                   <AnimatePresence mode="wait">
                      {!isCodeMode ? (
                        // PREVIEW MODE
                        <motion.div 
                          key="preview"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col"
                        >
                           {/* The Playground Area */}
                           <div className="flex-1 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                             {fruit.component}
                           </div>
                           
                           {/* Description Footer */}
                           <div className="p-3 bg-[#130b1f] border-t border-white/5 text-center">
                              <p className="text-xs text-purple-200/50 font-mono">{fruit.desc}</p>
                           </div>
                        </motion.div>
                      ) : (
                        // CODE MODE
                        <motion.div 
                          key="code"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col bg-[#0d0d0d]"
                        >
                           <div className="flex-1 overflow-auto custom-scrollbar p-4">
                              <code className="text-[11px] font-mono text-emerald-400 whitespace-pre leading-relaxed">
                                 {fruit.code}
                              </code>
                           </div>
                           <div className="p-3 border-t border-white/10 bg-[#160b25]">
                              <Button
                                onClick={() => handleCopy(fruit.code, fruit.id)}
                                className={`w-full h-9 text-xs font-bold uppercase tracking-wider ${copiedId === fruit.id ? 'bg-green-600 hover:bg-green-600' : 'bg-purple-900/50 hover:bg-purple-800 text-purple-200'}`}
                              >
                                {copiedId === fruit.id ? <><Check className="w-4 h-4 mr-2"/> Copied to Clipboard</> : <><Copy className="w-4 h-4 mr-2"/> Copy Source Code</>}
                              </Button>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Call to Action for More Code */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 text-center relative overflow-hidden">
         <div className="relative z-10">
           <h4 className="text-xl font-bold text-purple-100 mb-2">Need a specific Devil Fruit power?</h4>
           <p className="text-sm text-purple-200/60 mb-4">I can forge custom components for your crew.</p>
           <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
             Request Component via Den Den Mushi
           </Button>
         </div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      </div>
    </div>
  );
}