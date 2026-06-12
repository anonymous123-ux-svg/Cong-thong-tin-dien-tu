import Image from "next/image";
import { ArrowBigUp, BookOpen, MessageCircle, Sparkles } from "lucide-react";

import type { DiscussionThread } from "./types";

type Props = {
  thread: DiscussionThread;
};

function getTagClasses(variant: DiscussionThread["tag"]["variant"]) {
  switch (variant) {
    case "resolved":
      return "bg-emerald-100 text-emerald-700";
    case "announcement":
      return "bg-amber-100 text-amber-700";
    case "lesson":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function DiscussionThreadCard({ thread }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-transparent bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:border-slate-200 hover:bg-slate-50">
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-indigo-600" />

      <div className="flex items-start gap-4">
        <div className="hidden min-w-[3rem] flex-col items-center rounded-lg bg-slate-50 p-2 sm:flex">
          <button
            type="button"
            className="text-slate-500 transition-colors hover:text-indigo-600"
            aria-label="Upvote"
          >
            <ArrowBigUp className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="mt-1 text-sm font-bold text-indigo-600">
            {thread.votes}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getTagClasses(
                thread.tag.variant,
              )}`}
            >
              {thread.tag.label}
            </span>

            {thread.contextLabel ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {thread.contextLabel}
              </span>
            ) : null}
          </div>

          <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-lg">
            {thread.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            {thread.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-slate-200">
                <Image
                  src={
                    thread.authorAvatarUrl ?? "https://i.pravatar.cc/80?img=11"
                  }
                  alt={thread.authorName}
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-slate-800">
                {thread.authorName}
              </span>
              <span className="text-sm text-slate-400">
                • {thread.timeAgoLabel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="inline-flex items-center gap-1 text-sm font-medium">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {thread.replies}
              </span>

              <span className="inline-flex items-center gap-1 text-sm font-medium sm:hidden">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {thread.votes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
