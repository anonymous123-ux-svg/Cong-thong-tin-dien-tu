import ClassHeader from "@/components/class-management/ClassHeader";
import ClassTabs from "@/components/class-management/ClassTabs";
import ManagementSidebar from "@/components/class-management/ManagementSidebar";
import PerformanceCards from "@/components/class-management/PerformanceCards";
import {
  CLASS_SUMMARY,
  GRADE_ALERTS,
  PERFORMANCE_CARDS,
  SCHEDULE,
  STUDENTS,
} from "@/components/class-management/mockData";

export default function ClassManagementPage() {
  return (
    <div className="space-y-8">
      <ClassHeader summary={CLASS_SUMMARY} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-9 space-y-8">
          <PerformanceCards
            cards={PERFORMANCE_CARDS}
            studentsPreview={STUDENTS.map((student) => student.avatarUrl)}
          />

          <ClassTabs students={STUDENTS} />
        </div>

        <ManagementSidebar
          classCapacityLabel="28 / 30 Students"
          capacityHint="2 spots remaining in this cohort."
          schedule={SCHEDULE}
          alerts={GRADE_ALERTS}
        />
      </div>
    </div>
  );
}
