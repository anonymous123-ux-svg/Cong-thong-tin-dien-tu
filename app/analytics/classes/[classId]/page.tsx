import { notFound } from "next/navigation";

import AnalyticsChartsSection from "@/components/class-analytics/AnalyticsChartsSection";
import AnalyticsHeader from "@/components/class-analytics/AnalyticsHeader";
import AnalyticsLowerSection from "@/components/class-analytics/AnalyticsLowerSection";
import AnalyticsTopStats from "@/components/class-analytics/AnalyticsTopStats";
import { getClassAnalyticsMock } from "@/components/class-analytics/mockData";
import { CLASSES_DIRECTORY_ITEMS } from "@/components/classes/mockData";

export default async function ClassAnalyticsPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;

  const classItem = CLASSES_DIRECTORY_ITEMS.find((c) => c.id === classId);
  if (!classItem) notFound();

  const data = getClassAnalyticsMock(classItem.title);

  return (
    <div className="space-y-12">
      <AnalyticsHeader
        title={data.title}
        subtitle={data.subtitle}
        classId={classId}
      />
      <AnalyticsTopStats stats={data.topStats} />
      <AnalyticsChartsSection charts={data.charts} />
      <AnalyticsLowerSection lower={data.lower} />
    </div>
  );
}
