import type { ReactNode } from "react";

import ClassSidebarGate from "@/components/layout/ClassSidebarGate";
import Topbar from "@/components/layout/Topbar";

export default function ClassLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Topbar />
      <div className="flex pt-16">
        <ClassSidebarGate />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
