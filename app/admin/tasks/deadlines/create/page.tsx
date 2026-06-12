import CreateDeadlineClient from "@/components/task-deadlines/create/CreateDeadlineClient";
import { deadlineModules } from "@/components/task-deadlines/mockData";

export default function CreateDeadlinePage() {
  return <CreateDeadlineClient modules={deadlineModules} />;
}
