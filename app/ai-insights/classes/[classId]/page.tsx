import { notFound } from "next/navigation";

import AiCohortInsightsPage from "@/components/ai-insights/AiCohortInsightsPage";
import { getAiCohortInsightsMock } from "@/components/ai-insights/mockData";
import { CLASSES_DIRECTORY_ITEMS } from "@/components/classes/mockData";

export default async function AiInsightsClassPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;

  const classItem = CLASSES_DIRECTORY_ITEMS.find((c) => c.id === classId);
  if (!classItem) notFound();

  const data = getAiCohortInsightsMock(classItem.title);

  return <AiCohortInsightsPage data={data} />;
}
