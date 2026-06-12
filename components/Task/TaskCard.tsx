import {
  BadgeCheck,
  CheckCheck,
  CheckCircle2,
  Clock,
  FileText,
  FlaskConical,
  MoreVertical,
  Paperclip,
} from "lucide-react";

export type TaskAccent = "primary" | "secondary" | "tertiary";
export type TaskPriority = "High" | "Medium" | "Low";
export type TaskMetaKind = "due" | "completed";

export type Task = {
  title: string;
  meta: {
    kind: TaskMetaKind;
    label: string;
  };
  priority: TaskPriority;
  progress: number;
  accent: TaskAccent;
  leadingIcon: "file" | "check" | "science";
  showVerifiedAction?: boolean;
  showAttachmentAction?: boolean;
  progressAccent?: "primary" | "secondary";
};

const leadingIcons = {
  file: FileText,
  check: CheckCircle2,
  science: FlaskConical,
} as const;

function accentClasses(accent: TaskAccent) {
  switch (accent) {
    case "secondary":
      return { iconWrap: "bg-secondary/10 text-secondary" };
    case "tertiary":
      return { iconWrap: "bg-tertiary-fixed-dim/30 text-tertiary" };
    case "primary":
    default:
      return { iconWrap: "bg-primary/10 text-primary" };
  }
}

function priorityClasses(priority: TaskPriority) {
  switch (priority) {
    case "High":
      return "bg-error-container text-on-error-container";
    case "Low":
      return "bg-slate-100 text-slate-500";
    case "Medium":
    default:
      return "bg-slate-100 text-slate-500";
  }
}

export default function TaskCard({ task }: { task: Task }) {
  const LeadingIcon = leadingIcons[task.leadingIcon];
  const metaIcon = task.meta.kind === "completed" ? CheckCheck : Clock;
  const MetaIcon = metaIcon;
  const { iconWrap } = accentClasses(task.accent);
  const percentageTextClassName =
    task.progressAccent === "secondary" ? "text-secondary" : "text-primary";
  const progressValueClassName =
    task.progressAccent === "secondary"
      ? "[&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary"
      : "[&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary";

  return (
    <div className="group bg-surface-container-lowest rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-all border border-transparent hover:border-primary/10">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconWrap}`}
      >
        <LeadingIcon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="font-bold text-on-surface truncate">{task.title}</h5>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MetaIcon className="h-4 w-4" />
            {task.meta.label}
          </span>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityClasses(
              task.priority,
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="w-full md:w-48 shrink-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase">
            Progress
          </span>
          <span className={`text-[10px] font-bold ${percentageTextClassName}`}>
            {task.progress}%
          </span>
        </div>
        <progress
          className={`h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full ${progressValueClassName}`}
          value={task.progress}
          max={100}
        >
          {task.progress}%
        </progress>
      </div>

      <div className="flex items-center gap-2">
        {task.showVerifiedAction ? (
          <button
            type="button"
            className="p-2 bg-secondary/5 text-secondary rounded-lg"
            aria-label="Verified"
          >
            <BadgeCheck className="h-5 w-5" />
          </button>
        ) : task.showAttachmentAction ? (
          <button
            type="button"
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
            aria-label="Attachments"
          >
            <Paperclip className="h-5 w-5" />
          </button>
        ) : null}

        <button
          type="button"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-on-surface transition-colors"
          aria-label="More"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
