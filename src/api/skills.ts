import api from './api';

// Description: Get all skills organized by category (Paramecia, Zoan, Logia)
// Endpoint: GET /api/skills
// Request: {}
// Response: { paramecia: Array, zoan: Array, logia: Array }
export const getSkillsData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        paramecia: [
          { id: '1', name: 'ReactJS', icon: '⚛️', proficiency: 'Advanced', experience: '1+ year' },
          { id: '2', name: 'HTML5', icon: '🌐', proficiency: 'Expert', experience: '2+ years' },
          { id: '3', name: 'CSS3', icon: '🎨', proficiency: 'Expert', experience: '2+ years' },
          { id: '4', name: 'JavaScript', icon: '⚡', proficiency: 'Advanced', experience: '2+ years' },
          { id: '5', name: 'GSAP', icon: '✨', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '6', name: 'Typed.js', icon: '⌨️', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '7', name: 'Responsive Design', icon: '📱', proficiency: 'Advanced', experience: '2+ years' },
          { id: '8', name: 'pdfjsLib', icon: '📄', proficiency: 'Intermediate', experience: '6+ months' },
        ],
        zoan: [
          { id: '9', name: 'Node.js', icon: '🟢', proficiency: 'Advanced', experience: '2+ years' },
          { id: '10', name: 'Express.js', icon: '🚂', proficiency: 'Advanced', experience: '2+ years' },
          { id: '11', name: 'Python', icon: '🐍', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '12', name: 'C++', icon: '⚙️', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '13', name: 'Odoo Development', icon: '📊', proficiency: 'Intermediate', experience: '3+ months' }, // Added from Internship
          { id: '14', name: 'SQL / MySQL', icon: '🐬', proficiency: 'Advanced', experience: '2+ years' },
          { id: '15', name: 'SQLite', icon: '🗄️', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '16', name: 'DSA', icon: '🧠', proficiency: 'Intermediate', experience: '1+ year' },
        ],
        logia: [
          { id: '17', name: 'Google Apps Script', icon: '📜', proficiency: 'Advanced', experience: '1+ year' },
          { id: '18', name: 'Hugging Face AI', icon: '🤖', proficiency: 'Intermediate', experience: '6+ months' },
          { id: '19', name: 'WhatsApp-Web.js', icon: '💬', proficiency: 'Advanced', experience: '1+ year' },
          { id: '20', name: 'Telegram Bot API', icon: '✈️', proficiency: 'Advanced', experience: '1+ year' },
          { id: '21', name: 'REST API', icon: '🔌', proficiency: 'Advanced', experience: '2+ years' },
          { id: '22', name: 'Authentication', icon: '🔒', proficiency: 'Intermediate', experience: '1+ year' },
          { id: '23', name: 'File Handling', icon: '📂', proficiency: 'Advanced', experience: '2+ years' },
          { id: '24', name: 'Module Integration', icon: '🧩', proficiency: 'Intermediate', experience: '6+ months' }, // Added from Internship
        ],
      });
    }, 500);
  });
};