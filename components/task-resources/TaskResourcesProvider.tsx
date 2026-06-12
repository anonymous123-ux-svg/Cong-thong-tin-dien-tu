"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TaskResourcesContextValue = {
  query: string;
  setQuery: (next: string) => void;
};

const TaskResourcesContext = createContext<TaskResourcesContextValue | null>(
  null,
);

export function useTaskResources() {
  const value = useContext(TaskResourcesContext);
  if (!value) {
    throw new Error(
      "useTaskResources must be used within <TaskResourcesProvider />",
    );
  }
  return value;
}

export default function TaskResourcesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [query, setQueryState] = useState("");

  const setQuery = useCallback((next: string) => setQueryState(next), []);

  const value = useMemo(() => ({ query, setQuery }), [query, setQuery]);

  return (
    <TaskResourcesContext.Provider value={value}>
      {children}
    </TaskResourcesContext.Provider>
  );
}
