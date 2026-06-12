"use client";

import Link from "next/link";
import { BookOpen, Bot, Home, User } from "lucide-react";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3 md:hidden bg-white shadow-2xl rounded-t-3xl">
      <Link
        className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-all active:scale-95"
        href="#"
      >
        <Home className="h-5 w-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
          Home
        </span>
      </Link>

      <Link
        className="flex flex-col items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl p-2 transition-all active:scale-95"
        href="#"
      >
        <BookOpen className="h-5 w-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
          Learn
        </span>
      </Link>

      <Link
        className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-all active:scale-95"
        href="#"
      >
        <Bot className="h-5 w-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
          AI
        </span>
      </Link>

      <Link
        className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-all active:scale-95"
        href="#"
      >
        <User className="h-5 w-5" />
        <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
          Profile
        </span>
      </Link>
    </div>
  );
}
