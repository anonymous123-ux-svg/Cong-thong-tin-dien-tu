import Image from "next/image";
import { User } from "lucide-react";

import type { ClassDetail } from "./types";
import ClassHeroActions from "./ClassHeroActions";

export default function ClassHero({ detail }: { detail: ClassDetail }) {
  return (
    <section className="relative h-64 w-full overflow-hidden bg-indigo-950">
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-indigo-950 opacity-90" />

      <div className="absolute inset-0 mix-blend-overlay">
        <Image
          src={detail.heroImageUrl}
          alt="Physics background"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex h-full flex-col justify-end px-4 pb-10 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-indigo-700/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-100">
              {detail.levelLabel} • {detail.code}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {detail.title}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-indigo-100">
              <User className="h-4 w-4" />
              <span>{detail.lecturerLine}</span>
            </p>
          </div>

          <ClassHeroActions />
        </div>
      </div>
    </section>
  );
}
