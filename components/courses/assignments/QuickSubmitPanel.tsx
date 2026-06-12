import { UploadCloud } from "lucide-react";

import type { QuickSubmitConfig } from "./types";

export default function QuickSubmitPanel({
  config,
}: {
  config: QuickSubmitConfig;
}) {
  return (
    <section className="rounded-xl border border-[#3D52A0]/20 bg-white p-6 shadow-sm">
      <h4 className="mb-4 text-lg font-medium text-slate-900">Quick Submit</h4>
      <p className="mb-4 text-sm text-slate-500">
        Ready to hand in '{config.assignmentTitle}'?
      </p>

      <button
        type="button"
        className="group mb-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-8 text-center transition-colors hover:border-[#3D52A0]/50 hover:bg-slate-50"
      >
        <UploadCloud
          className="mb-3 h-10 w-10 text-[#3D52A0]/50 transition-colors group-hover:text-[#3D52A0]"
          aria-hidden="true"
        />
        <span className="mb-1 text-sm font-medium text-slate-900">
          Drag and drop files here
        </span>
        <span className="text-xs text-slate-500">
          or click to browse ({config.acceptedFileTypesLabel})
        </span>
      </button>

      <button
        type="button"
        disabled={config.submitDisabled}
        className={
          config.submitDisabled
            ? "w-full cursor-not-allowed rounded-full bg-slate-100 py-2.5 font-medium text-slate-400 opacity-70"
            : "w-full rounded-full bg-[#3D52A0] py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-[#2D3F80]"
        }
      >
        Submit Assignment
      </button>
    </section>
  );
}
