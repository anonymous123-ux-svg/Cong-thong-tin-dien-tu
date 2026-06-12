import Image from "next/image";
import { Book, Download, FileText, FlaskConical } from "lucide-react";

import type { ClassDetail, Resource } from "./types";

function resourceIcon(kind: Resource["kind"]) {
  switch (kind) {
    case "book":
      return Book;
    case "pdf":
      return FileText;
    case "lab":
      return FlaskConical;
  }
}

export default function ClassDetailSidebar({
  detail,
}: {
  detail: ClassDetail;
}) {
  return (
    <aside className="space-y-8">
      <section className="rounded-xl bg-surface-container-low p-8">
        <h3 className="mb-6 text-lg font-bold">About Lecturer</h3>
        <div className="mb-6 flex items-center gap-4">
          <Image
            src={detail.lecturer.avatarUrl}
            alt={detail.lecturer.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-on-surface">{detail.lecturer.name}</p>
            <p className="text-xs text-slate-500">
              {detail.lecturer.titleLine}
            </p>
          </div>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
          {detail.lecturer.bio}
        </p>
        <button
          type="button"
          className="w-full rounded-full border border-indigo-200 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          View Portfolio
        </button>
      </section>

      <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
        <h3 className="mb-6 text-lg font-bold">Required Resources</h3>

        <div className="space-y-6">
          {detail.resources.map((resource) => {
            const Icon = resourceIcon(resource.kind);

            return (
              <div key={resource.id} className="flex gap-4">
                <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded bg-indigo-50">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">{resource.title}</h5>
                  <p className="text-xs text-slate-500">{resource.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-6 border-slate-100" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Total Materials: 8
          </span>
          <a
            href="#"
            className="flex items-center gap-1 text-xs font-bold text-indigo-600"
          >
            Download All <Download className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black text-indigo-700">
            {detail.stats.students}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Students
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-600">
            {detail.stats.avgGrade}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Avg Grade
          </p>
        </div>
      </section>
    </aside>
  );
}
