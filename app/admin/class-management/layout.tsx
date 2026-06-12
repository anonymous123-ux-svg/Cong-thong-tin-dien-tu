import type { ReactNode } from "react";

export default function ClassManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">{children}</div>;
}
