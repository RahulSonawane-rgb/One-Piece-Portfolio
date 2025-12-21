import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SkillFruit } from '@/components/SkillFruit';
import { getSkillsData } from '@/api/skills';
import { useState, useEffect } from 'react';
import { SkillsData, Skill } from '@/types';

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    getSkillsData().then(setSkills);
  }, []);

  if (!skills) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const fruitVariants = {
    hidden: { opacity: 0, scale: 0, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    }
  };

  return (
    <section id="skills" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2] overflow-hidden">
      
      {/* Background: Map Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(90,58,42,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(90,58,42,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* HEADER */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
           <div className="inline-block border-b-4 border-[#5a3a2a] pb-2 px-8 mb-4">
             <h2 className="text-4xl md:text-6xl font-serif font-black text-[#5a3a2a] uppercase tracking-widest">
               Devil Fruit Arsenal
             </h2>
          </div>
          <p className="text-[#8b6f58] text-xl font-serif italic">
            "I've eaten many fruits to <span className="text-[#d92121] font-bold"> Gain these powers...</span>"
          </p>
        </motion.div>

        {/* --- CATEGORIZED DISPLAY CASES --- */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl py-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {Object.entries(skills).map(([cat, catSkills]: [string, Skill[]]) => {
            const category = cat as 'paramecia' | 'zoan' | 'logia';
            const catDisplay = cat.charAt(0).toUpperCase() + cat.slice(1);
            const borderColor = category === 'paramecia' ? 'border-violet-500' : category === 'zoan' ? 'border-red-500' : 'border-cyan-500';
            const textColor = category === 'paramecia' ? 'text-violet-800' : category === 'zoan' ? 'text-red-800' : 'text-cyan-800';

            return (
              <motion.div 
                key={cat}
                className="flex flex-col items-center bg-white/30 backdrop-blur-sm rounded-xl p-8 border-2 border-[#5a3a2a]/20 shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6 }
                  }
                }}
              >
                <h3 className={`text-2xl md:text-3xl font-serif font-bold mb-8 pb-3 ${borderColor} ${textColor} border-b-2`}>
                  {catDisplay} Powers
                </h3>
                <motion.div 
                  className="flex flex-wrap justify-center gap-6"
                  variants={containerVariants}
                >
                  {catSkills.map((skill) => (
                    <motion.div 
                      key={skill.id}
                      variants={fruitVariants}
                    >
                      <SkillFruit 
                        skill={skill} 
                        category={category} 
                        isSelected={selectedSkill === skill.id} 
                        onSelect={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)} 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}