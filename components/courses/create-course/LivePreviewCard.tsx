"use client";

import Image from "next/image";

const FALLBACK_PREVIEW_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDNPvwpbn5iqYgltySNBbf5JNVe0SVGRhbfXhH3ohX_O_cblmwkf3xlO4lWIXM2PvsklujFuUx9vGxsEvavlB2oa0oMvfBqQdae-JtqpX5Vy1gfB1DCd7mEcxgvQED0-CUrygxbHYMYuhF_fC8NxyrL-7Wbw2hV-pvSOSL9Vyml_ECIEgOBfPixwPrhA8LwWuRLtuUwUVNKdwLXb3jy0Uk2IqMOTLhL73gp6zuW7nqNaQhN7Yjz2DJA3UT0TjGPS0v9Lq1I5eoH_QQ-";

type LivePreviewCardProps = {
  title: string;
  level: string;
  priceDisplay: string;
  coverImageUrl: string | null;
};

export default function LivePreviewCard({
  title,
  level,
  priceDisplay,
  coverImageUrl,
}: LivePreviewCardProps) {
  const displayTitle = title.trim() || "Course Title Will Appear Here";
  const badgeLevel = (level || "Advanced").toUpperCase();

  return (
    <section className="overflow-hidden rounded-2xl bg-indigo-700 text-white shadow-xl">
      <div className="relative h-40 bg-indigo-900/20">
        <div className="absolute inset-0 mix-blend-multiply bg-linear-to-br from-indigo-700/40 to-indigo-900/80" />
        <Image
          src={coverImageUrl || FALLBACK_PREVIEW_IMAGE_SRC}
          alt="Course preview cover"
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover opacity-50 grayscale transition-all duration-700 hover:grayscale-0"
          priority={false}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
            Live Preview
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            New Course
          </span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {badgeLevel}
          </span>
        </div>

        <h3 className="mb-4 text-lg font-bold leading-tight">{displayTitle}</h3>

        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-indigo-400" />
            <span className="text-xs opacity-80">Dr. Sarah Jenkins</span>
          </div>
          <span className="font-bold">{priceDisplay}</span>
        </div>
      </div>
    </section>
  );
}
