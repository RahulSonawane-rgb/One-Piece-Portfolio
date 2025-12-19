import api from './api';

// Description: Get all skills organized by category
// Endpoint: GET /api/skills
// Request: {}
// Response: { paramecia: Array, zoan: Array, logia: Array }
export const getSkillsData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        paramecia: [
          { id: '1', name: 'React', icon: '⚛️', proficiency: 'Expert', experience: '3+ years' },
          { id: '2', name: 'TypeScript', icon: '📘', proficiency: 'Expert', experience: '2+ years' },
          { id: '3', name: 'Tailwind CSS', icon: '🎨', proficiency: 'Expert', experience: '2+ years' },
          { id: '4', name: 'Framer Motion', icon: '✨', proficiency: 'Advanced', experience: '1+ year' },
          { id: '5', name: 'Next.js', icon: '▲', proficiency: 'Advanced', experience: '1+ year' },
          { id: '6', name: 'Vue.js', icon: '💚', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '7', name: 'HTML/CSS', icon: '🌐', proficiency: 'Expert', experience: '4+ years' },
          { id: '8', name: 'JavaScript', icon: '⚡', proficiency: 'Expert', experience: '4+ years' },
        ],
        zoan: [
          { id: '9', name: 'Node.js', icon: '🟢', proficiency: 'Expert', experience: '3+ years' },
          { id: '10', name: 'Express.js', icon: '🚂', proficiency: 'Expert', experience: '3+ years' },
          { id: '11', name: 'MongoDB', icon: '🍃', proficiency: 'Advanced', experience: '2+ years' },
          { id: '12', name: 'PostgreSQL', icon: '🐘', proficiency: 'Advanced', experience: '2+ years' },
          { id: '13', name: 'Python', icon: '🐍', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '14', name: 'REST APIs', icon: '🔌', proficiency: 'Expert', experience: '3+ years' },
          { id: '15', name: 'GraphQL', icon: '📊', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '16', name: 'Firebase', icon: '🔥', proficiency: 'Intermediate', experience: '1+ year' },
        ],
        logia: [
          { id: '17', name: 'Git', icon: '🌳', proficiency: 'Expert', experience: '4+ years' },
          { id: '18', name: 'Docker', icon: '🐳', proficiency: 'Advanced', experience: '1+ year' },
          { id: '19', name: 'AWS', icon: '☁️', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '20', name: 'CI/CD', icon: '🔄', proficiency: 'Advanced', experience: '1+ year' },
          { id: '21', name: 'Linux', icon: '🐧', proficiency: 'Advanced', experience: '2+ years' },
          { id: '22', name: 'Webpack', icon: '📦', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '23', name: 'Vite', icon: '⚡', proficiency: 'Advanced', experience: '1+ year' },
          { id: '24', name: 'Testing', icon: '✅', proficiency: 'Intermediate', experience: '1+ year' },
        ],
      });
    }, 500);
  });
};