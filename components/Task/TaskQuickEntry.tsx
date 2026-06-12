"use client";

import { Edit3, UploadCloud } from "lucide-react";
import { useState } from "react";

type TaskFormState = {
  title: string;
  deadline: string;
  priority: "High Priority" | "Medium Priority" | "Low Priority";
};

const INITIAL_STATE: TaskFormState = {
  title: "",
  deadline: "",
  priority: "High Priority",
};

export default function TaskQuickEntry() {
  const [form, setForm] = useState<TaskFormState>(INITIAL_STATE);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm(INITIAL_STATE);
  };

  return (
    <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Edit3 className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-bold">Quick Task Entry</h3>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="taskTitle"
              className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500"
            >
              Task Title
            </label>
            <input
              id="taskTitle"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              type="text"
              placeholder="e.g. Quantum Mechanics Problem Set 4"
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div>
            <label
              htmlFor="taskDeadline"
              className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500"
            >
              Deadline
            </label>
            <input
              id="taskDeadline"
              value={form.deadline}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  deadline: event.target.value,
                }))
              }
              type="date"
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div>
            <label
              htmlFor="taskPriority"
              className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500"
            >
              Priority
            </label>
            <select
              id="taskPriority"
              value={form.priority}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  priority: event.target.value as TaskFormState["priority"],
                }))
              }
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600/20"
            >
              <option>High Priority</option>
              <option>Medium Priority</option>
              <option>Low Priority</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 transition hover:bg-slate-50"
        >
          <UploadCloud className="mb-2 h-10 w-10 text-slate-300 transition-colors group-hover:text-indigo-600" />
          <p className="text-sm font-medium text-slate-600">
            Drag files here or{" "}
            <span className="text-indigo-600 underline">browse</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            PDF, DOCX, or ZIP (Max 20MB)
          </p>
        </button>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-indigo-700 px-8 py-3 text-sm font-bold text-white transition hover:bg-indigo-800 hover:shadow-lg"
          >
            Add to Schedule
          </button>
        </div>
      </form>
    </section>
  );
}