"use client";

import { useId, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Search,
  Timer,
  UploadCloud,
} from "lucide-react";

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"] as const;

type Priority = (typeof PRIORITY_OPTIONS)[number];

type Props = {
  modules: string[];
};

function FieldLabel({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500"
    >
      {children}
    </label>
  );
}

export default function CreateDeadlineForm({ modules }: Props) {
  const taskId = useId();
  const titleId = useId();
  const moduleId = useId();
  const dateTimeId = useId();
  const reminderId = useId();
  const descId = useId();
  const uploadId = useId();

  const [linkedTask, setLinkedTask] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [module, setModule] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("High");
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderTiming, setReminderTiming] = useState("24 Hours before");
  const [description, setDescription] = useState<string>("");

  const reminderOptions = useMemo(
    () => ["24 Hours before", "2 Days before", "1 Week before", "Custom..."],
    [],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
      <form
        className="space-y-8 p-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-2">
          <FieldLabel htmlFor={taskId}>Select Task</FieldLabel>
          <div className="relative">
            <select
              id={taskId}
              value={linkedTask}
              onChange={(e) => setLinkedTask(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Link to an existing task...</option>
              <option value="Literature Review - Thesis">
                Literature Review - Thesis
              </option>
              <option value="Lab Report #4 - Thermodynamics">
                Lab Report #4 - Thermodynamics
              </option>
              <option value="Final Presentation Preparation">
                Final Presentation Preparation
              </option>
              <option value="Problem Set 8 - Calc III">
                Problem Set 8 - Calc III
              </option>
            </select>
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <p className="ml-1 text-[11px] font-medium text-slate-500">
            Linking to a task automatically syncs progress updates.
          </p>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor={titleId}>Deadline Title</FieldLabel>
          <input
            id={titleId}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Mid-term Research Paper Submission"
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor={moduleId}>Associated Module</FieldLabel>
            <div className="relative">
              <select
                id={moduleId}
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a module...</option>
                {modules.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor={dateTimeId}>Date & Time</FieldLabel>
            <div className="relative">
              <input
                id={dateTimeId}
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                type="datetime-local"
              />
              <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-y border-slate-100 py-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Priority Level
            </p>
            <div className="flex flex-wrap gap-2">
              {PRIORITY_OPTIONS.map((value) => {
                const selected = value === priority;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPriority(value)}
                    className={
                      selected
                        ? "rounded-lg border-2 border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-indigo-200"
                        : "rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-600 transition-all hover:border-indigo-600 hover:text-indigo-600"
                    }
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                Reminder Settings
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500">
                  Enable
                </span>
                <button
                  type="button"
                  aria-label="Toggle reminders"
                  onClick={() => setRemindersEnabled((v) => !v)}
                  className={
                    remindersEnabled
                      ? "relative h-6 w-11 rounded-full bg-indigo-600 transition"
                      : "relative h-6 w-11 rounded-full bg-slate-200 transition"
                  }
                >
                  <span
                    className={
                      remindersEnabled
                        ? "absolute left-5.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                        : "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="relative">
              <select
                id={reminderId}
                value={reminderTiming}
                onChange={(e) => setReminderTiming(e.target.value)}
                disabled={!remindersEnabled}
                aria-label="Reminder timing"
                className={
                  remindersEnabled
                    ? "w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    : "w-full appearance-none rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-400 outline-none"
                }
              >
                {reminderOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <Timer className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor={descId}>Description</FieldLabel>
          <textarea
            id={descId}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe the requirements or specific goals for this deadline..."
            className="min-h-40 w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <p className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            Attachments
          </p>
          <label
            htmlFor={uploadId}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center transition-all hover:border-indigo-600 hover:bg-white"
          >
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm transition-transform group-hover:scale-110">
              <UploadCloud className="h-7 w-7 text-indigo-600" />
            </span>
            <p className="text-lg font-semibold text-slate-900">
              Drop assignment files or click to upload
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              PDF, DOCX, or ZIP (Max 20MB)
            </p>
            <input id={uploadId} className="hidden" type="file" multiple />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-6 pt-6">
          <button
            type="button"
            className="rounded-xl px-10 py-4 font-semibold text-slate-500 transition-colors hover:bg-slate-50"
            onClick={() => {
              setLinkedTask("");
              setTitle("");
              setModule("");
              setDateTime("");
              setPriority("High");
              setRemindersEnabled(true);
              setReminderTiming("24 Hours before");
              setDescription("");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-16 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:opacity-95 hover:scale-[1.01] active:scale-95"
          >
            Create Deadline
          </button>
        </div>
      </form>
    </div>
  );
}
