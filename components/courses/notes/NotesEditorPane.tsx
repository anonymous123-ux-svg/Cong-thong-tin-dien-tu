"use client";

import { useMemo } from "react";

import type { NoteMeta } from "./types";

type Props = {
  activeNote: NoteMeta;
  noteTitle: string;
  onNoteTitleChange: (next: string) => void;
};

export default function NotesEditorPane({
  activeNote,
  noteTitle,
  onNoteTitleChange,
}: Props) {
  const metaLabel = useMemo(() => {
    if (!activeNote.moduleLabel) return null;
    return activeNote.moduleLabel;
  }, [activeNote.moduleLabel]);

  return (
    <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-10 md:px-6 lg:px-8 xl:px-10">
        <div className="w-full max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {metaLabel && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                {metaLabel}
              </span>
            )}
            <span aria-hidden="true">•</span>
            <span>{activeNote.updatedAt}</span>
          </div>

          <input
            value={noteTitle}
            onChange={(e) => onNoteTitleChange(e.target.value)}
            placeholder="Note Title..."
            className="mb-8 w-full border-none bg-transparent p-0 text-2xl font-semibold text-gray-900 placeholder:text-gray-300 outline-none focus:ring-0"
          />

          <div className="space-y-6 text-gray-800 leading-relaxed">
            <p className="text-base text-gray-800">
              To understand quantum mechanics at a computational level, a solid
              grasp of linear algebra is non-negotiable. Quantum states are
              represented as vectors in a complex vector space, specifically a
              Hilbert space.
            </p>

            <div>
              <h3 className="mb-4 mt-8 text-lg font-medium text-gray-900">
                Key Concepts:
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong className="text-gray-900">Vectors:</strong> Represent
                  the state of a quantum system. In a 2-level system (qubit), we
                  use 2D complex column vectors.
                </li>
                <li>
                  <strong className="text-gray-900">Matrices:</strong> Represent
                  quantum operations (gates) or observables. They act on state
                  vectors via matrix multiplication.
                </li>
                <li>
                  <strong className="text-gray-900">Inner Product:</strong>
                  Crucial for calculating probabilities of measuring specific
                  states. Yields a scalar.
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-indigo-500 bg-gray-50 p-6">
              <p className="text-sm italic text-gray-600">
                "In quantum computing, every physical operation we perform on a
                qubit is mathematically modeled as a unitary matrix acting on a
                state vector."
              </p>
            </div>

            <p className="mt-8 text-base text-gray-800">
              Need to review Hermitian matrices before next week&apos;s
              assignment on observables. They are essential because their
              eigenvalues are always real numbers, corresponding to physical
              measurements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
