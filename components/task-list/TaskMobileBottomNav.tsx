import Link from "next/link";
import { CalendarDays, Home, ListChecks, Plus, User } from "lucide-react";

export default function TaskMobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-surface-container-low bg-white/90 px-6 py-2 backdrop-blur-xl md:hidden">
      <Link href="/" className="flex flex-col items-center gap-1 text-outline">
        <Home className="h-5 w-5" />
        <span className="text-[10px] font-bold">Home</span>
      </Link>

      <Link
        href="/admin/tasks/list"
        className="flex flex-col items-center gap-1 text-primary"
        aria-current="page"
      >
        <ListChecks className="h-5 w-5" />
        <span className="text-[10px] font-bold">Tasks</span>
      </Link>

      <Link
        href="/admin/tasks/create"
        className="-mt-8 flex flex-col items-center gap-1"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg">
          <Plus className="h-6 w-6" />
        </div>
        <span className="mt-1 text-[10px] font-bold text-primary">Create</span>
      </Link>

      <Link
        href="/admin/tasks"
        className="flex flex-col items-center gap-1 text-outline"
      >
        <CalendarDays className="h-5 w-5" />
        <span className="text-[10px] font-bold">Schedule</span>
      </Link>

      <a href="#" className="flex flex-col items-center gap-1 text-outline">
        <User className="h-5 w-5" />
        <span className="text-[10px] font-bold">Profile</span>
      </a>
    </nav>
  );
}
