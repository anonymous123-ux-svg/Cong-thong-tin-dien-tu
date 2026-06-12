import type { ReactNode } from "react";

import CurriculumModuleNavigation from "./CurriculumModuleNavigation";

type Props = {
  children: ReactNode;
};

export default function CurriculumShell({ children }: Props) {
  return (
    <section>
      <header className="mb-12 max-w-4xl">
        <h2 className="mb-2 text-headline-md font-headline font-semibold text-slate-900">
          Curriculum
        </h2>
        <p className="max-w-[70ch] text-body-lg text-slate-500">
          Explore the modules designed to take you from quantum mechanics basics
          to advanced algorithm implementation. Track your progress as you
          master each concept.
        </p>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex w-full max-w-4xl flex-1 flex-col gap-8">
          {children}
        </div>

        <div className="hidden w-72 shrink-0 lg:block">
          <CurriculumModuleNavigation />
        </div>
      </div>
    </section>
  );
}
