import type { TaskMemberDetail } from "./types";

const WIDTH_CLASS_BY_PERCENT: Record<number, string> = {
  45: "w-[45%]",
  70: "w-[70%]",
  90: "w-[90%]",
};

function Bar({
  value,
  tone,
}: {
  value: number;
  tone: "primary" | "secondary";
}) {
  const className = tone === "secondary" ? "bg-green-500" : "bg-[#2D2DE8]";
  const widthClassName = WIDTH_CLASS_BY_PERCENT[value] ?? "w-full";
  return (
    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
      <div className={`h-full ${className} ${widthClassName}`} />
    </div>
  );
}

export default function ResourceAllocationCard({
  detail,
}: {
  detail: TaskMemberDetail;
}) {
  const { calculation, theorizing, peerReview } = detail.resourceAllocation;

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
      <h3 className="mb-6 text-base font-bold text-gray-900">
        Resource Allocation
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Calculation</span>
          <Bar value={calculation} tone="primary" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Theorizing</span>
          <Bar value={theorizing} tone="primary" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Peer Review</span>
          <Bar value={peerReview} tone="secondary" />
        </div>
      </div>
    </section>
  );
}
