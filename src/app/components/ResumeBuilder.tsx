"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useReactToPrint } from "react-to-print";
import EditorPanel from "./EditorPanel";
import ResumePreview from "./ResumePreview";
import ATSChecker from "./ATSChecker";
import { useResumeStore } from "../store/useResumeStore";
import type { ResumeData } from "../types/resume";

const btn =
  "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50";
const btnPrimary =
  "rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800";
const btnDanger =
  "rounded-xl border border-rose-300 bg-white px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50";

export default function ResumeBuilder() {
  const { resume, importResume, resetResume } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.basics.fullName || "resume"}-ATS`,
    pageStyle: `
      @page { size: A4; margin: 12mm; }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.basics.fullName || "resume"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as ResumeData;

      if (!parsed?.basics || !parsed?.skills || !parsed?.experience) {
        throw new Error("Invalid resume JSON");
      }

      importResume(parsed);
    } catch {
      alert("فایل JSON معتبر نیست.");
    } finally {
      event.target.value = "";
    }
  };

  if (!mounted) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 text-slate-500">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="no-print sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <h1 className="text-xl font-black">ATS Resume Builder</h1>
            <p className="text-sm text-slate-500">
              ذخیره خودکار فعال است. برای PDF بعد از باز شدن پنجره چاپ، گزینه
              Save as PDF را بزن.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnPrimary} onClick={() => handlePrint()}>
              خروجی PDF
            </button>

            <button type="button" className={btn} onClick={handleExportJson}>
              خروجی JSON
            </button>

            <button
              type="button"
              className={btn}
              onClick={() => fileRef.current?.click()}
            >
              ورود JSON
            </button>

            <button
              type="button"
              className={btnDanger}
              onClick={() => {
                if (window.confirm("رزومه به حالت پیش‌فرض برگردد؟")) {
                  resetResume();
                }
              }}
            >
              ریست
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-4 p-4 xl:grid-cols-[480px_minmax(0,1fr)_360px]">
        <div className="no-print">
          <EditorPanel />
        </div>

        <div ref={printRef}>
          <ResumePreview resume={resume} />
        </div>

        <div className="no-print">
          <ATSChecker resume={resume} />
        </div>
      </div>
    </main>
  );
}