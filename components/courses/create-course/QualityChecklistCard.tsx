"use client";

import { CheckCircle2, Circle } from "lucide-react";

import type { CreateCourseFormState } from "./types";

type QualityChecklistCardProps = {
  state: CreateCourseFormState;
};

function getWordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function QualityChecklistCard({
  state,
}: QualityChecklistCardProps) {
  const titleOk = state.title.trim().length >= 8;
  const descriptionOk = getWordCount(state.description) >= 200;
  const coverOk = Boolean(state.coverImageUrl);
  const pricingOk =
    state.level.trim().length > 0 &&
    (state.enrollmentType === "free" || Number(state.price) > 0);

  const items = [
    { ok: titleOk, label: "Catchy, academic title" },
    { ok: descriptionOk, label: "Editorial description (min 200 words)" },
    { ok: coverOk, label: "High-resolution cover image" },
    { ok: pricingOk, label: "Pricing and Level defined" },
  ];

  return (
    <section className="rounded-2xl bg-surface-container-low p-6">
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        Quality Checklist
      </h4>
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = item.ok ? CheckCircle2 : Circle;
          return (
            <li key={item.label} className="flex items-start gap-3">
              <Icon
                className={
                  item.ok
                    ? "mt-0.5 h-4 w-4 text-emerald-500"
                    : "mt-0.5 h-4 w-4 text-slate-300"
                }
              />
              <span className="text-xs text-slate-600">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
