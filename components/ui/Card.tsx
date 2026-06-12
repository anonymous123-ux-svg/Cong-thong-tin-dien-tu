import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/60 bg-white shadow-[0px_20px_40px_rgba(21,28,39,0.06)]",
        className,
      )}
      {...props}
    />
  );
}
