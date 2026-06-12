import type { ReactNode } from "react";

export default function CreateClassLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="px-6 pt-8 pb-24 max-w-5xl mx-auto w-full">{children}</div>
  );
}
