"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ScheduleViewMode } from "./types";

type TaskScheduleContextValue = {
  viewMode: ScheduleViewMode;
  setViewMode: (next: ScheduleViewMode) => void;
  monthLabel: string;
  goPrevMonth: () => void;
  goNextMonth: () => void;
};

const TaskScheduleContext = createContext<TaskScheduleContextValue | null>(
  null,
);

export function useTaskSchedule() {
  const value = useContext(TaskScheduleContext);
  if (!value) {
    throw new Error(
      "useTaskSchedule must be used within <TaskScheduleProvider />",
    );
  }
  return value;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export default function TaskScheduleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [viewMode, setViewModeState] = useState<ScheduleViewMode>("Month");

  // Template month: April 2025.
  const [monthIndex, setMonthIndex] = useState(3);
  const [year, setYear] = useState(2025);

  const setViewMode = useCallback(
    (next: ScheduleViewMode) => setViewModeState(next),
    [],
  );

  const goPrevMonth = useCallback(() => {
    setMonthIndex((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goNextMonth = useCallback(() => {
    setMonthIndex((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const monthLabel = `${MONTHS[monthIndex]} ${year}`;

  const value = useMemo(
    () => ({ viewMode, setViewMode, monthLabel, goPrevMonth, goNextMonth }),
    [viewMode, setViewMode, monthLabel, goPrevMonth, goNextMonth],
  );

  return (
    <TaskScheduleContext.Provider value={value}>
      {children}
    </TaskScheduleContext.Provider>
  );
}
