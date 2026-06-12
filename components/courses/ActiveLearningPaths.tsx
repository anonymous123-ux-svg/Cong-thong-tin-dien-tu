import Image from "next/image";

import { Sigma } from "lucide-react";

import {
  COURSE_MANAGEMENT_FEATURED_PATH,
  COURSE_MANAGEMENT_SIDE_CARD,
} from "./mockData";

export default function ActiveLearningPaths() {
  const featured = COURSE_MANAGEMENT_FEATURED_PATH;
  const sideCard = COURSE_MANAGEMENT_SIDE_CARD;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Active Learning Paths</h3>
        <a
          href="#"
          className="text-indigo-600 font-medium text-sm hover:underline"
        >
          See all paths
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 relative overflow-hidden">
          <div className="flex-1 z-10">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full mb-4">
              {featured.badgeLabel}
            </span>

            <h4 className="text-2xl font-bold mb-2">{featured.title}</h4>
            <p className="text-slate-500 text-sm mb-6">
              {featured.description}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold text-slate-400">
                  COURSE PROGRESS
                </span>
                <span className="text-sm font-bold text-indigo-700">
                  {featured.progressPercent}%
                </span>
              </div>
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div
                  className={
                    "bg-indigo-700 h-full rounded-full " +
                    featured.progressWidthClassName
                  }
                />
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={featured.imageSrc}
              alt={featured.imageAlt}
              fill
              sizes="(min-width: 768px) 192px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm group hover:bg-surface-bright transition-colors">
          <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
            <Sigma className="h-5 w-5" />
          </div>

          <h4 className="text-lg font-bold mb-2">{sideCard.title}</h4>
          <p className="text-slate-500 text-xs mb-6">{sideCard.description}</p>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
              <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-300" />
              <div className="h-6 w-6 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[8px] font-bold">
                +12
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {sideCard.studentsLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
