import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  items: Array<{ label: string; href?: string }>;
};

export default function CourseBreadcrumb({ items }: Props) {
  return (
    <nav className="flex items-center gap-2 text-slate-400 mb-4 tracking-wide uppercase font-semibold text-xs">
      {items.map((item, idx) => {
        const last = idx === items.length - 1;

        return (
          <div key={`${item.label}-${idx}`} className="flex items-center gap-2">
            {item.href && !last ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-on-surface" : undefined}>
                {item.label}
              </span>
            )}

            {!last && <ChevronRight className="h-3.5 w-3.5" />}
          </div>
        );
      })}
    </nav>
  );
}
