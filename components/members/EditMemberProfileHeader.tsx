import Link from "next/link";
import { BadgeCheck, ChevronLeft } from "lucide-react";

export default function EditMemberProfileHeader({
  backHref,
}: {
  backHref: string;
}) {
  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Link
          href={backHref}
          className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-indigo-600 transition-opacity hover:opacity-80"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Members List
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Edit Member Profile
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Update academic credentials and administrative status.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
        <BadgeCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <span className="text-sm font-semibold text-emerald-700">
          Verified Academic Status
        </span>
      </div>
    </header>
  );
}
