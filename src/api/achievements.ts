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
            company: 'Tech Startup Inc',
            position: 'Full Stack Developer Intern',
            duration: 'June 2022 - August 2022',
            description: 'Developed and maintained full-stack web applications using React and Node.js. Collaborated with senior developers to implement new features and fix bugs.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            achievements: [
              'Built 3 new features that improved user engagement by 25%',
              'Reduced API response time by 40% through optimization',
              'Mentored 2 junior developers on best practices',
            ],
          },
          {
            id: '2',
            company: 'Digital Agency Pro',
            position: 'Frontend Developer Intern',
            duration: 'January 2023 - March 2023',
            description: 'Created responsive web interfaces for various client projects. Implemented pixel-perfect designs and ensured cross-browser compatibility.',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
            achievements: [
              'Delivered 5 client projects on time and within budget',
              'Improved website performance score from 65 to 95',
              'Implemented accessibility standards (WCAG 2.1)',
            ],
          },
          {
            id: '3',
            company: 'Cloud Solutions Ltd',
            position: 'Backend Developer Intern',
            duration: 'July 2023 - September 2023',
            description: 'Developed RESTful APIs and microservices. Worked with cloud infrastructure and database optimization.',
            technologies: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
            achievements: [
              'Designed and implemented 8 new API endpoints',
              'Set up CI/CD pipeline reducing deployment time by 60%',
              'Optimized database queries improving performance by 35%',
            ],
          },
        ],
        certificates: [
          {
            id: '1',
            name: 'Full Stack Web Development',
            organization: 'Udemy',
            dateEarned: 'March 2022',
            credentialId: 'UC-12345678',
            credentialUrl: 'https://udemy.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '2',
            name: 'React Advanced Patterns',
            organization: 'Frontend Masters',
            dateEarned: 'June 2022',
            credentialId: 'FM-87654321',
            credentialUrl: 'https://frontendmasters.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '3',
            name: 'AWS Certified Cloud Practitioner',
            organization: 'Amazon Web Services',
            dateEarned: 'September 2022',
            credentialId: 'AWS-11223344',
            credentialUrl: 'https://aws.amazon.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '4',
            name: 'TypeScript Mastery',
            organization: 'Scrimba',
            dateEarned: 'December 2022',
            credentialId: 'SCRIMBA-55667788',
            credentialUrl: 'https://scrimba.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '5',
            name: 'Node.js & Express Complete Guide',
            organization: 'Udemy',
            dateEarned: 'February 2023',
            credentialId: 'UC-99887766',
            credentialUrl: 'https://udemy.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '6',
            name: 'Docker & Kubernetes',
            organization: 'Linux Academy',
            dateEarned: 'May 2023',
            credentialId: 'LA-44332211',
            credentialUrl: 'https://linuxacademy.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '7',
            name: 'Web Performance Optimization',
            organization: 'Pluralsight',
            dateEarned: 'July 2023',
            credentialId: 'PS-77665544',
            credentialUrl: 'https://pluralsight.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
          {
            id: '8',
            name: 'GraphQL Complete Guide',
            organization: 'Udemy',
            dateEarned: 'September 2023',
            credentialId: 'UC-33445566',
            credentialUrl: 'https://udemy.com',
            image: 'https://placehold.co/400x300/fbbf24/1e293b?text=Certificate',
          },
        ],
      });
    }, 500);
  });
};