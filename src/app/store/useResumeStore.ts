"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultResume } from "../lib/defaultResume";
import type {
  Basics,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  ResumeData,
  SkillCategory,
} from "../types/resume";

type ResumeState = {
  resume: ResumeData;

  setBasics: (patch: Partial<Basics>) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addExperienceBullet: (id: string) => void;
  updateExperienceBullet: (id: string, index: number, value: string) => void;
  removeExperienceBullet: (id: string, index: number) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addProjectBullet: (id: string) => void;
  updateProjectBullet: (id: string, index: number, value: string) => void;
  removeProjectBullet: (id: string, index: number) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addSkillCategory: () => void;
  updateSkillCategory: (id: string, patch: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;

  importResume: (data: ResumeData) => void;
  resetResume: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const emptyExperience = (): ExperienceItem => ({
  id: uid(),
  company: "",
  location: "",
  title: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
  tech: "",
});

const emptyProject = (): ProjectItem => ({
  id: uid(),
  name: "",
  link: "",
  description: "",
  bullets: [""],
  tech: "",
});

const emptyEducation = (): EducationItem => ({
  id: uid(),
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

const emptySkillCategory = (): SkillCategory => ({
  id: uid(),
  name: "",
  items: "",
});

const keepAtLeastOne = (items: string[]) => (items.length ? items : [""]);

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: defaultResume,

      setBasics: (patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            basics: { ...state.resume.basics, ...patch },
          },
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [...state.resume.experience, emptyExperience()],
          },
        })),

      updateExperience: (id, patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((item) => item.id !== id),
          },
        })),

      addExperienceBullet: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((item) =>
              item.id === id ? { ...item, bullets: [...item.bullets, ""] } : item
            ),
          },
        })),

      updateExperienceBullet: (id, index, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((item) =>
              item.id === id
                ? {
                    ...item,
                    bullets: item.bullets.map((bullet, i) =>
                      i === index ? value : bullet
                    ),
                  }
                : item
            ),
          },
        })),

      removeExperienceBullet: (id, index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((item) =>
              item.id === id
                ? {
                    ...item,
                    bullets: keepAtLeastOne(
                      item.bullets.filter((_, i) => i !== index)
                    ),
                  }
                : item
            ),
          },
        })),

      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, emptyProject()],
          },
        })),

      updateProject: (id, patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((item) => item.id !== id),
          },
        })),

      addProjectBullet: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id ? { ...item, bullets: [...item.bullets, ""] } : item
            ),
          },
        })),

      updateProjectBullet: (id, index, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id
                ? {
                    ...item,
                    bullets: item.bullets.map((bullet, i) =>
                      i === index ? value : bullet
                    ),
                  }
                : item
            ),
          },
        })),

      removeProjectBullet: (id, index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id
                ? {
                    ...item,
                    bullets: keepAtLeastOne(
                      item.bullets.filter((_, i) => i !== index)
                    ),
                  }
                : item
            ),
          },
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [...state.resume.education, emptyEducation()],
          },
        })),

      updateEducation: (id, patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((item) => item.id !== id),
          },
        })),

      addSkillCategory: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [...state.resume.skills, emptySkillCategory()],
          },
        })),

      updateSkillCategory: (id, patch) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),

      removeSkillCategory: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((item) => item.id !== id),
          },
        })),

      importResume: (data) =>
        set(() => ({
          resume: data,
        })),

      resetResume: () =>
        set(() => ({
          resume: defaultResume,
        })),
    }),
    {
      name: "ats-resume-builder",
      storage: createJSONStorage(() => localStorage),
    }
  )
);