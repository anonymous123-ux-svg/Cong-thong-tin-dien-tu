"use client";

import { useMemo, useState } from "react";

import NotesEditorPane from "./NotesEditorPane";
import NotesListPane from "./NotesListPane";
import NotesToolbar from "./NotesToolbar";
import { initialActiveNote, modules, pinnedNotes } from "./mockData";
import type { NoteMeta } from "./types";

type Props = {
  courseId: string;
  courseTitle: string;
  activeNoteId?: string | null;
};

export default function CourseNotesPage({
  courseId,
  courseTitle,
  activeNoteId,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const resolvedActiveNoteId = activeNoteId ?? null;
  const [draftTitlesByNoteId, setDraftTitlesByNoteId] = useState<
    Record<string, string>
  >({});

  const activeNote: NoteMeta = useMemo(() => {
    if (!resolvedActiveNoteId) return initialActiveNote;
    if (resolvedActiveNoteId === initialActiveNote.id) return initialActiveNote;

    const inPinned = pinnedNotes.find(
      (note) => note.id === resolvedActiveNoteId,
    );
    if (inPinned) return inPinned;

    const inModule = modules
      .flatMap((module) =>
        module.items.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: "",
          updatedAt: initialActiveNote.updatedAt,
          moduleLabel: module.title,
        })),
      )
      .find((note) => note.id === resolvedActiveNoteId);

    return inModule ?? initialActiveNote;
  }, [resolvedActiveNoteId]);

  const noteTitle =
    resolvedActiveNoteId &&
    Object.prototype.hasOwnProperty.call(draftTitlesByNoteId, activeNote.id)
      ? draftTitlesByNoteId[activeNote.id]
      : activeNote.title;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Course Notes
            </p>
            <h1 className="text-lg font-semibold text-gray-900">
              {courseTitle}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <NotesListPane
          courseId={courseId}
          pinnedNotes={pinnedNotes}
          modules={modules}
          activeNoteId={resolvedActiveNoteId}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {resolvedActiveNoteId ? (
            <>
              <NotesToolbar onToggleSplitView={() => {}} />
              <NotesEditorPane
                activeNote={activeNote}
                noteTitle={noteTitle}
                onNoteTitleChange={(next) => {
                  setDraftTitlesByNoteId((prev) => ({
                    ...prev,
                    [activeNote.id]: next,
                  }));
                }}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-white">
              <div className="mx-auto max-w-md px-6 py-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Notes
                </p>
                <h2 className="mt-2 text-lg font-semibold text-gray-900">
                  Select a note
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Choose a note from the list to open the editor.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
