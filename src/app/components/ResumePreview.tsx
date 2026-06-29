import type { ReactNode } from "react";
import type { ResumeData } from "../types/resume";

function splitCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b border-slate-300 pb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function ResumePreview({ resume }: { resume: ResumeData }) {
  const basics = resume.basics;
  const contactLine = [
    basics.location,
    basics.email,
    basics.phone,
    basics.website,
    basics.github,
    basics.linkedin,
  ].filter(Boolean);

  const skills = resume.skills.filter((s) => s.name || s.items);
  const experience = resume.experience.filter((e) => e.company || e.title);
  const projects = resume.projects.filter((p) => p.name || p.description);
  const education = resume.education.filter((e) => e.school || e.degree);

  return (
    <div className="print-shell overflow-auto">
      <div className="print-area mx-auto w-[210mm] min-h-[297mm] bg-white p-10 text-[13px] leading-5 text-slate-900 shadow-lg">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            {basics.fullName || "Your Name"}
          </h1>
          <p className="mt-1 text-base font-semibold text-slate-700">
            {basics.title}
          </p>
          {contactLine.length > 0 && (
            <p className="mt-2 break-words text-[12px] text-slate-600">
              {contactLine.join(" | ")}
            </p>
          )}
        </header>

        {basics.summary && (
          <Section title="Professional Summary">
            <p>{basics.summary}</p>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <div className="space-y-1">
              {skills.map((skill) => (
                <p key={skill.id}>
                  <span className="font-semibold">{skill.name}:</span>{" "}
                  {splitCsv(skill.items).join(", ")}
                </p>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-slate-700">
                      {item.company}
                      {item.location ? `, ${item.location}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-slate-600">
                    {item.startDate}
                    {(item.endDate || item.current) && " - "}
                    {item.current ? "Present" : item.endDate}
                  </p>
                </div>

                {item.bullets.filter(Boolean).length > 0 && (
                  <ul className="ml-5 list-disc space-y-1">
                    {item.bullets.filter(Boolean).map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {item.tech && (
                  <p className="text-slate-700">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {item.tech}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {item.link && (
                      <p className="break-all text-slate-700">{item.link}</p>
                    )}
                  </div>
                </div>

                {item.description && <p>{item.description}</p>}

                {item.bullets.filter(Boolean).length > 0 && (
                  <ul className="ml-5 list-disc space-y-1">
                    {item.bullets.filter(Boolean).map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {item.tech && (
                  <p className="text-slate-700">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {item.tech}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    {item.degree}
                    {item.field ? ` in ${item.field}` : ""}
                  </p>
                  <p className="text-slate-700">{item.school}</p>
                </div>
                <p className="shrink-0 text-slate-600">
                  {item.startDate}
                  {(item.startDate || item.endDate) && " - "}
                  {item.endDate}
                </p>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}