"use client";

import CreateDeadlineForm from "./CreateDeadlineForm";
import CreateDeadlineHeader from "./CreateDeadlineHeader";
import CreateDeadlineTip from "./CreateDeadlineTip";

type Props = {
  modules: string[];
};

export default function CreateDeadlineClient({ modules }: Props) {
  return (
    <div className="relative px-8 py-8 lg:px-12">
      <div className="mx-auto max-w-360">
        <CreateDeadlineHeader />
        <CreateDeadlineForm modules={modules} />
        <CreateDeadlineTip />
      </div>

      <div className="pointer-events-none fixed right-0 top-0 -z-10 h-1/2 w-1/2 bg-linear-to-bl from-indigo-600/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-1/2 w-1/2 bg-linear-to-tr from-indigo-600/5 to-transparent blur-[120px]" />
    </div>
  );
}
