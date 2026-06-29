"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useResumeStore } from "../store/useResumeStore";

const btn =
  "rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50";
const btnDanger =
  "rounded-xl border border-rose-300 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50";
const btnPrimary =
  "rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800";

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
      />
    </label>
  );
}

function BulletListEditor({
  title,
  items,
  onAdd,
  onChange,
  onRemove,
}: {
  title: string;
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </span>
        <button type="button" className={btn} onClick={onAdd}>
          + افزودن بولت
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            rows={2}
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="مثلاً: Improved page performance by 35%..."
          />
          <button
            type="button"
            className={btnDanger}
            onClick={() => onRemove(index)}
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}

export default function EditorPanel() {
  const {
    resume,
    setBasics,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addExperience,
    updateExperience,
    removeExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet,
    addProject,
    updateProject,
    removeProject,
    addProjectBullet,
    updateProjectBullet,
    removeProjectBullet,
    addEducation,
    updateEducation,
    removeEducation,
  } = useResumeStore();

  return (
    <div className="space-y-4">
      <Card title="اطلاعات اصلی">
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="نام کامل"
            value={resume.basics.fullName}
            onChange={(e) => setBasics({ fullName: e.target.value })}
          />
          <Input
            label="عنوان شغلی"
            value={resume.basics.title}
            onChange={(e) => setBasics({ title: e.target.value })}
          />
          <Input
            label="ایمیل"
            value={resume.basics.email}
            onChange={(e) => setBasics({ email: e.target.value })}
          />
          <Input
            label="شماره تماس"
            value={resume.basics.phone}
            onChange={(e) => setBasics({ phone: e.target.value })}
          />
          <Input
            label="شهر / کشور"
            value={resume.basics.location}
            onChange={(e) => setBasics({ location: e.target.value })}
          />
          <Input
            label="وب‌سایت"
            value={resume.basics.website}
            onChange={(e) => setBasics({ website: e.target.value })}
          />
          <Input
            label="GitHub"
            value={resume.basics.github}
            onChange={(e) => setBasics({ github: e.target.value })}
          />
          <Input
            label="LinkedIn"
            value={resume.basics.linkedin}
            onChange={(e) => setBasics({ linkedin: e.target.value })}
          />
        </div>

        <div className="mt-3">
          <Textarea
            label="خلاصه حرفه‌ای"
            rows={5}
            value={resume.basics.summary}
            onChange={(e) => setBasics({ summary: e.target.value })}
            placeholder="خلاصه‌ای کوتاه، حرفه‌ای و شامل مهارت‌های کلیدی..."
          />
        </div>
      </Card>

      <Card
        title="مهارت‌ها"
        action={
          <button type="button" className={btnPrimary} onClick={addSkillCategory}>
            + افزودن دسته
          </button>
        }
      >
        <div className="space-y-3">
          {resume.skills.map((skill) => (
            <div key={skill.id} className="rounded-xl border border-slate-200 p-3">
              <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)_auto]">
                <Input
                  label="نام دسته"
                  value={skill.name}
                  onChange={(e) =>
                    updateSkillCategory(skill.id, { name: e.target.value })
                  }
                />
                <Input
                  label="آیتم‌ها با کاما"
                  value={skill.items}
                  onChange={(e) =>
                    updateSkillCategory(skill.id, { items: e.target.value })
                  }
                  placeholder="React, Next.js, TypeScript"
                />
                <div className="md:self-end">
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => removeSkillCategory(skill.id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="تجربه کاری"
        action={
          <button type="button" className={btnPrimary} onClick={addExperience}>
            + افزودن تجربه
          </button>
        }
      >
        <div className="space-y-4">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => removeExperience(exp.id)}
                >
                  حذف این تجربه
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="عنوان شغلی"
                  value={exp.title}
                  onChange={(e) =>
                    updateExperience(exp.id, { title: e.target.value })
                  }
                />
                <Input
                  label="شرکت"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                />
                <Input
                  label="موقعیت"
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(exp.id, { location: e.target.value })
                  }
                />
                <Input
                  label="تکنولوژی‌ها"
                  value={exp.tech}
                  onChange={(e) =>
                    updateExperience(exp.id, { tech: e.target.value })
                  }
                  placeholder="React, Next.js, REST API"
                />
                <Input
                  label="تاریخ شروع"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { startDate: e.target.value })
                  }
                  placeholder="2022-01"
                />
                <Input
                  label="تاریخ پایان"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                  placeholder="2024-06"
                />
              </div>

              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    updateExperience(exp.id, { current: e.target.checked })
                  }
                />
                هنوز اینجا مشغولم
              </label>

              <div className="mt-4">
                <BulletListEditor
                  title="دستاوردها / Bullet Points"
                  items={exp.bullets}
                  onAdd={() => addExperienceBullet(exp.id)}
                  onChange={(index, value) =>
                    updateExperienceBullet(exp.id, index, value)
                  }
                  onRemove={(index) => removeExperienceBullet(exp.id, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="پروژه‌ها"
        action={
          <button type="button" className={btnPrimary} onClick={addProject}>
            + افزودن پروژه
          </button>
        }
      >
        <div className="space-y-4">
          {resume.projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => removeProject(project.id)}
                >
                  حذف این پروژه
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="نام پروژه"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, { name: e.target.value })
                  }
                />
                <Input
                  label="لینک"
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, { link: e.target.value })
                  }
                />
                <Input
                  label="تکنولوژی‌ها"
                  value={project.tech}
                  onChange={(e) =>
                    updateProject(project.id, { tech: e.target.value })
                  }
                  placeholder="Next.js, TypeScript, Prisma"
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="توضیح کوتاه"
                  rows={3}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, { description: e.target.value })
                  }
                />
              </div>

              <div className="mt-4">
                <BulletListEditor
                  title="نکات مهم پروژه"
                  items={project.bullets}
                  onAdd={() => addProjectBullet(project.id)}
                  onChange={(index, value) =>
                    updateProjectBullet(project.id, index, value)
                  }
                  onRemove={(index) => removeProjectBullet(project.id, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="تحصیلات"
        action={
          <button type="button" className={btnPrimary} onClick={addEducation}>
            + افزودن تحصیلات
          </button>
        }
      >
        <div className="space-y-4">
          {resume.education.map((edu) => (
            <div key={edu.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => removeEducation(edu.id)}
                >
                  حذف
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="دانشگاه / موسسه"
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(edu.id, { school: e.target.value })
                  }
                />
                <Input
                  label="مدرک"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                />
                <Input
                  label="رشته"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, { field: e.target.value })
                  }
                />
                <Input
                  label="تاریخ شروع"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { startDate: e.target.value })
                  }
                />
                <Input
                  label="تاریخ پایان"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { endDate: e.target.value })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}