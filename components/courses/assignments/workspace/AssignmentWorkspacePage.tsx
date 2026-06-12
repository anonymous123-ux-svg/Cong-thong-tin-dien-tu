import AssignmentWorkspaceClient from "./AssignmentWorkspaceClient";
import { getAssignmentWorkspaceById } from "./mockData";

export default function AssignmentWorkspacePage({
  assignmentId,
  backHref,
}: {
  assignmentId: string;
  backHref: string;
}) {
  const data = getAssignmentWorkspaceById(assignmentId);

  if (!data) return null;

  return <AssignmentWorkspaceClient data={data} backHref={backHref} />;
}
