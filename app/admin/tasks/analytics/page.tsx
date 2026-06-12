import AiInsightCard from "@/components/task-analytics/AiInsightCard";
import CapacityAlertCard from "@/components/task-analytics/CapacityAlertCard";
import CompletionVelocityChart from "@/components/task-analytics/CompletionVelocityChart";
import KpiCards from "@/components/task-analytics/KpiCards";
import MemberProductivityCard from "@/components/task-analytics/MemberProductivityCard";
import TaskBreakdownTable from "@/components/task-analytics/TaskBreakdownTable";
import WorkloadBalanceCard from "@/components/task-analytics/WorkloadBalanceCard";

export default function TaskAnalyticsPage() {
  return (
    <>
      <KpiCards />

      <section className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-10">
        <CompletionVelocityChart />

        <div className="flex flex-col gap-6 lg:col-span-3">
          <MemberProductivityCard />
          <AiInsightCard />
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <WorkloadBalanceCard />
        <CapacityAlertCard />
      </section>

      <TaskBreakdownTable />
    </>
  );
}
