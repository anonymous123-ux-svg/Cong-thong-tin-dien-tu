import { Bold, Code, Image as ImageIcon, Italic, List } from "lucide-react";

type Props = {
  titlePlaceholder?: string;
};

export default function StartDiscussionCard({
  titlePlaceholder = "What's on your mind?",
}: Props) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-base font-semibold text-slate-900">
        Start a Discussion
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder={titlePlaceholder}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-500/20"
        />

        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
          <button
            type="button"
            aria-label="Bold"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <Bold className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Italic"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <Italic className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mx-1 h-4 w-px bg-slate-200" />

          <button
            type="button"
            aria-label="Bulleted list"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <List className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Code"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <Code className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Image"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <textarea
          rows={4}
          placeholder="Elaborate..."
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-500/20"
        />

        <div className="flex items-center justify-between gap-3">
          <select className="h-9 rounded-full border border-slate-200 bg-slate-100 px-3 pr-8 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-500/20">
            <option>Select Category</option>
            <option>General</option>
            <option>Lesson Q&A</option>
          </select>

          <button
            type="button"
            className="h-9 rounded-full bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
}
