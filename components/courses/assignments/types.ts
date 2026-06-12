export type AssignmentStatus = "in_progress" | "not_started" | "submitted";

export type AssignmentBadgeTone = "danger" | "neutral";

export type Assignment = {
  id: string;
  badgeLabel?: string;
  badgeTone?: AssignmentBadgeTone;
  title: string;
  moduleLabel: string;
  description: string;
  dueLabel: string;
  status: AssignmentStatus;
};

export type QuickSubmitConfig = {
  assignmentTitle: string;
  acceptedFileTypesLabel: string;
  submitDisabled: boolean;
};

export type FeedbackItem = {
  id: string;
  title: string;
  scoreLabel: string;
  metaLabel: string;
  feedbackText: string;
};
