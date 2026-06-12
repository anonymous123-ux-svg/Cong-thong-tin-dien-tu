import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f6fb] text-on-surface dark:bg-slate-950">
      <Topbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
