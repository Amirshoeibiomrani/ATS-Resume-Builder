import type { ResumeData } from "../types/resume";

export const defaultResume: ResumeData = {
  basics: {
    fullName: "Your Name",
    title: "Full-Stack Developer",
    email: "you@example.com",
    phone: "+98 912 000 0000",
    location: "Tehran, Iran",
    website: "https://yourwebsite.dev",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    summary:
      "Full-stack developer with 4+ years of experience building scalable web applications using TypeScript, React, Next.js, Node.js, and SQL/NoSQL databases. Strong background in performance optimization, reusable component architecture, and shipping user-focused products in agile teams.",
  },
  skills: [
    {
      id: "skill-1",
      name: "Frontend",
      items: "TypeScript, React, Next.js, Tailwind CSS, Zustand",
    },
    {
      id: "skill-2",
      name: "Backend",
      items: "Node.js, REST API, PostgreSQL, Prisma, Redis",
    },
    {
      id: "skill-3",
      name: "Tools",
      items: "Git, Docker, CI/CD, Linux, Jest",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Acme Tech",
      location: "Tehran",
      title: "Senior Frontend Developer",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      bullets: [
        "Built a reusable component system that reduced feature delivery time by 30%.",
        "Improved Lighthouse performance score from 68 to 95 across core product pages.",
        "Collaborated with backend and product teams to ship dashboard features used by 20k+ monthly users.",
      ],
      tech: "TypeScript, React, Next.js, Tailwind CSS, REST API",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "ATS Resume Builder",
      link: "https://example.com",
      description:
        "A resume builder with live preview, JSON backup, ATS checks, and PDF export.",
      bullets: [
        "Implemented editable resume sections with local persistence using Zustand.",
        "Added keyword matching against job descriptions to improve ATS alignment.",
        "Generated ATS-friendly PDF output through print styles and browser PDF export.",
      ],
      tech: "Next.js, TypeScript, Zustand, react-to-print",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "University Name",
      degree: "B.Sc.",
      field: "Computer Engineering",
      startDate: "2018",
      endDate: "2022",
    },
  ],
};