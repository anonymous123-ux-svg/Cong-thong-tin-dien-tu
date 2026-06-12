import type { ClassListMember } from "@/components/class-list/types";

import EditMemberProfileForm from "./EditMemberProfileForm";
import EditMemberProfileHeader from "./EditMemberProfileHeader";

export default function EditMemberProfileView({
  member,
  backHref,
}: {
  member: ClassListMember;
  backHref: string;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl pb-24">
      <EditMemberProfileHeader backHref={backHref} />
      <EditMemberProfileForm member={member} backHref={backHref} />
    </div>
  );
}
