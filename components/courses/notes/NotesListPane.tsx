"use client";

import Link from "next/link";
import { Plus, Pin, Folder } from "lucide-react";
import { useMemo } from "react";

import type { ModuleNode, NoteMeta } from "./types";

type Props = {
  courseId: string;
  pinnedNotes: NoteMeta[];
  modules: ModuleNode[];
  activeNoteId?: string | null;
  searchQuery: string;
  onSearchQueryChange: (next: string) => void;
};

export default function NotesListPane({
  courseId,
  pinnedNotes,
  modules,
  activeNoteId,
  searchQuery,
  onSearchQueryChange,
}: Props) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredModules = useMemo(() => {
    if (!normalizedQuery) return modules;

    return modules
      .map((module) => ({
        ...module,
        items: module.items.filter((item) =>
          item.title.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((module) => module.items.length > 0);
  }, [modules, normalizedQuery]);

  return (
    <aside className="w-full shrink-0 border-r border-gray-100 bg-white md:w-80">
      <div className="p-3 pb-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium text-gray-900">My Notes</h2>
          <input
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search notes..."
            className="hidden h-9 w-44 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 md:block"
          />
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-900 py-2.5 font-medium text-white transition-colors hover:bg-indigo-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>New Note</span>
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto px-3 py-4">
        {/* Pinned */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Pin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pinned</span>
          </div>

          <div className="flex flex-col gap-2">
            {pinnedNotes.map((note) => (
              <Link
                key={note.id}
                href={`/admin/courses/${courseId}/notes/${note.id}`}
                className="group relative block rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-colors hover:bg-gray-50"
              >
                <h3 className="mb-1 text-sm font-medium text-gray-900">
                  {note.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {note.excerpt}
                </p>

                <Pin
                  className="absolute right-4 top-4 h-4 w-4 text-indigo-600"
                  aria-hidden="true"
                />

                <span className="sr-only">Open note</span>
              </Link>
            ))}
          </div>
        </section>

        {/* By Module */}
        <section className="min-h-0">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            By Module
          </div>

          <div className="flex flex-col gap-4">
            {filteredModules.map((module) => (
              <div key={module.id}>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800">
                  <Folder
                    className={
                      module.iconTone === "primary"
                        ? "h-4 w-4 text-indigo-700"
                        : "h-4 w-4 text-gray-400"
                    }
                    aria-hidden="true"
                  />
                  <span>{module.title}</span>
                </div>

                <div className="ml-2 flex flex-col gap-1 border-l-2 border-gray-200 pl-4">
                  {module.items.map((item) => {
                    const isActive = item.id === activeNoteId;

                    return (
                      <Link
                        key={item.id}
                        href={`/admin/courses/${courseId}/notes/${item.id}`}
                        className={
                          isActive
                            ? "relative rounded-lg px-3 py-2 text-left text-sm font-medium text-indigo-700"
                            : "rounded-lg px-3 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-gray-100"
                        }
                      >
                        {isActive && (
                          <span
                            className="absolute -left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border-2 border-white bg-indigo-600"
                            aria-hidden="true"
                          />
                        )}
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredModules.length === 0 && (
              <p className="text-sm text-gray-500">
                No notes match your search.
              </p>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
