"use client";

import { useId, useMemo, useState } from "react";

type RangeMode = "weekly" | "monthly";

export default function PerformanceOverTimeCard() {
  const [mode, setMode] = useState<RangeMode>("weekly");

  const gradientId = useId();

  const chart = useMemo(() => {
    if (mode === "monthly") {
      return {
        ariaLabel: "Performance line chart (monthly)",
        areaPath: "M0,75 Q50,58 100,62 T200,38 T300,46 T400,30 V100 H0 Z",
        linePath: "M0,75 Q50,58 100,62 T200,38 T300,46 T400,30",
        labels: ["Jan", "Apr", "Jul", "Oct"],
      };
    }

    return {
      ariaLabel: "Performance line chart (weekly)",
      areaPath: "M0,80 Q50,70 100,75 T200,40 T300,55 T400,20 V100 H0 Z",
      linePath: "M0,80 Q50,70 100,75 T200,40 T300,55 T400,20",
      labels: ["Week 01", "Week 04", "Week 08", "Week 12"],
    };
  }, [mode]);

  const fillOpacity = mode === "weekly" ? 0.12 : 0.08;

  return (
    <section
      className="rounded-2xl p-8"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <h4 className="text-lg font-bold" style={{ color: "#0F172A" }}>
          Performance Over Time
        </h4>
        <div className="flex gap-2">
          {(["weekly", "monthly"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
              style={
                mode === m
                  ? { backgroundColor: "#4338CA", color: "#ffffff" }
                  : { color: "#94A3B8" }
              }
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative flex h-64 w-full items-end overflow-hidden rounded-xl px-4"
        style={{ background: "linear-gradient(to top, #F8F9FF, transparent)" }}
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 400 100"
          aria-label={chart.ariaLabel}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4338CA" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4338CA" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={chart.areaPath}
            fill={`url(#${gradientId})`}
            opacity={fillOpacity * 8}
          />
          {/* Line */}
          <path
            d={chart.linePath}
            fill="none"
            stroke="#4338CA"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div
        className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "#94A3B8" }}
      >
        {chart.labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
}
