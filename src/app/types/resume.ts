export interface Basics {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  tech: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
  tech: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string;
}

export interface ResumeData {
  basics: Basics;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export interface ATSCheck {
  label: string;
  passed: boolean;
  points: number;
  reason?: string;
}

export interface ATSReport {
  score: number;
  coverage: number;
  keywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  checks: ATSCheck[];
  tips: string[];
}