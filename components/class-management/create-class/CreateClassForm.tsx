"use client";

import { useMemo, useRef, useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp, PencilLine } from "lucide-react";

const LECTURERS = [
  "Dr. Julian Thorne (Computer Science)",
  "Prof. Elena Rodriguez (Mathematics)",
  "Dr. Sarah Jenkins (Physics)",
] as const;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export default function CreateClassForm() {
  const classNameInputRef = useRef<HTMLInputElement | null>(null);
  const [className, setClassName] = useState("Advanced Computational Theory");
  const [isEditingClassName, setIsEditingClassName] = useState(false);
  const [capacity, setCapacity] = useState<number>(0);
  const [lecturer, setLecturer] = useState<(typeof LECTURERS)[number]>(
    LECTURERS[0],
  );
  const [days, setDays] = useState<Record<(typeof DAYS)[number], boolean>>({
    Monday: true,
    Tuesday: false,
    Wednesday: true,
    Thursday: false,
    Friday: true,
    Saturday: false,
  });

  const capacityError = useMemo(() => {
    return capacity < 1 ? "Capacity must be at least 1" : null;
  }, [capacity]);

  const toggleDay = (day: (typeof DAYS)[number]) => {
    setDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const stepCapacity = (delta: number) => {
    setCapacity((prev) => {
      const safePrev = Number.isFinite(prev) ? prev : 0;
      return Math.max(0, safePrev + delta);
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface tracking-wide uppercase">
            Class Name
          </label>
          <div className="relative">
            <input
              ref={classNameInputRef}
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name..."
              type="text"
              readOnly={!isEditingClassName}
              onBlur={() => setIsEditingClassName(false)}
              className="w-full bg-surface-container-low border-2 border-indigo-600 rounded-xl px-4 py-4 text-on-surface focus:ring-0 focus:outline-none transition-all"
            />
            <button
              type="button"
              aria-label="Edit class name"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-high"
              onClick={() => {
                setIsEditingClassName(true);
                requestAnimationFrame(() => {
                  classNameInputRef.current?.focus();
                  classNameInputRef.current?.select();
                });
              }}
            >
              <PencilLine className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-on-surface-variant">
            This name will appear on student transcripts and rosters.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface tracking-wide uppercase">
            Capacity
          </label>
          <div className="relative">
            <input
              value={Number.isNaN(capacity) ? "" : String(capacity)}
              onChange={(e) => {
                const next = Number(e.target.value);
                setCapacity(Number.isNaN(next) ? 0 : next);
              }}
              placeholder="Number of seats"
              type="number"
              min={0}
              className={
                capacityError
                  ? "w-full appearance-none bg-surface-container-low border-2 border-error rounded-xl px-4 py-4 pr-20 text-error focus:ring-0 focus:outline-none transition-all [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  : "w-full appearance-none bg-surface-container-low border-2 border-outline-variant/40 rounded-xl px-4 py-4 pr-20 text-on-surface focus:ring-0 focus:outline-none transition-all focus:border-indigo-600 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              }
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {capacityError ? (
                <AlertCircle className="h-5 w-5 text-error" strokeWidth={2.5} />
              ) : null}

              <div className="flex flex-col overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container-lowest">
                <button
                  type="button"
                  aria-label="Increase capacity"
                  onClick={() => stepCapacity(1)}
                  className="grid h-4 w-8 place-items-center text-on-surface-variant transition hover:bg-surface-container-high"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Decrease capacity"
                  onClick={() => stepCapacity(-1)}
                  className="grid h-4 w-8 place-items-center border-t border-outline-variant/30 text-on-surface-variant transition hover:bg-surface-container-high"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          {capacityError ? (
            <div className="flex items-center gap-1 text-error mt-1">
              <span className="text-sm font-medium">{capacityError}</span>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lead-lecturer"
            className="block text-sm font-semibold text-on-surface tracking-wide uppercase"
          >
            Lead Lecturer
          </label>
          <div className="relative group">
            <select
              id="lead-lecturer"
              value={lecturer}
              onChange={(e) =>
                setLecturer(e.target.value as (typeof LECTURERS)[number])
              }
              className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-indigo-600/20 transition-all cursor-pointer"
            >
              {LECTURERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-on-surface-variant" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-on-surface tracking-wide uppercase">
            Recurring Schedule
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DAYS.map((day) => (
              <label
                key={day}
                className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors border-2 border-transparent"
              >
                <input
                  checked={days[day]}
                  onChange={() => toggleDay(day)}
                  className="w-5 h-5 rounded border-outline-variant text-indigo-600 focus:ring-indigo-600"
                  type="checkbox"
                />
                <span className="text-sm font-medium">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            className="text-on-surface-variant font-semibold px-6 py-3 rounded-full hover:bg-surface-container-high transition-colors"
          >
            Discard Draft
          </button>
          <button
            type="submit"
            className="bg-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-indigo-700/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Create Class
          </button>
        </div>
      </form>
    </div>
  );
}
