"use client";

import Image from "next/image";

import { FEATURED_MODULE } from "./mockData";

export default function FeaturedModuleCard() {
  return (
    <section
      className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:col-span-8 md:flex-row"
      style={{
        background:
          "linear-gradient(135deg, #3333CC 0%, #2D2DE8 60%, #1a1ab8 100%)",
      }}
    >
      <div className="z-10 flex-1 space-y-4">
        <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
          {FEATURED_MODULE.eyebrow}
        </div>
        <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
          {FEATURED_MODULE.title}
        </h2>
        <p className="text-indigo-100/80">{FEATURED_MODULE.description}</p>
        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="rounded-full bg-white px-8 py-3 font-bold text-[#3333CC] transition hover:scale-[1.02]"
        >
          {FEATURED_MODULE.cta}
        </button>
      </div>

      <div className="z-10 h-48 w-full shrink-0 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl md:h-64 md:w-64">
        <Image
          src={FEATURED_MODULE.imageUrl}
          alt={FEATURED_MODULE.imageAlt}
          width={256}
          height={256}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
    </section>
  );
}
