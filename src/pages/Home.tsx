import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import OnePieceSection from '@/components/sections/OnePieceSection';
import { LegacyLog } from '@/components/sections/LegacyLog';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <About />
      <Skills />
      <OnePieceSection />
      <LegacyLog />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}