import api from './api';

// Description: Get all projects
// Endpoint: GET /api/projects
// Request: {}
// Response: { projects: Array<{ id, title, description, image, techStack, bounty, liveLink, githubLink }> }
export const getProjectsData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        projects: [
          {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with product catalog, shopping cart, and payment integration.',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
            techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            bounty: '50,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
          {
            id: '2',
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates and team collaboration features.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
            techStack: ['React', 'Firebase', 'Tailwind CSS'],
            bounty: '35,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
          {
            id: '3',
            title: 'Social Media Dashboard',
            description: 'Analytics dashboard for managing multiple social media accounts with real-time metrics and insights.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
            techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
            bounty: '45,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
          {
            id: '4',
            title: 'AI Chat Application',
            description: 'Real-time chat application powered by AI with natural language processing and intelligent responses.',
            image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?w=500&h=300&fit=crop',
            techStack: ['React', 'Node.js', 'OpenAI API', 'Socket.io'],
            bounty: '60,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
          {
            id: '5',
            title: 'Fitness Tracking App',
            description: 'Mobile-first fitness tracking application with workout logging, progress tracking, and social features.',
            image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=300&fit=crop',
            techStack: ['React Native', 'Firebase', 'Redux'],
            bounty: '40,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
          {
            id: '6',
            title: 'Content Management System',
            description: 'Headless CMS with powerful content management, version control, and multi-language support.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
            techStack: ['Next.js', 'GraphQL', 'MongoDB', 'AWS'],
            bounty: '55,000',
            liveLink: 'https://example.com',
            githubLink: 'https://github.com',
          },
        ],
      });
    }, 500);
  });
};