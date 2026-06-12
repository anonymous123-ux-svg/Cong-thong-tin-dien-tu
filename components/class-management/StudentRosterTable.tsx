import Image from "next/image";
import { MoreVertical } from "lucide-react";

import type { Student, StudentStatus } from "./types";

function statusPill(status: StudentStatus) {
  switch (status) {
    case "Top Performer":
      return "bg-secondary-container/20 text-secondary";
    case "Stable":
      return "bg-indigo-50 text-indigo-600";
    case "At Risk":
      return "bg-error-container text-error";
  }
}

export default function StudentRosterTable({
  students,
}: {
  students: Student[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <th className="pb-6 px-4">Student Name</th>
            <th className="pb-6 px-4 text-center">Status</th>
            <th className="pb-6 px-4 text-center">Performance</th>
            <th className="pb-6 px-4 text-center">Last Active</th>
            <th className="pb-6 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {students.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-surface-container-low/50 transition-colors group"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      alt={student.name}
                      src={student.avatarUrl}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-on-background">
                      {student.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ID: {student.studentIdLabel}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span
                  className={
                    "px-3 py-1 text-[10px] font-bold uppercase rounded-full " +
                    statusPill(student.status)
                  }
                >
                  {student.status}
                </span>
              </td>
              <td className="py-4 px-4 text-center font-bold text-on-background">
                {student.performance}
              </td>
              <td className="py-4 px-4 text-center text-slate-500">
                {student.lastActive}
              </td>
              <td className="py-4 px-4 text-right">
                <button
                  type="button"
                  className="text-slate-400 hover:text-indigo-600"
                  aria-label="More"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
