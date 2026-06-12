import Image from "next/image";

import type { TaskMemberDetail } from "./types";

export default function ReferenceCard({
  reference,
}: {
  reference: TaskMemberDetail["referenceCard"];
}) {
  return (
    <section className="group relative aspect-square overflow-hidden rounded-3xl shadow-lg">
      <Image
        src={reference.imageUrl}
        alt={reference.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority={false}
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-8">
        <span className="mb-2 w-fit rounded-full bg-primary-container px-3 py-1 text-[10px] font-bold tracking-widest text-on-primary-container uppercase">
          {reference.label}
        </span>
        <h4 className="text-xl font-bold text-white">{reference.title}</h4>
        <p className="mt-1 text-sm text-white/70">{reference.description}</p>
      </div>
    </section>
  );
}
