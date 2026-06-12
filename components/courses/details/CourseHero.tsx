import Image from "next/image";
import { Sparkles } from "lucide-react";

type Props = {
  title: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatarUrl: string;
  progressPercent: number;
};

export default function CourseHero({
  title,
  instructorName,
  instructorTitle,
  instructorAvatarUrl,
  progressPercent,
}: Props) {
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));

  return (
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight max-w-3xl">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                alt="Instructor avatar"
                src={instructorAvatarUrl}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-on-surface">
                  {instructorName}
                </p>
                <p className="text-xs text-slate-500">{instructorTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-secondary-container/20 text-secondary font-bold text-xs rounded-full">
              <Sparkles className="h-4 w-4" />
              Bestseller
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-on-surface">Course Progress</span>
            <span className="text-primary">{clampedProgress}%</span>
          </div>

          <progress
            value={clampedProgress}
            max={100}
            className="w-full h-2 rounded-full overflow-hidden accent-primary"
          />
        </div>
      </div>
    </header>
  );
}
