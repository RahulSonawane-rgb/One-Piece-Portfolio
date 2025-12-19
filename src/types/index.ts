export interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: string;
  experience: string;
}

export interface SkillsData {
  paramecia: Skill[];
  zoan: Skill[];
  logia: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  bounty: string;
  liveLink: string;
  githubLink: string;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface Internship {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  dateEarned: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
}

export interface AchievementsData {
  internships: Internship[];
  certificates: Certificate[];
}
