import AssignmentsClient from "./AssignmentsClient";
import { getAssignments } from "@/lib/actions/assignment";
import TopNavbar from "@/components/Topbar";
import { connection } from "next/server";

export default async function LecturerAssignmentsPage() {
  await connection();
  const assignments = await getAssignments();

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      {/* ✅ Không render Sidebar nữa */}

      {/* ✅ Không sửa file Topbar, nhưng override vị trí để không chừa sidebar */}
      <div className="[&>nav]:!left-0 [&>nav]:!w-full">
        <TopNavbar />
      </div>

      {/* ✅ Vì không còn sidebar nên bỏ pl-64 */}
      <div className="pt-16">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-8">
          <AssignmentsClient initialAssignments={assignments} />
        </div>
      </div>
    </div>
  );
}