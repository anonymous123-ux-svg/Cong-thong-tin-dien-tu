"use client";

import { ChevronDown, UserPlus, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

type MemberRoleOption = "Student" | "TA" | "Lecturer";

type AddMemberModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classTitle: string;
  currentMembers?: number;
  maxCapacity?: number;
};

function defaultSectionOptions(classTitle: string) {
  return [`${classTitle} - Sec A`, `${classTitle} - Sec B`] as const;
}

export default function AddMemberModal({
  open,
  onOpenChange,
  classTitle,
  currentMembers,
  maxCapacity,
}: AddMemberModalProps) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const sectionId = useId();

  const sections = useMemo(
    () => defaultSectionOptions(classTitle),
    [classTitle],
  );
  const firstSection = sections[0] ?? "";

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<MemberRoleOption>("Student");
  const [section, setSection] = useState<string>(firstSection);

  const capacityCurrent =
    typeof currentMembers === "number" && Number.isFinite(currentMembers)
      ? Math.max(0, Math.floor(currentMembers))
      : 42;

  const capacityMax =
    typeof maxCapacity === "number" && Number.isFinite(maxCapacity)
      ? Math.max(1, Math.floor(maxCapacity))
      : Math.max(50, capacityCurrent + 8);

  const seatsLeft = Math.max(0, capacityMax - capacityCurrent);
  const capacityPct = Math.max(
    0,
    Math.min(100, Math.round((capacityCurrent / capacityMax) * 100)),
  );

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setEntered(false);
    window.setTimeout(() => onOpenChange(false), 200);
  }, [closing, onOpenChange]);

  useEffect(() => {
    setSection(firstSection);
  }, [firstSection]);

  useEffect(() => {
    if (!open) return;

    setFullName("");
    setEmail("");
    setRole("Student");
    setSection(firstSection);
  }, [open, firstSection]);

  useEffect(() => {
    if (!open) return;

    setClosing(false);
    setEntered(false);

    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, requestClose]);

  if (!open) return null;

  const visible = entered && !closing;

  return (
    <div
      className={
        visible
          ? "fixed inset-0 z-110 flex items-center justify-center bg-black/40 p-4 opacity-100 backdrop-blur-sm transition-opacity duration-200"
          : "fixed inset-0 z-110 flex items-center justify-center bg-black/40 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-200"
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Add New Member"
    >
      <div
        className={
          visible
            ? "w-full max-w-120 translate-y-0 scale-100 overflow-hidden rounded-4xl bg-white shadow-2xl transition-transform duration-200"
            : "w-full max-w-120 translate-y-1 scale-[0.98] overflow-hidden rounded-4xl bg-white shadow-2xl transition-transform duration-200"
        }
      >
        <div className="p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Add New Member
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Invite a new person to your {classTitle} class.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={requestClose}
              className="cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              requestClose();
            }}
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor={nameId}
                className="ml-1 text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Full Name
              </label>
              <input
                id={nameId}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Doe"
                type="text"
                className="w-full rounded-2xl bg-indigo-50 px-5 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor={emailId}
                className="ml-1 text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Email Address
              </label>
              <input
                id={emailId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@university.edu"
                type="email"
                className="w-full rounded-2xl bg-indigo-50 px-5 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Role + Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor={roleId}
                  className="ml-1 text-xs font-bold uppercase tracking-widest text-gray-500"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    id={roleId}
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as MemberRoleOption)
                    }
                    className="w-full cursor-pointer appearance-none rounded-2xl bg-indigo-50 px-5 py-3.5 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="Student">Student</option>
                    <option value="TA">TA</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={sectionId}
                  className="ml-1 text-xs font-bold uppercase tracking-widest text-gray-500"
                >
                  Class Assignment
                </label>
                <div className="relative">
                  <select
                    id={sectionId}
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-2xl bg-indigo-50 px-5 py-3.5 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mt-6 rounded-2xl bg-white p-4 ring-2 ring-inset ring-slate-200">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Class Capacity
                </p>
                <span className="text-xl font-black text-gray-900">
                  {capacityCurrent}
                  <span className="text-sm font-medium text-gray-400">
                    /{capacityMax}
                  </span>
                </span>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-700">
                {seatsLeft} Seats Left
              </span>
            </div>

            <progress
              value={capacityPct}
              max={100}
              aria-label="Class capacity"
              className="h-1.5 w-full appearance-none overflow-hidden rounded-full bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 bg-gray-50 px-8 py-6">
          <button
            type="button"
            onClick={requestClose}
            className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={requestClose}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}
