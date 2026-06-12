import { Plus } from "lucide-react";

import ContributionCard from "./ContributionCard";
import DiscussionFiltersBar from "./DiscussionFiltersBar";
import DiscussionPagination from "./DiscussionPagination";
import DiscussionThreadCard from "./DiscussionThreadCard";
import StartDiscussionCard from "./StartDiscussionCard";
import {
  contributionSummary,
  discussionFilters,
  discussionThreads,
  sortOptions,
} from "./mockData";

type Props = {
  courseId: string;
  courseTitle: string;
};

export default function CourseDiscussionsPage({ courseTitle }: Props) {
  return (
    <div className="w-full max-w-7xl space-y-12 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
            Discussions
          </h1>
          <p className="max-w-[70ch] text-base leading-relaxed text-slate-600">
            Engage with your peers and instructors. Ask questions, share
            insights, and collaborate on course materials for {courseTitle}.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Discussion
        </button>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <DiscussionFiltersBar
            filters={discussionFilters}
            sortOptions={sortOptions}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="flex flex-col gap-4">
            {discussionThreads.map((thread) => (
              <DiscussionThreadCard key={thread.id} thread={thread} />
            ))}
          </section>

          <DiscussionPagination currentPage={1} totalPages={3} />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24">
          <ContributionCard summary={contributionSummary} />
          <StartDiscussionCard />
        </div>
      </div>
    </div>
  );
}
