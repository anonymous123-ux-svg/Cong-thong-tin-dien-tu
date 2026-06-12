"use client";

import { Pencil, Share2 } from "lucide-react";

export default function TaskMemberActions() {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => {
          // Template behavior: no-op.
        }}
        className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-6 py-3 font-bold text-[#2D2DE8] shadow-sm transition-all hover:shadow-md"
      >
        <Share2 className="h-4 w-4" />
        Invite
      </button>

      <button
        type="button"
        onClick={() => {
          // Template behavior: no-op.
        }}
        className="flex items-center gap-2 rounded-full bg-[#2D2DE8] px-8 py-3 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
      >
        <Pencil className="h-4 w-4" />
        Manage Task
      </button>
    </div>
  );
}
