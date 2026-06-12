"use client";

import { useEffect, type ReactNode } from "react";

export default function FocusedWorkspaceShell({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 text-gray-900">
      {children}
    </div>
  );
}
