import Image from "next/image";

import type { TaskMemberDetail } from "./types";

export default function ActiveCollaboratorsCard({
  detail,
}: {
  detail: TaskMemberDetail;
}) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Active Collaborators
        </h2>
        <span className="font-medium text-gray-500 text-sm">
          {detail.assignedCount} Members Assigned
        </span>
      </div>

      <div className="space-y-3">
        {detail.collaborators.map((member) => (
          <div
            key={member.id}
            className="group flex items-center justify-between rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div
                  className={
                    member.presence === "online"
                      ? "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
                      : "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gray-300"
                  }
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-[#2D2DE8]">
                {member.score.toFixed(1)}
              </div>
              <div className="text-[9px] font-black tracking-widest text-gray-400 uppercase">
                Score
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
