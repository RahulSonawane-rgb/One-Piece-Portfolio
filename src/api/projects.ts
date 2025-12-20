import api from './api';

// Description: Get all projects
// Endpoint: GET /api/projects
// Request: {}
// Response: { projects: Array<{ id, title, description, image, techStack, liveLink, githubLink }> }
export const getProjectsData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        projects: [
          {
            id: '1',
            title: 'Cafe Buddy Services',
            description: 'Developed a full-stack application with a Node.js backend and responsive web interface for cyber cafe services like PAN card and resume design. Integrated a WhatsApp bot using WhatsApp-Web.js for document submission and order tracking via OpenRouter AI API.',
            image: 'https://i.ibb.co/DPxqvGyM/1752864322877-404129203.png',
            techStack: ['Node.js', 'Express.js', 'SQLite', 'WhatsApp-Web.js', 'Multer', 'Axios'],
            liveLink: 'https://cafebuddy.site',
            githubLink: '#', // No GitHub link provided
          },
          {
            id: '2',
            title: 'Telegram Quiz Bot with AI Chat',
            description: 'Created a Python-based Telegram bot for quizzes (Police Bharti, UPSC) with JSON-stored questions. Integrated Hugging Face InferenceClient for multilingual AI responses and added an auto-sleep feature with robust error handling.',
            image: 'https://i.ibb.co/rGyqd4V1/Gemini-Generated-Image-l0h6ftl0h6ftl0h6.png',
            techStack: ['Python', 'python-telegram-bot', 'Hugging Face', 'JSON', 'asyncio'],
            liveLink: 'https://t.me/GagGoblin_bot',
            githubLink: '#', // No GitHub link provided
          },
          {
            id: '3',
            title: 'Worker Management System',
            description: 'Built a web-based Worker Management System using Google Apps Script, integrated with Google Sheets for data storage. Features include worker management, daily attendance tracking, attendance correction, and custom pay report generation.',
            image: 'https://i.ibb.co/VcBqx03b/Worker-Project.jpg',
            techStack: ['Google Apps Script', 'Google Sheets', 'HTML', 'CSS', 'JavaScript'],
            liveLink: '#', // No live demo link provided
            githubLink: 'https://github.com/RahulSonawane-rgb/google-sheets-worker-app',
          },
        ],
      });
    }, 500);
  });
};