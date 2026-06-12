import Link from "next/link";

import Card from "@/components/ui/Card";

import type { LectureItem } from "./types";

type UpcomingLecturesProps = {
  lectures: LectureItem[];
};

export default function UpcomingLectures({ lectures }: UpcomingLecturesProps) {
  return (
    <Card className="bg-surface-container-low p-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="font-bold text-on-surface">Upcoming Lectures</h4>
        <Link
          href="#"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Full Schedule
        </Link>
      </div>

      <div className="space-y-3">
        {lectures.map((lecture) => {
          const isVirtual = lecture.mode === "VIRTUAL";

          return (
            <div
              key={lecture.id}
              className="flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 transition-all hover:translate-x-1"
            >
              <div
                className={`flex h-12 w-12 flex-col items-center justify-center rounded-lg ${
                  isVirtual ? "bg-slate-100" : "bg-blue-50"
                }`}
              >
                <span
                  className={`text-[0.6rem] font-bold ${
                    isVirtual ? "text-slate-400" : "text-blue-400"
                  }`}
                >
                  {lecture.month}
                </span>
                <span
                  className={`text-lg font-bold leading-none ${
                    isVirtual ? "text-slate-700" : "text-blue-700"
                  }`}
                >
                  {lecture.day}
                </span>
              </div>

              <div className="flex-1">
                <h5 className="text-sm font-bold text-on-surface">
                  {lecture.title}
                </h5>
                <p className="text-xs text-on-surface-variant">
                  {lecture.meta}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-[0.6rem] font-bold ${
                  isVirtual
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {lecture.mode}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
