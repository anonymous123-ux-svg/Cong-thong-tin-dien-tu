import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentCard from "./AssignmentCard";
import QuickSubmitPanel from "./QuickSubmitPanel";
import RecentFeedbackPanel from "./RecentFeedbackPanel";
import { ASSIGNMENTS, QUICK_SUBMIT, RECENT_FEEDBACK } from "./mockData";

export default function CourseAssignmentsPage({
  courseTitle,
}: {
  courseTitle?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-2 md:px-10 md:pb-10 md:pt-4 lg:px-16 lg:pb-16 lg:pt-6">
      <div className="mb-12">
        <AssignmentsHeader courseTitle={courseTitle} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          {ASSIGNMENTS.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <QuickSubmitPanel config={QUICK_SUBMIT} />
          <RecentFeedbackPanel items={RECENT_FEEDBACK} />
        </div>
      </div>
    </div>
  );
}
