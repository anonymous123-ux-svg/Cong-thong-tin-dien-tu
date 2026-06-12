import Image from "next/image";

import type { TaskTeamMember } from "./types";

export default function TaskListHeader({
  members,
  extraCount,
}: {
  members: TaskTeamMember[];
  extraCount: number;
}) {
  return (
    <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h1 className="mb-4 text-[3.5rem] leading-none font-bold tracking-tighter text-on-surface">
          Task Management
        </h1>
        <p className="max-w-[60ch] text-on-surface-variant">
          Curate and track the progress of ongoing research modules and academic
          experiments in the Advanced Physics department.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex -space-x-3">
          {members.slice(0, 3).map((member) => (
            <Image
              key={member.id}
              src={member.avatarUrl}
              alt={member.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-4 ring-background"
            />
          ))}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-xs font-bold text-on-surface-variant ring-4 ring-background">
            +{extraCount}
          </div>
        </div>
      </div>
    </header>
  );
}
