"use client";

type CreateCourseHeaderProps = {
  onSaveDraft: () => void;
  onContinue: () => void;
};

export default function CreateCourseHeader({
  onSaveDraft,
  onContinue,
}: CreateCourseHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-on-surface">
          Create New Course
        </h1>
        <p className="text-slate-500">
          Design an impactful learning experience with our editorial-grade
          builder.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSaveDraft}
          className="rounded-full border border-outline-variant px-6 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-full bg-indigo-700 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-800"
        >
          Continue
        </button>
      </div>
    </header>
  );
}
