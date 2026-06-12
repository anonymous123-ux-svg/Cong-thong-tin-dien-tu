import AiInsightsFooter from "./AiInsightsFooter";
import AiInsightsHeader from "./AiInsightsHeader";
import AiRecommendations from "./AiRecommendations";
import AtRiskEarlyWarningTable from "./AtRiskEarlyWarningTable";
import BehavioralHeatmap from "./BehavioralHeatmap";
import PredictivePerformanceMatrix from "./PredictivePerformanceMatrix";
import SentimentVelocityCard from "./SentimentVelocityCard";
import type { AiCohortInsightsData } from "./types";

type AiCohortInsightsPageProps = {
  data: AiCohortInsightsData;
};

export default function AiCohortInsightsPage({
  data,
}: AiCohortInsightsPageProps) {
  return (
    <div className="min-h-screen">
      <AiInsightsHeader
        classTitle={data.classTitle}
        lastSyncedLabel={data.lastSyncedLabel}
        optimalTrendLabel={data.optimalTrendLabel}
      />

      <div className="grid grid-cols-12 gap-6">
        <PredictivePerformanceMatrix
          weeks={data.weeks}
          predictionTargetLabel={data.predictionTargetLabel}
        />
        <SentimentVelocityCard
          score={data.sentiment.score}
          label={data.sentiment.label}
          quote={data.sentiment.quote}
        />
        <BehavioralHeatmap
          periodLabel={data.heatmap.periodLabel}
          days={data.heatmap.days}
          grid={data.heatmap.grid}
        />
        <AiRecommendations
          title={data.recommendations.title}
          items={data.recommendations.items}
          synthesis={data.recommendations.synthesis}
        />
        <AtRiskEarlyWarningTable
          title={data.atRisk.title}
          subtitle={data.atRisk.subtitle}
          highAlertCount={data.atRisk.highAlertCount}
          monitoringCount={data.atRisk.monitoringCount}
          students={data.atRisk.students}
        />
      </div>

      <AiInsightsFooter classTitle={data.classTitle} />
    </div>
  );
}
