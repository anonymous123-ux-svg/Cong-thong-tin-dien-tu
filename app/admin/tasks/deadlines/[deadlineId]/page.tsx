import { notFound } from "next/navigation";

import DeadlineDetailView from "@/components/task-deadlines/detail/DeadlineDetailView";
import { deadlines } from "@/components/task-deadlines/mockData";

type PageProps = {
  params: Promise<{ deadlineId: string }>;
};

export default async function DeadlineDetailPage({ params }: PageProps) {
  const { deadlineId } = await params;
  const item = deadlines.find((deadline) => deadline.id === deadlineId);

  if (!item) notFound();

  return <DeadlineDetailView item={item} />;
}
