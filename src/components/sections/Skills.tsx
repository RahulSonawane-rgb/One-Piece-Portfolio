import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SkillFruit } from '@/components/SkillFruit';
import { getSkillsData } from '@/api/skills';
import { useState, useEffect } from 'react';
import { SkillsData, Skill } from '@/types';
import { Zap, Activity, Flame } from 'lucide-react'; // Icons for the classes

export function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkillsData();
        setSkills(data);
      } catch (error) {
        console.error('Failed to load skills:', error);
      }
    };
    loadSkills();
  }, []);

  if (!skills) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-24 px-4 relative bg-[#f0e6d2]">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border-b-4 border-[#5a3a2a] pb-2 px-8 mb-4">
             <h2 className="text-4xl md:text-6xl font-serif font-black text-[#5a3a2a] uppercase tracking-widest">
               Devil Fruit Arsenal
             </h2>
          </div>
          <p className="text-[#8b6f58] text-xl font-serif italic">
            "I've eaten many fruits to gain these powers..."
          </p>
        </motion.div>

        {/* --- PARAMECIA (Frontend) --- */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8 border-l-8 border-purple-600 pl-4 bg-purple-100/50 py-2 rounded-r-lg">
            <Zap className="w-8 h-8 text-purple-700" />
            <h3 className="text-3xl font-serif font-bold text-purple-900 uppercase tracking-wide">
              Paramecia Class <span className="text-lg opacity-70 normal-case font-mono">(Frontend)</span>
            </h3>
          </div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {skills.paramecia.map((skill: Skill) => (
              <SkillFruit
                key={skill.id}
                skill={skill}
                category="paramecia"
                isSelected={selectedSkill === skill.id}
                onSelect={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* --- ZOAN (Backend) --- */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8 border-l-8 border-red-600 pl-4 bg-red-100/50 py-2 rounded-r-lg">
            <Activity className="w-8 h-8 text-red-700" />
            <h3 className="text-3xl font-serif font-bold text-red-900 uppercase tracking-wide">
              Zoan Class <span className="text-lg opacity-70 normal-case font-mono">(Backend)</span>
            </h3>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {skills.zoan.map((skill: Skill) => (
              <SkillFruit
                key={skill.id}
                skill={skill}
                category="zoan"
                isSelected={selectedSkill === skill.id}
                onSelect={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* --- LOGIA (Tools/DevOps) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8 border-l-8 border-blue-500 pl-4 bg-blue-100/50 py-2 rounded-r-lg">
            <Flame className="w-8 h-8 text-blue-600" />
            <h3 className="text-3xl font-serif font-bold text-blue-900 uppercase tracking-wide">
              Logia Class <span className="text-lg opacity-70 normal-case font-mono">(Tools & DevOps)</span>
            </h3>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {skills.logia.map((skill: Skill) => (
              <SkillFruit
                key={skill.id}
                skill={skill}
                category="logia"
                isSelected={selectedSkill === skill.id}
                onSelect={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
              />
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}