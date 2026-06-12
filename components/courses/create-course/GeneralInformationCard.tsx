"use client";

import { Info } from "lucide-react";

import Card from "@/components/ui/Card";

type GeneralInformationCardProps = {
  title: string;
  category: string;
  level: string;
  description: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export default function GeneralInformationCard({
  title,
  category,
  level,
  description,
  onTitleChange,
  onCategoryChange,
  onLevelChange,
  onDescriptionChange,
}: GeneralInformationCardProps) {
  return (
    <Card className="bg-surface-container-lowest p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Info className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold">General Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="course-title"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Course Title
          </label>
          <input
            id="course-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Advanced Quantum Mechanics for Educators"
            className="w-full rounded-xl bg-slate-50 px-4 py-3 text-on-surface placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-700"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="course-category"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Category
            </label>
            <select
              id="course-category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none rounded-xl bg-slate-50 px-4 py-3 text-on-surface outline-none transition focus:ring-2 focus:ring-indigo-700"
            >
              <option value="">Select Category</option>
              <option value="Theoretical Physics">Theoretical Physics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Literature & Arts">Literature & Arts</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="course-level"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Level
            </label>
            <select
              id="course-level"
              value={level}
              onChange={(e) => onLevelChange(e.target.value)}
              className="w-full appearance-none rounded-xl bg-slate-50 px-4 py-3 text-on-surface outline-none transition focus:ring-2 focus:ring-indigo-700"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Post-Doctoral">Post-Doctoral</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="course-description"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Description
          </label>
          <textarea
            id="course-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Provide a detailed editorial summary of the course content..."
            rows={6}
            className="w-full resize-none rounded-xl bg-slate-50 px-4 py-3 text-on-surface placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-700"
          />
          <div className="mt-2 flex justify-end">
            <span className="text-xs text-slate-400">
              Recommended: 250-500 words
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
