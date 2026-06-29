"use client";

import { useMemo, useState } from "react";
import { analyzeATS } from "../lib/ats";
import type { ResumeData } from "../types/resume";

export default function ATSChecker({ resume }: { resume: ResumeData }) {
  const [jobDescription, setJobDescription] = useState("");

  const report = useMemo(
    () => analyzeATS(resume, jobDescription),
    [resume, jobDescription]
  );

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">بررسی ATS</h2>
      <p className="mt-1 text-sm text-slate-500">
        متن آگهی شغلی را وارد کن تا تطابق کلیدواژه‌ها بررسی شود.
      </p>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        rows={10}
        className="mt-4 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
      />

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">ATS Score</p>
            <p className="text-4xl font-black text-slate-900">{report.score}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Keyword Coverage</p>
            <p className="text-xl font-bold text-emerald-600">
              {report.coverage}%
            </p>
          </div>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-emerald-600"
            style={{ width: `${report.score}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">چک‌لیست ساختاری</h3>
        <div className="mt-3 space-y-2">
          {report.checks.map((check) => (
            <div
              key={check.label}
              className={`rounded-xl border p-3 ${
                check.passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{check.label}</p>
                <span className="text-sm font-bold">
                  {check.passed ? `+${check.points}` : "0"}
                </span>
              </div>
              {check.reason && (
                <p className="mt-1 text-xs text-slate-600">{check.reason}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">کلیدواژه‌های پیدا شده در آگهی</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {report.keywords.length > 0 ? (
            report.keywords.map((word) => (
              <span
                key={word}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">هنوز چیزی وارد نشده.</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold text-emerald-700">Matched Keywords</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {report.matchedKeywords.length > 0 ? (
            report.matchedKeywords.map((word) => (
              <span
                key={word}
                className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">فعلاً موردی Match نشده.</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold text-rose-700">Missing Keywords</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {report.missingKeywords.length > 0 ? (
            report.missingKeywords.map((word) => (
              <span
                key={word}
                className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-700"
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">کلیدواژه غایب مهمی پیدا نشد.</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">پیشنهادها</h3>
        <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-slate-700">
          {report.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}