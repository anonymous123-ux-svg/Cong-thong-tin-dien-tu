"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AnalyticsDateRange } from "./types";

type TaskAnalyticsContextValue = {
  range: AnalyticsDateRange;
  setRange: (next: AnalyticsDateRange) => void;
};

const TaskAnalyticsContext = createContext<TaskAnalyticsContextValue | null>(
  null,
);

export function useTaskAnalytics() {
  const value = useContext(TaskAnalyticsContext);
  if (!value) {
    throw new Error(
      "useTaskAnalytics must be used within <TaskAnalyticsProvider />",
    );
  }
  return value;
}

export default function TaskAnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRangeState] = useState<AnalyticsDateRange>("Last 30 Days");

  const setRange = useCallback(
    (next: AnalyticsDateRange) => setRangeState(next),
    [],
  );

  const value = useMemo(() => ({ range, setRange }), [range, setRange]);

  return (
    <TaskAnalyticsContext.Provider value={value}>
      {children}
    </TaskAnalyticsContext.Provider>
  );
}
