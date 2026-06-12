import Image from "next/image";
import { CalendarDays, EllipsisVertical, Users } from "lucide-react";

import Card from "@/components/ui/Card";

import type { ClassItem } from "./types";

const codeToneMap: Record<ClassItem["codeTone"], string> = {
  indigo: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

const progressToneMap: Record<ClassItem["progressTone"], string> = {
  primary: "bg-blue-600",
  secondary: "bg-emerald-500",
};

const progressWidthMap: Record<ClassItem["id"], string> = {
  "ph-202": "w-[78%]",
  "cs-101": "w-[45%]",
  "ba-305": "w-[92%]",
};

type CourseCardProps = {
  item: ClassItem;
};

export default function CourseCard({ item }: CourseCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <span
          className={`rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-wider ${codeToneMap[item.codeTone]}`}
        >
          {item.code}
        </span>

        <button
          type="button"
          className="rounded-full p-1 text-slate-300 transition-colors hover:text-blue-600"
          aria-label={`More options for ${item.code}`}
        >
          <EllipsisVertical className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mb-4 text-xl font-semibold text-on-surface">
        {item.title}
      </h3>

      <div className="mb-6 flex items-center gap-3">
        <Image
          src={item.avatarUrl}
          alt={item.lecturerName}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full border-2 border-white object-cover"
        />

        <div className="text-xs">
          <p className="font-semibold text-on-surface">{item.lecturerName}</p>
          <p className="text-on-surface-variant">{item.lecturerRole}</p>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <div className="flex justify-between text-xs font-medium">
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <Users className="h-3.5 w-3.5" />
            {item.students} Students
          </span>

          <span className="flex items-center gap-1.5 text-emerald-600">
            <CalendarDays className="h-3.5 w-3.5" />
            {item.schedule}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[0.7rem] font-bold text-on-surface">
            <span>SYLLABUS PROGRESS</span>
            <span>{item.progress}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
            <div
              className={`h-full rounded-full ${progressToneMap[item.progressTone]} ${progressWidthMap[item.id]}`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
