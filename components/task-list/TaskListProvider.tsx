"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { TaskListSortBy } from "./types";

type TaskListContextValue = {
  query: string;
  setQuery: (next: string) => void;
  sortBy: TaskListSortBy;
  setSortBy: (next: TaskListSortBy) => void;
};

const TaskListContext = createContext<TaskListContextValue | null>(null);

export function useTaskList() {
  const value = useContext(TaskListContext);
  if (!value) {
    throw new Error("useTaskList must be used within <TaskListProvider />");
  }
  return value;
}

export default function TaskListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [query, setQueryState] = useState("");
  const [sortBy, setSortByState] = useState<TaskListSortBy>("Due Date");

  const setQuery = useCallback((next: string) => setQueryState(next), []);
  const setSortBy = useCallback(
    (next: TaskListSortBy) => setSortByState(next),
    [],
  );

  const value = useMemo(
    () => ({ query, setQuery, sortBy, setSortBy }),
    [query, setQuery, sortBy, setSortBy],
  );

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}
