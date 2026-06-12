import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateClassHeader() {
  return (
    <header>
      <Link
        href="/admin/course-builder"
        className="inline-flex items-center gap-2 text-indigo-600 mb-8 -mt-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-semibold tracking-wide uppercase">
          Back to Course Builder
        </span>
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
        Curate New Class
      </h1>

      <p className="text-on-surface-variant max-w-[60ch] text-lg">
        Define the parameters for your new educational module. Ensure capacity
        and scheduling align with faculty availability.
      </p>
    </header>
  );
}
