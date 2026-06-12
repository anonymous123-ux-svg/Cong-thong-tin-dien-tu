import { notFound } from "next/navigation";

import { CLASS_LIST_MEMBERS } from "@/components/class-list/mockData";
import EditMemberProfileView from "@/components/members/EditMemberProfileView";

export default async function EditMemberProfilePage({
  params,
}: {
  params: Promise<{ classId: string; memberId: string }>;
}) {
  const { classId, memberId } = await params;

  const member = CLASS_LIST_MEMBERS.find((m) => m.id === memberId);
  if (!member) notFound();

  const backHref = `/class/classes/${classId}/members?restore=1`;

  return <EditMemberProfileView member={member} backHref={backHref} />;
}
