import type { ReactNode } from "react";

export default function ClassListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-8">
      {children}
    </div>
  );
}
