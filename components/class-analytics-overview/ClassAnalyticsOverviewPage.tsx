import AiInsightsPanel from "./AiInsightsPanel";
import EngagementHeatmap from "./EngagementHeatmap";
import { CLASS_ANALYTICS_OVERVIEW_MOCK } from "./mockData";
import KpiCards from "./KpiCards";
import PerformanceOverTimeCard from "./PerformanceOverTimeCard";
import PopularContentCard from "./PopularContentCard";
import ResourceUsageCard from "./ResourceUsageCard";
import ScoreDistributionCard from "./ScoreDistributionCard";
import StudentPerformanceTable from "./StudentPerformanceTable";

export default function ClassAnalyticsOverviewPage() {
  const data = CLASS_ANALYTICS_OVERVIEW_MOCK;

  return (
    <main
      className="min-h-screen p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: "#F8F9FC" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#0F172A" }}
          >
            {data.title}
          </h2>
          <p className="mt-1" style={{ color: "#64748B" }}>
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          <KpiCards kpis={data.kpis} />

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 space-y-8 lg:col-span-8">
              <PerformanceOverTimeCard />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <ScoreDistributionCard />
                <ResourceUsageCard items={data.resourceUsage} />
              </div>
              <StudentPerformanceTable students={data.students} />
            </div>

            <div className="col-span-12 space-y-8 lg:col-span-4">
              <AiInsightsPanel insights={data.aiInsights} />
              <EngagementHeatmap cells={data.heatmap} />
              <PopularContentCard items={data.popularContent} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
