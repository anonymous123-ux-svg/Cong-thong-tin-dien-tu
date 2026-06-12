"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MoreHorizontal, PencilLine, UserMinus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ClassListMember } from "./types";

type MemberDetailDrawerProps = {
  classId: string;
  onEditProfile?: (memberId: string) => void;
  open: boolean;
  member: ClassListMember | null;
  onClose: () => void;
};

function clampInt(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function xorshift32(state: number) {
  let x = state >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

function heatCellClass(level: number) {
  switch (level) {
    case 0:
      return "bg-teal-100";
    case 1:
      return "bg-teal-200";
    case 2:
      return "bg-teal-300";
    case 3:
      return "bg-teal-400";
    case 4:
      return "bg-teal-500";
    default:
      return "bg-teal-600";
  }
}

export default function MemberDetailDrawer({
  classId,
  onEditProfile,
  open,
  member,
  onClose,
}: MemberDetailDrawerProps) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  const details = useMemo(() => {
    if (!member) return null;

    const gpa = Math.min(4, 3 + member.progressPct / 100);
    const attendance = clampInt(70 + member.progressPct * 0.3, 0, 100);
    const tasksTotal = 14;
    const tasksDone = clampInt(
      (member.progressPct / 100) * tasksTotal,
      0,
      tasksTotal,
    );

    const subtitle =
      member.role === "Student"
        ? "B.Sc. Computer Science (Honors)"
        : member.role === "TA"
          ? "Teaching Assistant"
          : "Course Lecturer";

    const seed0 = hashSeed(`${member.id}:${member.email}`);
    let seed = seed0;
    const heat = Array.from({ length: 36 }).map(() => {
      seed = xorshift32(seed);
      return seed % 6;
    });

    return {
      subtitle,
      gpa: Number(gpa.toFixed(1)),
      attendance,
      tasksDone,
      tasksTotal,
      heat,
      notes:
        "“Elena is a top performer but missed the last optional workshop.”",
    };
  }, [member]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setEntered(false);
    window.setTimeout(() => onClose(), 220);
  }, [closing, onClose]);

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

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, requestClose]);

  if (!open || !member || !details) return null;

  const visible = entered && !closing;

  return (
    <>
      <button
        type="button"
        aria-label="Close member details"
        onClick={requestClose}
        className={
          visible
            ? "fixed inset-0 z-100 cursor-default bg-black/5 opacity-100 backdrop-blur-[2px] transition-opacity duration-200"
            : "fixed inset-0 z-100 cursor-default bg-black/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-200"
        }
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Member details for ${member.name}`}
        onClick={(e) => e.stopPropagation()}
        className={
          visible
            ? "fixed right-0 top-0 z-110 flex h-full w-100 translate-x-0 transform flex-col overflow-y-auto border-l border-gray-100 bg-white shadow-2xl transition-transform duration-300 ease-out"
            : "fixed right-0 top-0 z-110 flex h-full w-100 translate-x-full transform flex-col overflow-y-auto border-l border-gray-100 bg-white shadow-2xl transition-transform duration-300 ease-out"
        }
      >
        <div className="sticky top-0 z-10 flex items-start justify-between bg-white/95 p-6 pb-4 backdrop-blur-md">
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="-ml-2 cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="More options"
            className="cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-8 px-8 pb-10">
          {/* Avatar + Name */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <Image
                src={member.avatarUrl}
                alt={member.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {details.subtitle}
              </p>

              {member.tag ? (
                <div className="mt-3 flex justify-center">
                  <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                    {member.tag.label}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                GPA
              </span>
              <span className="text-lg font-bold text-gray-900">
                {details.gpa}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Atten.
              </span>
              <span className="text-lg font-bold text-gray-900">
                {details.attendance}%
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Tasks
              </span>
              <span className="text-lg font-bold text-gray-900">
                {details.tasksDone}/{details.tasksTotal}
              </span>
            </div>
          </div>

          {/* Learning Activity */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Learning Activity
              </h3>
              <span className="text-[10px] font-medium text-gray-400">
                Last 3 Months
              </span>
            </div>

            <div className="grid w-full grid-cols-12 gap-1">
              {details.heat.map((level, idx) => (
                <div
                  key={`${member.id}-heat-${idx}`}
                  className={`h-4 w-full rounded-sm ${heatCellClass(level)}`}
                />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              Recent Activity
            </h3>

            <div className="relative space-y-4 before:absolute before:bottom-2 before:left-1.75 before:top-2 before:w-0.5 before:bg-gray-100">
              <div className="relative pl-7">
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-indigo-700 ring-4 ring-white" />
                <p className="text-sm font-semibold text-gray-900">
                  Ethics in AI Final Essay
                </p>
                <p className="text-[11px] text-gray-400">
                  Submitted 2 days ago
                </p>
              </div>

              <div className="relative pl-7">
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-green-500 ring-4 ring-white" />
                <p className="text-sm font-semibold text-gray-600">
                  Group Seminar
                </p>
                <p className="text-[11px] text-gray-400">Completed</p>
              </div>
            </div>
          </section>

          {/* Internal Notes */}
          <section>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Internal Notes
            </h3>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-sm italic leading-relaxed text-gray-700">
                {details.notes}
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="mt-2 space-y-3">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-900 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-800"
            >
              <Mail className="h-5 w-5" />
              Message
            </button>

            <div className="grid grid-cols-2 gap-3">
              {onEditProfile ? (
                <button
                  type="button"
                  onClick={() => onEditProfile(member.id)}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
                  aria-label={`Edit profile for ${member.name}`}
                >
                  <PencilLine className="h-5 w-5" />
                  Edit Profile
                </button>
              ) : (
                <Link
                  href={`/members/classes/${classId}/members/${member.id}/edit`}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50"
                  aria-label={`Edit profile for ${member.name}`}
                >
                  <PencilLine className="h-5 w-5" />
                  Edit Profile
                </Link>
              )}

              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-red-50 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-100"
              >
                <UserMinus className="h-5 w-5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
