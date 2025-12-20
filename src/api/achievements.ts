import api from './api';

// Description: Get internships and certificates
// Endpoint: GET /api/achievements
// Request: {}
// Response: { internships: Array, certificates: Array }
export const getAchievementsData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        internships: [
          {
            id: '1',
            company: 'Indu Computers (InduDirect.com)',
            position: 'Software Development Engineer (Intern)',
            duration: 'August 6, 2025 - November 6, 2025',
            location: 'Jalgaon, Maharashtra',
            description: 'Completed a focused internship involving the development of custom Odoo modules. Contributed to feature design, backend logic, module integration, and testing.',
            technologies: ['Odoo', 'Python', 'PostgreSQL', 'Module Integration', 'Backend Logic'],
            achievements: [
              'Developed custom Odoo modules contributing to feature design and backend logic',
              'Supported system enhancements for operational workflows',
              'Improved automation for internal business processes',
              'Demonstrated independent execution of assigned development tasks',
            ],
          },
        ],
        certificates: [
          {
            id: 1,
            name: 'Decode DSA with C++',
            organization: 'PW Skills',
            dateEarned: 'November 20, 2024',
            credentialId: null,
            credentialUrl: 'https://cdn.pwskills.com/learn/certificates/f6863345-6157-40fb-9554-bd00d0d600ed.pdf',
            image: 'https://i.ibb.co/ymLX7ZXw/PW-Skill.png',
            description: 'Successfully completed an intensive Data Structures and Algorithms program using C++. Developed a deep understanding of algorithmic complexity, recursion, and advanced data structures like Trees, Graphs, and Heaps.'
          },
          {
            id: 2,
            name: 'Structured Query Language (SQL) Hindi',
            organization: 'MindLuster',
            dateEarned: 'March 19, 2025',
            credentialId: null,
            credentialUrl: 'https://www.mindluster.com/certified/download_pdf/9bd23379',
            image: 'https://www.mindluster.com/storage/cer/9bd23379.jpg',
            description: 'Mastered database fundamentals including CRUD operations, complex joins, aggregate functions, and subqueries. Gained hands-on experience in managing relational databases.'
          },
          {
            id: 3,
            name: 'React JS for Beginners',
            organization: 'MindLuster',
            dateEarned: 'July 4, 2025',
            credentialId: null,
            credentialUrl: 'https://www.mindluster.com/certified/download_pdf/78235add',
            image: 'https://www.mindluster.com/storage/cer/78235add.jpg',
            description: 'Gained proficiency in creating reusable components, managing state, and handling events, with hands-on experience in developing modern web applications.'
          },
          {
            id: 4,
            name: 'HTML and HTML5 Hindi',
            organization: 'MindLuster',
            dateEarned: 'July 31, 2025',
            credentialId: null,
            credentialUrl: 'https://www.mindluster.com/certified/download_pdf/b86f0924',
            image: 'https://www.mindluster.com/storage/cer/b86f0924.jpg',
            description: 'Gained expertise in creating structured, semantic web content, utilizing HTML5 features for multimedia, forms, and responsive design.'
          }
        ],
      });
    }, 500);
  });
};