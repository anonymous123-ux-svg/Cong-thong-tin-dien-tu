import type { ReactNode } from "react";

import Topbar from "@/components/layout/Topbar";

export default function AnalyticsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Topbar />
      <main className="mx-auto min-h-screen max-w-[1920px] px-8 pb-12 pt-24 md:px-12 lg:px-24">
        {children}
      </main>
    </div>
  );
}
