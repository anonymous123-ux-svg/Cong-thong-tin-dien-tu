import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { auth } from "@/auth";

export default async function LecturerSettingsPage() {
  const session = await auth();
  return <ProfileSettings user={session?.user} />;
}
