import Image from "next/image";
import Link from "next/link";
import { BookOpen, Brain, Building2, Cpu, Sigma, Terminal } from "lucide-react";

import Card from "@/components/ui/Card";

import type {
  ClassDirectoryItem,
  ClassIconKey,
  ClassStatusTone,
} from "./types";

function statusClassName(tone: ClassStatusTone) {
  return tone === "success"
    ? "bg-emerald-500 text-white"
    : "bg-white text-slate-500 border border-slate-200";
}

function ClassIcon({ iconKey }: { iconKey: ClassIconKey }) {
  const className = "h-5 w-5";

  if (iconKey === "physics") return <Cpu className={className} />;
  if (iconKey === "calculus") return <Sigma className={className} />;
  if (iconKey === "dataStructures") return <Terminal className={className} />;
  if (iconKey === "urbanDesign") return <Building2 className={className} />;
  if (iconKey === "cognitiveNeuro") return <Brain className={className} />;
  return <BookOpen className={className} />;
}

type ClassCardProps = {
  item: ClassDirectoryItem;
};

export default function ClassCard({ item }: ClassCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.08)]">
      <div className="absolute right-0 top-0 p-4">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClassName(item.status.tone)}`}
        >
          {item.status.label}
        </span>
      </div>

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
        <ClassIcon iconKey={item.icon} />
      </div>

      <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
        {item.title}
      </h3>

      <div className="mb-6 flex items-center gap-2">
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <Image
            src={item.instructor.avatarUrl}
            alt={item.instructor.name}
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm font-medium text-slate-500">
          {item.instructor.name}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Enrolled
          </span>
          <span className="text-lg font-bold text-slate-900">
            {item.enrolledLabel}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Link
            href={`/ai-insights/classes/${item.id}`}
            className="cursor-pointer rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-50 active:scale-95"
          >
            AI Insight
          </Link>

          <Link
            href={`/class/classes/${item.id}/members`}
            className="cursor-pointer rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-800 active:scale-95"
          >
            View Members
          </Link>
        </div>
      </div>
    </Card>
  );
}
