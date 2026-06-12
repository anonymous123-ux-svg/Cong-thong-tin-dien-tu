"use client";

import { Plus } from "lucide-react";

export default function ResourcesFab() {
  return (
    <button
      type="button"
      onClick={() => {
        // Template behavior: no-op.
      }}
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#3333CC] text-white shadow-2xl transition active:scale-95 hover:scale-105"
      aria-label="Create"
    >
      <Plus className="h-7 w-7" />
    </button>
  );
}
