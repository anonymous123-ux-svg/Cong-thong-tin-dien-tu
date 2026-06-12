import type { StudentRow, StudentStatusTone } from "./types";
import Link from "next/link";

const STATUS_STYLE: Record<StudentStatusTone, { bg: string; color: string }> = {
  excellent: { bg: "#ECFDF5", color: "#059669" }, // green
  atRisk: { bg: "#FEF2F2", color: "#EF4444" }, // red
  stable: { bg: "#EEF2FF", color: "#4338CA" }, // indigo
};

export default function StudentPerformanceTable({
  students,
}: {
  students: StudentRow[];
}) {
  return (
    <section
      className="overflow-hidden rounded-2xl"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <div
        className="flex items-center justify-between p-6"
        style={{ borderBottom: "1px solid #F1F5F9" }}
      >
        <h4 className="font-bold" style={{ color: "#0F172A" }}>
          Student Performance
        </h4>
        <Link
          href="/class/students"
          className="cursor-pointer text-sm font-semibold hover:underline"
          style={{ color: "#4338CA" }}
        >
          View All Students
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead style={{ backgroundColor: "#F8F9FC" }}>
            <tr>
              {[
                "Student Name",
                "Attendance",
                "Avg Score",
                "Completed",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#94A3B8" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student, i) => (
              <tr
                key={student.id}
                style={{ borderTop: i > 0 ? "1px solid #F1F5F9" : undefined }}
              >
                <td className="flex items-center gap-3 px-6 py-4">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                  >
                    {student.initials}
                  </div>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#0F172A" }}
                  >
                    {student.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "#64748B" }}>
                  {student.attendanceLabel}
                </td>
                <td
                  className="px-6 py-4 text-sm font-medium"
                  style={{ color: "#0F172A" }}
                >
                  {student.avgScoreLabel}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "#64748B" }}>
                  {student.completedLabel}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="rounded-md px-2 py-1 text-[10px] font-bold uppercase"
                    style={STATUS_STYLE[student.statusTone]}
                  >
                    {student.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
