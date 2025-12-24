import { motion } from 'framer-motion';
import { Code2, Puzzle, Sparkles, Lightbulb } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../ui/accordion';

export function BehindTheScenes() {
  const secrets = [
    {
      title: 'The Poneglyph Puzzle System',
      icon: Puzzle,
      content: `The four Poneglyph puzzles you solved weren't just random challenges - they were designed to test different aspects of problem-solving:

🗿 Puzzle 1: Pattern Recognition - Testing your ability to see visual patterns
🗿 Puzzle 2: Logical Deduction - Requiring step-by-step reasoning
🗿 Puzzle 3: Creative Thinking - Demanding outside-the-box solutions
🗿 Puzzle 4: Persistence - The final test of determination

Each puzzle was built using React state management, Canvas API for the ancient text rendering, and cryptographic functions for validation. The "ancient language" you decoded was actually a custom cipher I created specifically for this portfolio.`
    },
    {
      title: 'The Tech Stack Behind the Magic',
      icon: Code2,
      content: `This entire Laugh Tale experience was crafted with:

⚛️ React 18 - For the component architecture
🎨 Tailwind CSS - For responsive styling with the gold/purple theme
✨ Motion (Framer Motion) - For all the smooth animations and transitions
🎯 Three.js - For 3D Poneglyph models (if you saw them rotate!)
🔐 Local Storage - To track your puzzle completion progress
🎵 Web Audio API - For the optional treasure chest sound effects

The entrance animation alone uses 50+ individual motion components working in harmony. The "Roger's laugh" effect you might have heard is synthesized using oscillators!`
    },
    {
      title: 'Easter Eggs You Might Have Missed',
      icon: Sparkles,
      content: `Hidden throughout the portfolio journey:

🏴‍☠️ The floating gold coins count increases as you solve more puzzles
⭐ Star patterns in the background spell "D" in constellation form
🎨 Color scheme transitions from ocean blue → adventure orange → legendary gold
📱 Mobile users get a special "pocket Poneglyph" simplified interface
🎵 Background music BPM increases with each puzzle solved (if sound is on)
🔍 Inspect the page source to find hidden One Piece quotes in comments
👑 The crown icon rotates exactly 1 degree per second (subtle but intentional)

There's also a secret "Laugh" button somewhere on this page... can you find it?`
    },
    {
      title: 'Why One Piece?',
      icon: Lightbulb,
      content: `Beyond being one of the greatest stories ever told, One Piece embodies everything I value as a developer:

🌊 Persistence through challenges (The Grand Line = The coding journey)
🤝 Collaboration (Straw Hat Crew = Development teams)
💡 Creative problem-solving (Devil Fruits = Innovative solutions)
🎯 Clear goals with unexpected paths (Finding One Piece = Building great products)
📚 Continuous learning (Each island = Each new technology)

Plus, the treasure hunt metaphor perfectly captures what portfolios should be: a journey that rewards those who engage deeply, not just those who skim the surface.

By hiding valuable content (these resume templates and code snippets) behind puzzles, I ensure that only dedicated, curious people - the kind I want to work with - will find them.`
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="w-8 h-8 text-yellow-400" />
        <h3 className="text-3xl text-yellow-300" style={{ fontFamily: 'serif' }}>
          Behind the Scenes
        </h3>
      </div>
      <p className="text-amber-50/80 mb-6">
        Discover the technical wizardry and thought process behind the Poneglyph puzzle system.
      </p>

      <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/40 backdrop-blur-sm border-2 border-yellow-600/40 rounded-xl p-6 shadow-2xl">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {secrets.map((secret, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-yellow-600/30 bg-purple-900/20 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                    <secret.icon className="w-5 h-5 text-purple-900" />
                  </div>
                  <span className="text-yellow-300 text-lg">{secret.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-amber-100/80 pt-4 pb-2 leading-relaxed whitespace-pre-line">
                {secret.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-4 bg-purple-900/40 border border-purple-500/30 rounded-lg"
        >
          <p className="text-sm text-amber-100/90 italic">
            💡 <strong className="text-yellow-300">Developer Note:</strong> This entire page (including all animations, 
            components, and the treasure chest opening sequence) was built in a single afternoon fueled by coffee and 
            the determination to create something that would make Oda-sensei proud. The Poneglyph system alone has over 
            1,000 lines of carefully crafted code.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
