import Image from "next/image";

import { GANTT_TASKS } from "./mockData";
import type { GanttTask } from "./types";

const DAY_LABELS = ["14", "15", "16", "17", "18", "19", "20"] as const;

function ToneDot(tone: GanttTask["tone"]) {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "tertiary") return "bg-amber-700";
  if (tone === "muted") return "bg-slate-400";
  return "bg-indigo-700";
}

function ToneBar(tone: GanttTask["tone"]) {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "tertiary") return "bg-amber-700";
  if (tone === "muted") return "bg-slate-300";
  return "bg-indigo-700";
}

function ProgressTextTone(tone: GanttTask["progressToneText"]) {
  if (tone === "onTertiary") return "text-amber-50";
  if (tone === "onSurface") return "text-slate-500";
  return "text-white";
}

const START_CLASS: Record<number, string> = {
  0: "left-0",
  14: "left-[14%]",
  42: "left-[42%]",
  57: "left-[57%]",
};

const WIDTH_CLASS: Record<number, string> = {
  42: "w-[42%]",
  57: "w-[57%]",
  28: "w-[28%]",
};

export default function GanttTimeline() {
  return (
    <section className="col-span-12 overflow-x-auto rounded-3xl border border-slate-200/40 bg-white p-6 shadow-sm lg:col-span-8">
      <div className="mb-6 flex min-w-[700px] items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Gantt Timeline</h3>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[
              {
                id: "a1",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7jwcxuqwuYXvueqIgjyGJlJaZOf04APchaBGH53sI3pqXb1ep0PNTtjjB9MrAY-p4qx2x4_EDfF4TM3fMdjTHlZinby_VmxLi7pF5a4kFtDIs16RijcjsL92Cc9pzcrj9lG7UJstIoh4gXBIsxp51aE7O-xQsetNCHcHuvKNk1973C93xzslNmaA-xF4g91AIWpsSbAIBrw7DhK7hIIu5P2zxnqLltPll2fnly-2f-UpIHvM1W0bM6Bo4PkEER8ukqYB7_sjvBw12",
                alt: "Team member",
              },
              {
                id: "a2",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4Mk9vMNg9-Lks403fk985WwqXF2aZ2W8clJph1P_rb5x8xk52dauVulMdStL8kWgJK3uCKms5UONtBaSEZ_GPqE9nomlhjXngb43lagRYuH2nDl3aEzeVY1qpz0OOAO-Y90Ivmk2U1yiZ_-L0EFIoniQ76ZxoDUNW3DJiY7lzA-8GwjE1qfOjkqt8HpyO61hW4V4B3hR4RUCKg_IvKazC-cSy2DIzjzj_5A-gl6mraaab4xMUJ0PxN1MYiqsHmtV9iU6c2-2lufLV",
                alt: "Team member",
              },
              {
                id: "a3",
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtuO-Vd6VT-Coj8meMzcWA_PYhgdlEJ9LEycvHzz8-tI5ZLdjzDkH3l_H8kOBhwt8YRDdI6z8HPTo3-7hF7xKdmmY8sumMYlKdKzlXuTYpuwAx56_lmBNqxU_KPu3aFnsXkosWscuxNeGpwlnM1JCQg2ibD85Td6PxT7_ws-UcDFW1RFe2n8nfctIqklAI-hCy2_I2qbp9Z2EqTfYhV5hRXUQRP9w8M2xWUxPm0D2rjhssVQB9QKcXHOZnbe_NdaXv4U-ziN8Wa0uh",
                alt: "Team member",
              },
            ].map((a) => (
              <Image
                key={a.id}
                src={a.url}
                alt={a.alt}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full border-2 border-white object-cover"
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
              +4
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[700px]">
        <div className="mb-4 grid grid-cols-12">
          <div className="col-span-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            Task Name
          </div>
          <div className="col-span-8 grid grid-cols-7 text-center">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className={
                  d === "16"
                    ? "rounded-lg bg-indigo-100 text-[10px] font-bold text-indigo-700 uppercase"
                    : "text-[10px] font-bold text-slate-500 uppercase"
                }
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {GANTT_TASKS.map((t) => (
            <div key={t.id} className="grid grid-cols-12 items-center">
              <div className="col-span-4 flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${ToneDot(t.tone)}`} />
                <span className="truncate text-sm font-semibold text-slate-900">
                  {t.label}
                </span>
              </div>

              <div className="relative col-span-8 h-6 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`absolute ${START_CLASS[t.startOffsetPercent] ?? "left-0"} ${WIDTH_CLASS[t.widthPercent] ?? "w-full"} h-full ${ToneBar(t.tone)} flex items-center justify-end pr-2`}
                >
                  <span
                    className={`text-[10px] font-bold ${ProgressTextTone(t.progressToneText)}`}
                  >
                    {t.progressLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
