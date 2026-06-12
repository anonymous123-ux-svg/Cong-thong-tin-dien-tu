"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";

import { useTaskList } from "./TaskListProvider";
import { TASK_LIST_ROWS, TASK_LIST_TOTAL_COUNT } from "./mockData";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusIndicator from "./TaskStatusIndicator";
import type { TaskListRow } from "./types";

const PAGE_SIZE = 4;

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function sortRows(rows: TaskListRow[], sortBy: string) {
  const copy = [...rows];

  if (sortBy === "Due Date") {
    copy.sort((a, b) => a.dueDateISO.localeCompare(b.dueDateISO));
  } else if (sortBy === "Priority") {
    const rank = { High: 0, Medium: 1, Low: 2 } as const;
    copy.sort((a, b) => rank[a.priority] - rank[b.priority]);
  } else if (sortBy === "Status") {
    const rank = { "In Progress": 0, Planning: 1, Completed: 2 } as const;
    copy.sort((a, b) => rank[a.status] - rank[b.status]);
  }

  return copy;
}

export default function TaskListTable() {
  const { query, sortBy } = useTaskList();
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const q = normalize(query);
    const base = q
      ? TASK_LIST_ROWS.filter((row) => {
          const haystack = normalize(`${row.title} ${row.subtitle}`);
          return haystack.includes(q);
        })
      : TASK_LIST_ROWS;

    return sortRows(base, sortBy);
  }, [query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(TASK_LIST_TOTAL_COUNT / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="px-8 py-5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Task Detail
              </th>
              <th className="px-6 py-5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Priority
              </th>
              <th className="px-6 py-5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Status
              </th>
              <th className="px-6 py-5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Due Date
              </th>
              <th className="px-6 py-5 text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Team
              </th>
              <th className="px-8 py-5 text-right text-[0.75rem] font-bold uppercase tracking-[0.03em] text-on-surface-variant">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                className="group transition-colors hover:bg-slate-50"
              >
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="mb-1 text-base font-semibold text-on-surface">
                      {row.title}
                    </span>
                    <span className="text-xs text-outline">{row.subtitle}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <TaskPriorityBadge priority={row.priority} />
                </td>
                <td className="px-6 py-6">
                  <TaskStatusIndicator status={row.status} />
                </td>
                <td className="px-6 py-6 text-sm font-medium text-on-surface">
                  {row.dueDateLabel}
                </td>
                <td className="px-6 py-6">
                  <Link
                    href={`/admin/tasks/members/${row.id}`}
                    className="group/btn flex items-center gap-2 rounded-full p-1 pr-3 transition-all hover:bg-indigo-50"
                  >
                    <div className="flex -space-x-2">
                      {row.team.map((member) => (
                        <Image
                          key={member.id}
                          src={member.avatarUrl}
                          alt={member.name}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full border border-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[0.7rem] font-bold text-indigo-700 opacity-0 transition-opacity group-hover/btn:opacity-100">
                      View Members
                    </span>
                  </Link>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    type="button"
                    aria-label="Row actions"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-outline transition-all hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5">
        <span className="text-sm font-medium text-on-surface-variant">
          Showing {filteredRows.length} of {TASK_LIST_TOTAL_COUNT} tasks
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={!canPrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg p-2 text-outline-variant transition hover:bg-surface-container-low disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {[1, 2, 3].map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={
                page === pageNumber
                  ? "h-8 w-8 rounded-lg bg-indigo-700 text-sm font-bold text-white"
                  : "h-8 w-8 rounded-lg text-sm font-bold text-on-surface transition hover:bg-surface-container-low"
              }
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            disabled={!canNext}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg p-2 text-on-surface transition hover:bg-surface-container-low disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
