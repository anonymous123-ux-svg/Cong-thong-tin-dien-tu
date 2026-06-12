"use client";

import {
  BarChart3,
  GraduationCap,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";

export default function CreateClassMobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md flex justify-around items-center h-20 px-4 z-50 border-t border-slate-100">
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-slate-400"
      >
        <LayoutDashboard className="h-5 w-5" />
        <span className="text-[10px] font-bold">HOME</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-indigo-600"
      >
        <GraduationCap className="h-5 w-5" />
        <span className="text-[10px] font-bold">COURSES</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-slate-400"
      >
        <BarChart3 className="h-5 w-5" />
        <span className="text-[10px] font-bold">DATA</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-1 text-slate-400"
      >
        <UserCircle className="h-5 w-5" />
        <span className="text-[10px] font-bold">PROFILE</span>
      </button>
    </nav>
  );
}
