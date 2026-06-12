export type MemberPresence = "online" | "idle";

export type TaskMemberCollaborator = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  presence: MemberPresence;
  score: number;
};

export type TaskMemberActivityType = "update" | "complete" | "discussion";

export type TaskMemberActivityLog = {
  id: string;
  type: TaskMemberActivityType;
  title: string;
  description: string;
  timestampLabel: string;
};

export type TaskMemberDetail = {
  taskId: string;
  moduleLabel: string;
  phaseLabel: string;
  title: string;
  description: string;
  assignedCount: number;
  collaborators: TaskMemberCollaborator[];
  activityLogs: TaskMemberActivityLog[];
  syncRatePercent: number;
  aboveBenchmarkPercent: number;
  resourceAllocation: {
    calculation: number;
    theorizing: number;
    peerReview: number;
  };
  referenceCard: {
    label: string;
    title: string;
    description: string;
    imageUrl: string;
  };
};
