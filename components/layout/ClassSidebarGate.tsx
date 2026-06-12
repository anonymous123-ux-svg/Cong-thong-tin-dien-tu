"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";

export default function ClassSidebarGate() {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith("/class/classes/newClass");

  if (hideSidebar) return null;
  return <Sidebar />;
}
