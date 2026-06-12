"use client";

import { Download, Send, TriangleAlert } from "lucide-react";

export default function QuickActionsBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur-md lg:left-64">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="hidden text-xs font-bold tracking-widest text-slate-500 uppercase lg:inline">
            Quick Actions:
          </span>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            <TriangleAlert className="h-4 w-4" />
            Review overdue (3)
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            <Send className="h-4 w-4" />
            Send reminders
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-200"
          >
            <Download className="h-4 w-4" />
            Export schedule
          </button>

          <button
            type="button"
            className="rounded-full bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-700/20 transition hover:bg-indigo-800"
          >
            Sync with Calendar
          </button>
        </div>
      </div>
    </footer>
  );
}
