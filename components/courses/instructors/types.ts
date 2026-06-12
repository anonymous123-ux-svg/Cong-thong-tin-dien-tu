export type InstructorKind = "lead" | "assistant" | "guest";

export type InstructorAction = {
  label: string;
  href?: string;
};

export type CourseInstructor = {
  id: string;
  kind: InstructorKind;
  roleLabel: string;
  name: string;
  bio: string;
  avatarUrl: string;
  availabilityLabel?: string;
  primaryActionLabel: string;
  secondaryActions?: InstructorAction[];
};
