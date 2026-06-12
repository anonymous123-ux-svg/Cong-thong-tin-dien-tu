import ActiveCollaboratorsCard from "@/components/task-member/ActiveCollaboratorsCard";
import ActivityLogsCard from "@/components/task-member/ActivityLogsCard";
import { getTaskMemberDetail } from "@/components/task-member/mockData";
import ReferenceCard from "@/components/task-member/ReferenceCard";
import ResourceAllocationCard from "@/components/task-member/ResourceAllocationCard";
import TaskMasteryCard from "@/components/task-member/TaskMasteryCard";
import TaskMemberFooter from "@/components/task-member/TaskMemberFooter";

export default async function TaskMemberPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const detail = getTaskMemberDetail(taskId);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="space-y-6 md:col-span-8">
          <ActiveCollaboratorsCard detail={detail} />
          <ActivityLogsCard logs={detail.activityLogs} />
        </div>

        <div className="space-y-6 md:col-span-4">
          <TaskMasteryCard detail={detail} />
          <ResourceAllocationCard detail={detail} />
          <ReferenceCard reference={detail.referenceCard} />
        </div>
      </div>

      <div className="-mx-6">
        <TaskMemberFooter />
      </div>
    </>
  );
}
