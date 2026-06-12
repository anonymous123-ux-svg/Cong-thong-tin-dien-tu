import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavBar";

export default function LecturerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <TopNavbar role="lecturer" />

      <div className="flex">
        <Sidebar role="lecturer" />

        <main className="flex-1 ml-64 pt-20 p-8 bg-slate-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
