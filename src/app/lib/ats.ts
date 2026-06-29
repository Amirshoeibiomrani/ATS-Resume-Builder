import type { ATSCheck, ATSReport, ResumeData } from "../types/resume";

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "into",
  "your",
  "you",
  "our",
  "are",
  "is",
  "was",
  "were",
  "will",
  "can",
  "have",
  "has",
  "had",
  "who",
  "what",
  "when",
  "where",
  "why",
  "how",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "as",
  "or",
  "an",
  "a",
  "be",
  "we",
  "us",
  "their",
  "they",
  "them",
  "more",
  "less",
  "using",
  "used",
  "build",
  "building",
  "developer",
  "developers",
  "engineer",
  "engineers",
  "team",
  "teams",
  "years",
  "year",
  "experience",
  "required",
  "preferred",
  "ability",
  "strong",
  "work",
  "working",
  "knowledge",
  "understanding",
  "role",
  "job",
  "plus",
  "etc",
  "از",
  "به",
  "برای",
  "و",
  "در",
  "با",
  "که",
  "این",
  "آن",
  "را",
  "های",
  "یک",
  "توانایی",
  "تجربه",
]);

const TECH_TERMS = [
  "typescript",
  "javascript",
  "react",
  "nextjs",
  "nodejs",
  "express",
  "nestjs",
  "redux",
  "zustand",
  "tailwind",
  "html",
  "css",
  "sass",
  "graphql",
  "rest",
  "api",
  "postgresql",
  "mysql",
  "mongodb",
  "redis",
  "prisma",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "firebase",
  "supabase",
  "linux",
  "git",
  "cicd",
  "jest",
  "cypress",
  "testing",
  "microservices",
  "websocket",
  "rabbitmq",
  "kafka",
  "oauth",
  "jwt",
  "seo",
  "accessibility",
  "performance",
  "python",
  "java",
  "csharp",
  "dotnet",
  "php",
  "laravel",
  "django",
  "flask",
  "fastapi",
  "go",
  "rust",
  "agile",
  "scrum",
  "figma",
];

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeText = (input: string) =>
  input
    .toLowerCase()
    .replace(/next\.?js/g, "nextjs")
    .replace(/node\.?js/g, "nodejs")
    .replace(/react\.?js/g, "react")
    .replace(/ci\/cd/g, "cicd")
    .replace(/c\+\+/g, "cpp")
    .replace(/c#/g, "csharp")
    .replace(/\.net/g, "dotnet")
    .replace(/[^\p{L}\p{N}\s#+.-]/gu, " ");

const countWords = (text: string) =>
  normalizeText(text).split(/\s+/).filter(Boolean).length;

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function buildResumeText(resume: ResumeData) {
  const skillText = resume.skills
    .flatMap((s) => [s.name, ...splitCsv(s.items)])
    .join(" ");

  const experienceText = resume.experience
    .flatMap((exp) => [exp.company, exp.title, exp.location, exp.tech, ...exp.bullets])
    .join(" ");

  const projectText = resume.projects
    .flatMap((project) => [
      project.name,
      project.link,
      project.description,
      project.tech,
      ...project.bullets,
    ])
    .join(" ");

  const educationText = resume.education
    .flatMap((edu) => [edu.school, edu.degree, edu.field])
    .join(" ");

  return [
    resume.basics.fullName,
    resume.basics.title,
    resume.basics.summary,
    skillText,
    experienceText,
    projectText,
    educationText,
  ].join(" ");
}

function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);

  const techMatches = TECH_TERMS.filter((term) => {
    const regex = new RegExp(`(^|\\s)${escapeRegex(term)}(\\s|$)`, "i");
    return regex.test(normalized);
  });

  const frequencies = new Map<string, number>();

  normalized
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        token.length > 1 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    )
    .forEach((token) => {
      frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
    });

  const genericWords = [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .filter((word) => !techMatches.includes(word))
    .slice(0, 18);

  return Array.from(new Set([...techMatches, ...genericWords])).slice(0, 25);
}

export function analyzeATS(resume: ResumeData, jobDescription: string): ATSReport {
  const resumeText = buildResumeText(resume);
  const jdKeywords = extractKeywords(jobDescription);
  const resumeKeywords = new Set(extractKeywords(resumeText));

  const matchedKeywords = jdKeywords.filter((word) => resumeKeywords.has(word));
  const missingKeywords = jdKeywords.filter((word) => !resumeKeywords.has(word));

  const summaryWords = countWords(resume.basics.summary);
  const skillsCount = resume.skills.reduce(
    (sum, skill) => sum + splitCsv(skill.items).length,
    0
  );
  const experienceBullets = resume.experience.reduce(
    (sum, exp) => sum + exp.bullets.filter(Boolean).length,
    0
  );

  const checks: ATSCheck[] = [
    {
      label: "اطلاعات تماس کامل",
      passed: Boolean(
        resume.basics.fullName &&
          resume.basics.title &&
          resume.basics.email &&
          resume.basics.phone
      ),
      points: 15,
      reason: "نام، عنوان شغلی، ایمیل و شماره تماس باید پر باشند.",
    },
    {
      label: "خلاصه حرفه‌ای مناسب",
      passed: summaryWords >= 30 && summaryWords <= 120,
      points: 10,
      reason: "خلاصه خیلی کوتاه یا خیلی بلند برای ATS و Recruiter ایده‌آل نیست.",
    },
    {
      label: "مهارت‌های کافی",
      passed: skillsCount >= 6,
      points: 10,
      reason: "حداقل 6 مهارت مشخص و قابل جستجو بنویس.",
    },
    {
      label: "دستاوردهای شغلی",
      passed: experienceBullets >= 3,
      points: 10,
      reason: "بهتر است برای تجربه‌ها حداقل 3 bullet achievement داشته باشی.",
    },
    {
      label: "نمونه‌کار یا تجربه کافی",
      passed: resume.experience.length + resume.projects.length >= 2,
      points: 10,
      reason: "حداقل 2 آیتم از تجربه کاری یا پروژه داشته باش.",
    },
    {
      label: "تحصیلات",
      passed: resume.education.length >= 1,
      points: 5,
      reason: "بخش Education را خالی نگذار.",
    },
  ];

  const structureScore = checks.reduce(
    (sum, check) => sum + (check.passed ? check.points : 0),
    0
  );

  const coverage = jdKeywords.length
    ? Math.round((matchedKeywords.length / jdKeywords.length) * 100)
    : 0;

  const keywordPoints = jdKeywords.length
    ? Math.round((coverage / 100) * 40)
    : 0;

  const score = Math.min(100, structureScore + keywordPoints);

  const tips: string[] = [];

  if (!jobDescription.trim()) {
    tips.push("برای تحلیل دقیق ATS، متن آگهی شغلی را paste کن.");
  }

  if (summaryWords < 30) {
    tips.push("خلاصه رزومه را کمی کامل‌تر بنویس و تکنولوژی‌های اصلی‌ات را داخلش بیاور.");
  }

  if (skillsCount < 6) {
    tips.push("بخش Skills را با مهارت‌های فنی دقیق‌تر کامل کن.");
  }

  if (coverage < 60 && jobDescription.trim()) {
    tips.push("کلیدواژه‌های مهم آگهی شغلی را در Summary، Skills و Experience اضافه کن.");
  }

  if (missingKeywords.length > 0 && jobDescription.trim()) {
    tips.push(
      `کلیدواژه‌های غایب مهم: ${missingKeywords.slice(0, 8).join(", ")}`
    );
  }

  return {
    score,
    coverage,
    keywords: jdKeywords,
    matchedKeywords,
    missingKeywords,
    checks,
    tips,
  };
}