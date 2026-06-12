import Image from "next/image";
import { MessageSquareText } from "lucide-react";

import type { InstructorNote } from "./types";

type Props = {
  notes: InstructorNote[];
};

export default function InstructorNotesCard({ notes }: Props) {
  return (
    <section className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-100">
      <div className="mb-4 flex items-center gap-3">
        <MessageSquareText
          className="h-5 w-5 text-indigo-600"
          aria-hidden="true"
        />
        <h2 className="text-base font-medium text-slate-900">
          Instructor Notes
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm"
          >
            <p className="text-sm leading-relaxed text-slate-600">
              {note.body}
            </p>

            {note.authorName && (
              <div className="mt-3 flex items-center gap-2">
                {note.authorAvatarUrl ? (
                  <div className="h-6 w-6 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={note.authorAvatarUrl}
                      alt={note.authorName}
                      width={24}
                      height={24}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-slate-100" />
                )}

                <span className="text-xs font-medium text-slate-800">
                  {note.authorName}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
