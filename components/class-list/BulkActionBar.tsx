"use client";

import { Ban, Mail, PencilLine, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { MemberRole } from "./types";

type BulkMode = "idle" | "changeRole";

export default function BulkActionBar({
  selectedCount,
  onClear,
  onDeactivate,
  onChangeRole,
}: {
  selectedCount: number;
  onClear: () => void;
  onDeactivate: () => void;
  onChangeRole: (role: MemberRole) => void;
}) {
  const [mode, setMode] = useState<BulkMode>("idle");
  const [role, setRole] = useState<MemberRole>("Student");

  const visible = selectedCount > 0;

  const label = useMemo(() => {
    if (selectedCount === 1) return "member selected";
    return "members selected";
  }, [selectedCount]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 z-100 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-6 rounded-full border border-indigo-800/30 bg-indigo-950 px-6 py-4 text-white shadow-2xl shadow-indigo-900/40">
        <div className="flex items-center gap-3 border-r border-white/15 pr-6">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {selectedCount}
          </span>
          <span className="text-sm font-medium tracking-wide text-indigo-100">
            {label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "changeRole" ? "idle" : "changeRole"))
            }
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-indigo-300"
          >
            <PencilLine className="h-5 w-5" />
            Change Role
          </button>

          {mode === "changeRole" ? (
            <div className="flex items-center gap-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="h-9 cursor-pointer rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                aria-label="Select new role"
              >
                <option value="Student">Student</option>
                <option value="TA">TA</option>
                <option value="Lecturer">Lecturer</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  onChangeRole(role);
                  setMode("idle");
                }}
                className="h-9 rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Apply
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-indigo-300"
          >
            <Mail className="h-5 w-5" />
            Message
          </button>

          <button
            type="button"
            onClick={onDeactivate}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-red-300"
          >
            <Ban className="h-5 w-5" />
            Deactivate
          </button>
        </div>

        <button
          type="button"
          aria-label="Close bulk actions"
          onClick={() => {
            setMode("idle");
            onClear();
          }}
          className="ml-2 text-indigo-300 transition hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
