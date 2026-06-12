import StudentRosterTable from "@/components/class-management/StudentRosterTable";
import { STUDENTS } from "@/components/class-management/mockData";

export default function RosterTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-2xl font-bold text-on-surface">Roster</h3>
        <p className="text-sm text-on-surface-variant">
          Students currently enrolled in this class.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-container-low p-4 md:p-6">
        <StudentRosterTable students={STUDENTS} />
      </div>
    </div>
  );
}
