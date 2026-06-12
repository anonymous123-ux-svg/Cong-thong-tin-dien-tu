import type { ReactNode } from "react";

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-8 md:px-8">
      {children}
    </div>
  );
}
