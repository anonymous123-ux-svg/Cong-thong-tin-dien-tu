import Link from "next/link";
import { Plus } from "lucide-react";

export default function CoursesHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-2">
          Courses &amp; Curriculum
        </h1>

        <p className="text-slate-500 max-w-xl">
          Curate and manage academic modules, track student progress, and
          analyze learning outcomes across the department.
        </p>
      </div>

      <Link
        href="/admin/courses/create-course"
        className="flex items-center gap-2 px-6 py-3 bg-indigo-700 text-white rounded-full font-semibold shadow-lg shadow-indigo-700/20 hover:scale-[1.02] transition-all"
      >
        <Plus className="h-5 w-5" />
        Create New Course
      </Link>
    </header>
  );
}
