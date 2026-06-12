import AssignmentSubmitClient from "./AssignmentSubmitClient";
import { getAssignmentDetails } from "@/lib/actions/student";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let assignmentData;
  try {
    assignmentData = await getAssignmentDetails(id);
  } catch (error) {
    redirect("/student/assignments");
  }

  return (
    <div className="-m-8">
      <AssignmentSubmitClient 
        assignmentId={id} 
        assignment={assignmentData.assignment}
        submissions={assignmentData.submissions}
      />
    </div>
  );
}