import { notFound } from "next/navigation";

import ClassMembersClient from "@/components/class-list/ClassMembersClient";
import ClassListHeader from "@/components/class-list/ClassListHeader";
import ClassListStats from "@/components/class-list/ClassListStats";
import {
  CLASS_LIST_MEMBERS,
  CLASS_LIST_STATS,
} from "@/components/class-list/mockData";
import { CLASSES_DIRECTORY_ITEMS } from "@/components/classes/mockData";

function parseEnrolledCount(enrolledLabel: string) {
  const value = Number.parseInt(enrolledLabel, 10);
  return Number.isFinite(value) ? value : null;
}

export default async function ClassMembersPage({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { classId } = await params;

  const sp = (await searchParams) ?? {};
  const state = Array.isArray(sp.state) ? sp.state[0] : sp.state;
  const empty = Array.isArray(sp.empty) ? sp.empty[0] : sp.empty;
  const restore = Array.isArray(sp.restore) ? sp.restore[0] : sp.restore;
  const forceEmpty = state === "empty" || empty === "1";

  const classItem = CLASSES_DIRECTORY_ITEMS.find((c) => c.id === classId);
  if (!classItem) notFound();

  const enrolledCount = parseEnrolledCount(classItem.enrolledLabel);

  const stats =
    enrolledCount === null
      ? CLASS_LIST_STATS
      : enrolledCount === 0
        ? {
            ...CLASS_LIST_STATS,
            totalMembers: { value: 0, deltaLabel: "0%" },
            activeNow: 0,
            avgProgressPct: 0,
            completionRatePct: 0,
            atRisk: 0,
          }
        : {
            ...CLASS_LIST_STATS,
            totalMembers: {
              ...CLASS_LIST_STATS.totalMembers,
              value: enrolledCount,
            },
          };

  const isEmptyState = forceEmpty || stats.totalMembers.value === 0;
  const members = isEmptyState ? [] : CLASS_LIST_MEMBERS;
  const totalMembers = isEmptyState ? 0 : stats.totalMembers.value;

  return (
    <div className="pb-28">
      <ClassListHeader
        data={{
          classId: classItem.id,
          title: classItem.title,
          leadInstructorName: classItem.instructor.name,
          leadInstructorAvatarUrl: classItem.instructor.avatarUrl,
          membersCount: totalMembers,
        }}
      />
      <ClassListStats data={stats} />

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <ClassMembersClient
          classId={classId}
          basePath={`/class/classes/${classId}/members`}
          restore={restore === "1"}
          members={members}
          totalMembers={totalMembers}
        />
      </section>
    </div>
  );
}
