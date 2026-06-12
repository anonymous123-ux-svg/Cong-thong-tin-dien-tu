import {
  CalendarCheck,
  CheckSquare,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { KpiItem, KpiTone } from "./types";

const KPI_CONFIG: Record<
  KpiTone,
  { Icon: LucideIcon; bg: string; color: string }
> = {
  primary: { Icon: Star, bg: "#EEF2FF", color: "#4338CA" }, // indigo
  secondary: { Icon: CalendarCheck, bg: "#ECFDF5", color: "#10B981" }, // green
  warning: { Icon: CheckSquare, bg: "#FFF7ED", color: "#F97316" }, // orange
  purple: { Icon: Zap, bg: "#F5F3FF", color: "#8B5CF6" }, // violet
};

export default function KpiCards({ kpis }: { kpis: KpiItem[] }) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {kpis.map((kpi) => {
        const { Icon, bg, color } = KPI_CONFIG[kpi.tone];
        const deltaColor = kpi.deltaTone === "down" ? "#EF4444" : "#10B981";

        return (
          <div
            key={kpi.id}
            className="rounded-2xl p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className="rounded-xl p-2"
                style={{ backgroundColor: bg }}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <span className="text-xs font-bold" style={{ color: deltaColor }}>
                {kpi.deltaLabel}
              </span>
            </div>
            <p className="text-sm font-medium" style={{ color: "#64748B" }}>
              {kpi.label}
            </p>
            <h3 className="text-2xl font-bold" style={{ color: "#0F172A" }}>
              {kpi.value}
            </h3>
          </div>
        );
      })}
    </section>
  );
}
