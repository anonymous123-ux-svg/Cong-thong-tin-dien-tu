import { CheckCircle2, MessageCircle, PencilLine } from "lucide-react";

import type { TaskMemberActivityLog } from "./types";

function LogIcon({ type }: { type: TaskMemberActivityLog["type"] }) {
  if (type === "complete") return <CheckCircle2 className="h-5 w-5" />;
  if (type === "discussion") return <MessageCircle className="h-5 w-5" />;
  return <PencilLine className="h-5 w-5" />;
}

function LogIconWrap({ type }: { type: TaskMemberActivityLog["type"] }) {
  const className =
    type === "update"
      ? "bg-blue-100 text-[#2D2DE8]"
      : type === "complete"
        ? "bg-green-100 text-green-600"
        : "bg-orange-100 text-orange-500";

  return (
    <div
      className={`absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full ${className}`}
    >
      <LogIcon type={type} />
    </div>
  );
}

export default function ActivityLogsCard({
  logs,
}: {
  logs: TaskMemberActivityLog[];
}) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
      <h2 className="mb-8 text-xl font-bold tracking-tight text-gray-900">
        Activity Logs
      </h2>

      <div className="relative space-y-8 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 before:content-['']">
        {logs.map((log) => (
          <div key={log.id} className="relative pl-12">
            <LogIconWrap type={log.type} />
            <p className="font-semibold text-gray-900 text-sm">{log.title}</p>
            <p className="mt-1 text-sm text-gray-500">{log.description}</p>
            <span className="mt-2 block text-xs font-bold tracking-wider text-[#2D2DE8] uppercase">
              {log.timestampLabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
