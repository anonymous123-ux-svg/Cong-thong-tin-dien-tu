import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AiInsightsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Topbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1920px] px-6 pb-12 pt-8 md:px-10 lg:px-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
