import type { ReactNode } from "react";
import { Filter, Plus } from "lucide-react";

import Button from "@/components/ui/Button";

export default function ClassDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
            Curation Hub
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">
            Active Learning Paths
          </h1>
          <p className="mt-1 max-w-[60ch] text-sm text-on-surface-variant">
            Welcome back, Dr. Aris. You have 3 lectures scheduled for today
            across your primary curriculum.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-2.5 text-sm font-semibold text-on-surface transition-all hover:bg-surface-bright"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          <Button className="w-auto rounded-full px-6 py-2.5 text-sm shadow-sm">
            <Plus className="h-4 w-4" />
            New Class
          </Button>
        </div>
      </header>

      {children}
    </div>
  );
}
