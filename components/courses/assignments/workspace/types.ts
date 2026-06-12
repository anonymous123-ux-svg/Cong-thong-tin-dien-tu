export type WorkspaceRequirement = {
  id: string;
  label: string;
  done: boolean;
};

export type WorkspaceResourceTone = "primary" | "secondary";

export type WorkspaceResource = {
  id: string;
  title: string;
  metaLabel: string;
  tone: WorkspaceResourceTone;
};

export type WorkspaceEditorTabKind = "python" | "data";

export type WorkspaceEditorTab = {
  id: string;
  label: string;
  kind: WorkspaceEditorTabKind;
  isDirty?: boolean;
};

export type WorkspaceEditor = {
  tabs: WorkspaceEditorTab[];
  files: Record<string, string[]>;
  consoleOutput: string[];
};

export type TutorSuggestion = {
  id: string;
  label: string;
};

export type WorkspaceTutor = {
  message: {
    text: string;
  };
  suggestions: TutorSuggestion[];
};

export type AssignmentWorkspaceData = {
  id: string;
  courseTagLabel: string;
  title: string;
  timeRemainingLabel: string;
  savedLabel: string;
  daysLeftLabel: string;
  dueLabel: string;
  description: string;
  requirements: WorkspaceRequirement[];
  resources: WorkspaceResource[];
  progressPercent: number;
  progressWidthClassName: string;
  progressLabel: string;
  editor: WorkspaceEditor;
  tutor: WorkspaceTutor;
};
