"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import AttachmentsDropzone from "./AttachmentsDropzone";
import PriorityPicker from "./PriorityPicker";
import type { CreateTaskFormState, TaskPriority } from "./types";

const ASSIGNED_CLASS_OPTIONS = [
  "Select Class/Course",
  "Intro to Philosophy - Section A",
  "Modern Literature - Group 2",
  "Computational Logic",
] as const;

const INITIAL_STATE: CreateTaskFormState = {
  title: "",
  description: "",
  assignedClass: ASSIGNED_CLASS_OPTIONS[0],
  deadline: "",
  priority: "medium",
  attachments: [],
};

export default function CreateTaskClient() {
  const [form, setForm] = useState<CreateTaskFormState>(INITIAL_STATE);

  const canPublish = useMemo(() => {
    return form.title.trim().length > 0;
  }, [form.title]);

  const updateField = useCallback(
    <K extends keyof CreateTaskFormState>(
      key: K,
      value: CreateTaskFormState[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleDiscard = useCallback(() => {
    setForm(INITIAL_STATE);
  }, []);

  const handlePublish = useCallback(() => {
    if (!canPublish) return;
    // Wire this up to your API later.
    // Keeping it side-effect free avoids hydration issues.
    console.info("Publishing task:", {
      title: form.title,
      description: form.description,
      assignedClass: form.assignedClass,
      deadline: form.deadline,
      priority: form.priority,
      attachmentsCount: form.attachments.length,
    });
  }, [canPublish, form]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create New Task
          </h1>
          <p className="text-gray-500 mt-1">
            Define learning objectives and assignments for your students.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={!canPublish}
            className="px-8 py-2.5 rounded-full bg-indigo-700 text-white font-semibold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            Publish Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-2xl shadow-[0px_20px_40px_rgba(21,28,39,0.04)]">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">
              Task Details
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="task-title"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Task Title
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Advanced Calculus Assignment #4"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Provide detailed instructions for the students..."
                  rows={6}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-[0px_20px_40px_rgba(21,28,39,0.04)]">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Attachments
            </h2>
            <AttachmentsDropzone
              onFilesSelected={(files) => updateField("attachments", files)}
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-8 rounded-2xl shadow-[0px_20px_40px_rgba(21,28,39,0.04)]">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">
              Task Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="assigned-class"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Assigned Class
                </label>

                <div className="relative">
                  <select
                    id="assigned-class"
                    value={form.assignedClass}
                    onChange={(e) =>
                      updateField("assignedClass", e.target.value)
                    }
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 text-gray-900 appearance-none"
                  >
                    {ASSIGNED_CLASS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Deadline
                </label>
                <div className="relative">
                  <input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Priority
                </label>
                <PriorityPicker
                  value={form.priority}
                  onChange={(priority: TaskPriority) =>
                    updateField("priority", priority)
                  }
                />
              </div>
            </div>
          </section>

          <section className="bg-indigo-700 p-6 rounded-2xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Curator Tip</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Setting a medium priority with a 3-day buffer before exams
                increases submission rates by 24%.
              </p>
              <button
                type="button"
                className="mt-4 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                Read more <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Sparkles className="h-24 w-24" />
            </div>
          </section>

          <section className="rounded-2xl overflow-hidden h-48 relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnZU5BYYMz2PBDkGu-uYODIu5k1ko4hjMk5doVo6HCQlqVRXZcnyH0dYunzl2_rMALi3iSnh6jS2ZFc31x9YN_MlIgI3wLIAzCXFGNuVTW7UKSBaUHzeJyRXbD3FaTJR_4TbTQr_m4Kd7f9sVDWvzqIJuHpn9Mx5N9GOPsCp_UIBcJIv0h8Xj2boNu8gK59ABWyxbZoATX_Ml8357FAIdqHqyORHKYQy9_7aDA4hVdVWmP1LPJW1Ax6w26OM0gHaeo0FjGWNZ2kyy_"
              alt="Modern minimalist workspace with a sleek laptop, notebook, and ceramic coffee cup on a light oak desk with soft natural light"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">
                Keep your workspace as organized as your tasks.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
