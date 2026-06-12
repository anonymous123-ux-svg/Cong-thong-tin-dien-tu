import ClassListHeader from "@/components/class-list/ClassListHeader";
import ClassListStats from "@/components/class-list/ClassListStats";
import ClassMembersClient from "@/components/class-list/ClassMembersClient";
import {
  CLASS_LIST_HEADER,
  CLASS_LIST_MEMBERS,
  CLASS_LIST_STATS,
} from "@/components/class-list/mockData";

export default async function ClassListPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const state = Array.isArray(sp.state) ? sp.state[0] : sp.state;
  const empty = Array.isArray(sp.empty) ? sp.empty[0] : sp.empty;
  const restore = Array.isArray(sp.restore) ? sp.restore[0] : sp.restore;
  const forceEmpty = state === "empty" || empty === "1";

  const members = forceEmpty ? [] : CLASS_LIST_MEMBERS;
  const totalMembers = forceEmpty ? 0 : CLASS_LIST_STATS.totalMembers.value;

  return (
    <div className="pb-28">
      <ClassListHeader data={CLASS_LIST_HEADER} />
      <ClassListStats data={CLASS_LIST_STATS} />

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <ClassMembersClient
          classId={CLASS_LIST_HEADER.classId}
          basePath="/class/class-list"
          restore={restore === "1"}
          members={members}
          totalMembers={totalMembers}
        />
      </section>
    </div>
  );
}
