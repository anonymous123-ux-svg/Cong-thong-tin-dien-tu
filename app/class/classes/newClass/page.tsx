"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Search,
  UploadCloud,
  UserCheck,
} from "lucide-react";

// ─── Colour tokens (hardcoded from design) ────────────────────────────────────
const C = {
  pageBg: "#F8F9FC",
  white: "#ffffff",
  textPrimary: "#0F172A",
  textMuted: "#64748B",
  textPlaceholder: "#94A3B8",
  border: "#E2E8F0",
  inputBg: "#F1F5F9",
  indigo: "#4338CA",
  indigoLight: "#EEF2FF",
  indigoMid: "#C7D2FE",
  green: "#10B981",
  greenLight: "#ECFDF5",
  greenBorder: "#A7F3D0",
  saveDraftBg: "#E2E8F0",
};

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      className="relative flex h-6 w-12 cursor-pointer items-center rounded-full px-1"
      type="button"
      aria-label={label}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      style={{ backgroundColor: checked ? C.indigo : "#CBD5E1" }}
    >
      <div
        className={
          checked
            ? "ml-auto h-4 w-4 rounded-full bg-white"
            : "h-4 w-4 rounded-full bg-white"
        }
      />
    </button>
  );
}

// Day button variants
function DayBtn({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  if (active)
    return (
      <button
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl p-3 text-xs font-bold text-white shadow-sm"
        type="button"
        onClick={onClick}
        style={{ backgroundColor: C.indigo }}
      >
        {label}
      </button>
    );
  if (disabled)
    return (
      <button
        className="flex cursor-not-allowed flex-col items-center justify-center rounded-xl border p-3 text-xs font-bold opacity-40"
        type="button"
        style={{ borderColor: C.border, color: C.textPlaceholder }}
      >
        {label}
      </button>
    );
  return (
    <button
      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border p-3 text-xs font-bold transition-colors hover:bg-indigo-50"
      type="button"
      onClick={onClick}
      style={{ borderColor: C.border, color: C.textMuted }}
    >
      {label}
    </button>
  );
}

type CourseOption = {
  id: string;
  label: string;
};

type InstructorOption = {
  id: string;
  name: string;
  dept: string;
  initials: string;
};

const COURSE_OPTIONS: CourseOption[] = [
  { id: "science", label: "Science & Technology" },
  { id: "humanities", label: "Humanities" },
  { id: "logic", label: "Computational Logic" },
  { id: "arts", label: "Applied Arts" },
];

const INSTRUCTORS: InstructorOption[] = [
  {
    id: "detmer",
    name: "Dr. Julian Detmer",
    dept: "Quantum Physics Dept.",
    initials: "JD",
  },
  {
    id: "thorne",
    name: "Dr. Julian Thorne",
    dept: "Computer Science Dept.",
    initials: "JT",
  },
  {
    id: "rodriguez",
    name: "Prof. Elena Rodriguez",
    dept: "Mathematics Dept.",
    initials: "ER",
  },
  {
    id: "jenkins",
    name: "Dr. Sarah Jenkins",
    dept: "Physics Dept.",
    initials: "SJ",
  },
];

export default function NewClassPage() {
  // Common input/select class
  const inputCls =
    "w-full rounded-xl border-none px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
  const labelCls = "block text-xs font-bold uppercase tracking-widest mb-4";
  const cardCls = "rounded-2xl bg-white p-8 shadow-sm";

  const [courseId, setCourseId] = useState(COURSE_OPTIONS[0]?.id ?? "");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({
    MON: false,
    TUE: true,
    WED: false,
    THU: true,
    FRI: false,
    SAT: false,
    SUN: false,
  });

  const [waitlistEnabled, setWaitlistEnabled] = useState(true);
  const [mandatoryAttendance, setMandatoryAttendance] = useState(false);
  const [automatedGrading, setAutomatedGrading] = useState(true);
  const [publicVisibility, setPublicVisibility] = useState(true);

  const [instructorQuery, setInstructorQuery] = useState("");
  const [selectedInstructorId, setSelectedInstructorId] = useState(
    INSTRUCTORS[0]?.id ?? "",
  );
  const [isInstructorMenuOpen, setIsInstructorMenuOpen] = useState(false);
  const closeInstructorMenuTimer = useRef<number | null>(null);

  const selectedInstructor = useMemo(() => {
    return (
      INSTRUCTORS.find((i) => i.id === selectedInstructorId) ?? INSTRUCTORS[0]
    );
  }, [selectedInstructorId]);

  const filteredInstructors = useMemo(() => {
    const q = instructorQuery.trim().toLowerCase();
    if (!q) return INSTRUCTORS;
    return INSTRUCTORS.filter((i) => {
      return (
        i.name.toLowerCase().includes(q) || i.dept.toLowerCase().includes(q)
      );
    });
  }, [instructorQuery]);

  const toggleDay = (key: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: C.pageBg, color: C.textPrimary }}
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
        {/* ── Top nav bar ── */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/class/classes"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-indigo-50"
              style={{ color: C.textMuted }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <span style={{ color: C.border }}>|</span>
            <span className="text-sm font-bold" style={{ color: C.indigo }}>
              The Academic Curator
            </span>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: C.textMuted }}
          >
            New Curriculum Entry
          </span>
        </header>

        {/* ── Page title ── */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Create New Class
          </h1>
          <p className="mx-auto max-w-xl" style={{ color: C.textMuted }}>
            Architect the future of learning. Define your parameters, set the
            schedule, and prepare the resources for your students.
          </p>
        </div>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* ── Row 1: Core Identity + Description ── */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Core Identity */}
            <div
              className={`${cardCls} lg:col-span-8`}
              style={{ border: `1px solid ${C.border}` }}
            >
              <label className={labelCls} style={{ color: C.textPlaceholder }}>
                Core Identity
              </label>
              <div className="space-y-4">
                <input
                  className={inputCls}
                  style={{ backgroundColor: C.inputBg, color: C.textPrimary }}
                  placeholder="Class Name (e.g., Advanced Quantum Mechanics)"
                  type="text"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className={inputCls}
                    style={{ backgroundColor: C.inputBg, color: C.textMuted }}
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputCls}
                    style={{ backgroundColor: C.inputBg, color: C.textPrimary }}
                    placeholder="Section Name"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`${cardCls} lg:col-span-4`}
              style={{ border: `1px solid ${C.border}` }}
            >
              <label className={labelCls} style={{ color: C.textPlaceholder }}>
                Description
              </label>
              <textarea
                className="w-full rounded-xl border-none px-4 py-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 h-36"
                style={{ backgroundColor: C.inputBg }}
                placeholder="Briefly define the pedagogical goals..."
              />
            </div>
          </section>

          {/* ── Row 2: Lead Instructor + Logistics | Schedule ── */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Lead Instructor */}
              <div
                className={cardCls}
                style={{ border: `1px solid ${C.border}` }}
              >
                <label
                  className={labelCls}
                  style={{ color: C.textPlaceholder }}
                >
                  Lead Instructor
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: C.textPlaceholder }}
                  />
                  <input
                    className="w-full rounded-xl border-none pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    style={{ backgroundColor: C.inputBg }}
                    placeholder="Search Faculty..."
                    type="text"
                    value={instructorQuery}
                    onChange={(e) => {
                      setInstructorQuery(e.target.value);
                      setIsInstructorMenuOpen(true);
                    }}
                    onFocus={() => {
                      if (closeInstructorMenuTimer.current) {
                        window.clearTimeout(closeInstructorMenuTimer.current);
                        closeInstructorMenuTimer.current = null;
                      }
                      setIsInstructorMenuOpen(true);
                    }}
                    onBlur={() => {
                      closeInstructorMenuTimer.current = window.setTimeout(
                        () => {
                          setIsInstructorMenuOpen(false);
                        },
                        120,
                      );
                    }}
                  />

                  {isInstructorMenuOpen ? (
                    <div
                      className="absolute left-0 right-0 mt-2 overflow-hidden rounded-xl border bg-white shadow-lg z-10"
                      style={{ borderColor: C.border }}
                      onMouseDown={(e) => {
                        // Prevent input blur from closing the menu before click
                        e.preventDefault();
                      }}
                    >
                      {filteredInstructors.length ? (
                        filteredInstructors.map((inst) => (
                          <button
                            key={inst.id}
                            type="button"
                            className={
                              inst.id === selectedInstructorId
                                ? "flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50"
                                : "flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
                            }
                            onClick={() => {
                              setSelectedInstructorId(inst.id);
                              setInstructorQuery("");
                              setIsInstructorMenuOpen(false);
                            }}
                          >
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: C.indigo }}
                            >
                              {inst.initials}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold">
                                {inst.name}
                              </div>
                              <div
                                className="truncate text-xs"
                                style={{ color: C.textMuted }}
                              >
                                {inst.dept}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div
                          className="px-4 py-3 text-sm"
                          style={{ color: C.textMuted }}
                        >
                          No matching faculty.
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Selected instructor */}
                <div
                  className="mt-4 flex items-center gap-3 rounded-xl p-3"
                  style={{
                    backgroundColor: C.indigoLight,
                    border: `1px solid ${C.indigoMid}`,
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: C.indigo }}
                  >
                    {selectedInstructor?.initials ?? "JD"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedInstructor?.name ?? "Dr. Julian Detmer"}
                    </p>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      {selectedInstructor?.dept ?? "Quantum Physics Dept."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logistics */}
              <div
                className={cardCls}
                style={{ border: `1px solid ${C.border}` }}
              >
                <label
                  className={labelCls}
                  style={{ color: C.textPlaceholder }}
                >
                  Logistics
                </label>

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Max Student Capacity
                  </span>
                  <input
                    className="w-20 rounded-lg border-none px-3 py-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    style={{ backgroundColor: C.inputBg }}
                    type="number"
                    defaultValue={30}
                  />
                </div>

                <div
                  className="flex items-center justify-between rounded-xl p-4"
                  style={{ backgroundColor: C.inputBg }}
                >
                  <div>
                    <p className="text-sm font-semibold">Enable Waitlist</p>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      Allow students to queue
                    </p>
                  </div>
                  <Toggle
                    label="Toggle waitlist"
                    checked={waitlistEnabled}
                    onChange={setWaitlistEnabled}
                  />
                </div>
              </div>
            </div>

            {/* Schedule & Duration */}
            <div
              className={`${cardCls} lg:col-span-7`}
              style={{ border: `1px solid ${C.border}` }}
            >
              <label className={labelCls} style={{ color: C.textPlaceholder }}>
                Schedule &amp; Duration
              </label>

              {/* Day picker */}
              <div className="mb-6 grid grid-cols-7 gap-2">
                <DayBtn
                  label="MON"
                  active={selectedDays.MON}
                  onClick={() => toggleDay("MON")}
                />
                <DayBtn
                  label="TUE"
                  active={selectedDays.TUE}
                  onClick={() => toggleDay("TUE")}
                />
                <DayBtn
                  label="WED"
                  active={selectedDays.WED}
                  onClick={() => toggleDay("WED")}
                />
                <DayBtn
                  label="THU"
                  active={selectedDays.THU}
                  onClick={() => toggleDay("THU")}
                />
                <DayBtn
                  label="FRI"
                  active={selectedDays.FRI}
                  onClick={() => toggleDay("FRI")}
                />
                <DayBtn
                  label="SAT"
                  active={selectedDays.SAT}
                  onClick={() => toggleDay("SAT")}
                />
                <DayBtn
                  label="SUN"
                  active={selectedDays.SUN}
                  onClick={() => toggleDay("SUN")}
                />
              </div>

              {/* Time slot + Date range */}
              <div className="mb-6 grid grid-cols-1 gap-6">
                <div>
                  <p
                    className="mb-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: C.textPlaceholder }}
                  >
                    Time Slot
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      className="w-full rounded-xl border-none px-3 py-3 pr-10 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-44"
                      style={{ backgroundColor: C.inputBg }}
                      type="time"
                      defaultValue="09:00"
                    />
                    <span
                      className="hidden text-xs sm:inline"
                      style={{ color: C.textPlaceholder }}
                    >
                      to
                    </span>
                    <input
                      className="w-full rounded-xl border-none px-3 py-3 pr-10 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-44"
                      style={{ backgroundColor: C.inputBg }}
                      type="time"
                      defaultValue="10:30"
                    />
                  </div>
                </div>

                <div>
                  <p
                    className="mb-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: C.textPlaceholder }}
                  >
                    Date Range
                  </p>
                  <input
                    className="w-full min-w-0 rounded-xl border-none px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    style={{ backgroundColor: C.inputBg }}
                    placeholder="Sep 12 - Dec 20"
                    type="text"
                  />
                </div>
              </div>

              {/* No conflict banner */}
              <div
                className="flex items-center gap-3 rounded-xl p-4"
                style={{
                  backgroundColor: C.greenLight,
                  border: `1px solid ${C.greenBorder}`,
                }}
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0"
                  style={{ color: C.green }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#065F46" }}
                >
                  No scheduling conflicts detected for this period.
                </span>
              </div>
            </div>
          </section>

          {/* ── Row 3: Class Settings + Course Materials ── */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Class Settings */}
            <div
              className={cardCls}
              style={{ border: `1px solid ${C.border}` }}
            >
              <label className={labelCls} style={{ color: C.textPlaceholder }}>
                Class Settings
              </label>
              <div className="space-y-2">
                {/* Mandatory Attendance — OFF */}
                <div className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <UserCheck
                      className="h-4 w-4"
                      style={{ color: C.indigo }}
                    />
                    <span className="text-sm font-medium">
                      Mandatory Attendance
                    </span>
                  </div>
                  <Toggle
                    label="Toggle mandatory attendance"
                    checked={mandatoryAttendance}
                    onChange={setMandatoryAttendance}
                  />
                </div>

                {/* Automated Grading — ON */}
                <div className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck
                      className="h-4 w-4"
                      style={{ color: C.indigo }}
                    />
                    <span className="text-sm font-medium">
                      Automated Grading
                    </span>
                  </div>
                  <Toggle
                    label="Toggle automated grading"
                    checked={automatedGrading}
                    onChange={setAutomatedGrading}
                  />
                </div>

                {/* Public Visibility — ON */}
                <div className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4" style={{ color: C.indigo }} />
                    <span className="text-sm font-medium">
                      Public Visibility
                    </span>
                  </div>
                  <Toggle
                    label="Toggle public visibility"
                    checked={publicVisibility}
                    onChange={setPublicVisibility}
                  />
                </div>
              </div>
            </div>

            {/* Course Materials */}
            <div
              className={cardCls}
              style={{ border: `1px solid ${C.border}` }}
            >
              <label className={labelCls} style={{ color: C.textPlaceholder }}>
                Course Materials
              </label>
              <div
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl p-10 text-center transition-colors hover:border-indigo-400"
                style={{
                  border: `2px dashed ${C.border}`,
                  backgroundColor: "#FAFBFF",
                }}
              >
                <UploadCloud
                  className="mb-3 h-10 w-10 transition-colors group-hover:text-indigo-500"
                  style={{ color: C.textPlaceholder }}
                />
                <p className="mb-1 text-sm font-semibold">
                  Drop syllabus or resources here
                </p>
                <p className="text-xs" style={{ color: C.textPlaceholder }}>
                  PDF, DOCX up to 10MB
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer actions ── */}
          <footer
            className="flex items-center justify-between pt-10"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <button
              className="cursor-pointer px-8 py-4 font-bold transition-colors hover:text-red-500"
              type="button"
              style={{ color: C.textMuted }}
            >
              Cancel
            </button>
            <div className="flex items-center gap-4">
              <button
                className="cursor-pointer rounded-full px-8 py-4 text-sm font-bold transition-colors hover:bg-slate-300"
                type="button"
                style={{ backgroundColor: C.saveDraftBg, color: C.textMuted }}
              >
                Save Draft
              </button>
              <button
                className="cursor-pointer rounded-full px-10 py-4 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                type="button"
                style={{
                  backgroundColor: C.indigo,
                  boxShadow: "0 4px 14px rgba(67,56,202,0.3)",
                }}
              >
                Create Class
              </button>
            </div>
          </footer>
        </form>
      </div>

      {/* Decorative blobs */}
      <div
        className="pointer-events-none fixed right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(67,56,202,0.04)" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(16,185,129,0.04)" }}
      />
    </div>
  );
}
