export type MemberRole = "Student" | "TA" | "Lecturer";

export type MemberTagTone = "success" | "danger" | "info";

export type MemberTag = {
  label: "Top Performer" | "At Risk" | "New";
  tone: MemberTagTone;
};

export type MemberActivityTone = "online" | "recent";

export type MemberActivity = {
  label: string;
  tone: MemberActivityTone;
};

export type ClassListMember = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  tag?: MemberTag;
  role: MemberRole;
  isActive: boolean;
  progressPct: number;
  activity: MemberActivity;
};

export type ClassListHeaderData = {
  classId: string;
  title: string;
  leadInstructorName: string;
  leadInstructorAvatarUrl: string;
  membersCount?: number;
};

export type ClassListStatsData = {
  totalMembers: { value: number; deltaLabel: string };
  activeNow: number;
  avgProgressPct: number;
  completionRatePct: number;
  atRisk: number;
};
