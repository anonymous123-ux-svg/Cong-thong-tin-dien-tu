import Image from "next/image";
import { Star, Users } from "lucide-react";

type Props = {
  categoryLabel: string;
  title: string;
  instructorName: string;
  instructorAvatarUrl: string;
  ratingLabel: string;
  studentsLabel: string;
};

export default function CourseOverviewHero({
  categoryLabel,
  title,
  instructorName,
  instructorAvatarUrl,
  ratingLabel,
  studentsLabel,
}: Props) {
  return (
    <header className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 p-8 md:p-12 text-white shadow-lg">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase mb-6 text-white">
          {categoryLabel}
        </span>

        <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight text-white">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium opacity-90">
          <div className="flex items-center gap-2">
            <Image
              alt={instructorName}
              src={instructorAvatarUrl}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-white/30 object-cover"
            />
            <span>{instructorName}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star
              className="h-4 w-4 text-yellow-300 fill-yellow-300"
              aria-hidden="true"
            />
            <span>{ratingLabel}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span>{studentsLabel}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </header>
  );
}
