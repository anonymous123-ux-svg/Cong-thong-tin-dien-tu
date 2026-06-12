import { FileText, PlayCircle } from "lucide-react";
import type { PopularContentItem } from "./types";

export default function PopularContentCard({
  items,
}: {
  items: PopularContentItem[];
}) {
  return (
    <section
      className="rounded-2xl p-6"
      style={{ backgroundColor: "#F8F9FC", border: "1px solid #F1F5F9" }}
    >
      <h4
        className="mb-4 text-sm font-bold uppercase tracking-wider"
        style={{ color: "#94A3B8" }}
      >
        Popular Content
      </h4>

      <ul className="space-y-4">
        {items.map((item) => {
          const Icon = item.kind === "video" ? PlayCircle : FileText;
          const iconBg = item.kind === "video" ? "#EEF2FF" : "#EFF6FF";
          const iconColor = item.kind === "video" ? "#4338CA" : "#3B82F6";

          return (
            <li key={item.id} className="flex items-center gap-3">
              <div
                className="rounded-lg p-2 shrink-0"
                style={{ backgroundColor: iconBg }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: iconColor }}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-xs font-bold"
                  style={{ color: "#0F172A" }}
                >
                  {item.title}
                </p>
                <p className="text-[10px]" style={{ color: "#94A3B8" }}>
                  {item.meta}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
