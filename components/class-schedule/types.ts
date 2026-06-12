export type ScheduleMode = "day" | "week" | "month";

export type ScheduleDay = {
  id: string;
  weekdayShort: string;
  dayOfMonth: number;
  isActive?: boolean;
};

export type TimelineEventKind =
  | "online"
  | "quiz"
  | "in-person"
  | "consultation";

export type TimelineEventStatus = "ongoing" | "completed" | "upcoming";

export type TimelineEvent = {
  id: string;
  timeLabel: string;
  kind: TimelineEventKind;
  status: TimelineEventStatus;
  title: string;
  metaLeft: { icon: "clock" | "video" | "map" | "science"; label: string };
  metaRight?: { icon: "clock" | "video" | "map" | "science"; label: string };
};

export type TimelineRow =
  | {
      id: string;
      type: "slot";
      timeLabel: string;
    }
  | {
      id: string;
      type: "event";
      timeLabel: string;
      event: TimelineEvent;
    }
  | {
      id: string;
      type: "break";
      timeLabel: string;
      label: string;
    };

export type DeadlineItem = {
  id: string;
  accent: "error" | "tertiary" | "secondary";
  title: string;
  subtitle: string;
};

export type AcademicEvent = {
  id: string;
  icon: "graduation" | "users";
  title: string;
  subtitle: string;
  variant: "primary" | "secondary";
};

export type WeekScheduleParticipant = {
  id: string;
  name: string;
  imageUrl: string;
};

export type WeekScheduleEventVariant = "primary" | "tertiary" | "secondary";

export type WeekScheduleEvent = {
  id: string;
  dayId: string;
  startTime: string;
  endTime: string;
  label: string;
  title: string;
  variant: WeekScheduleEventVariant;
  badge?: string;
  participants?: WeekScheduleParticipant[];
};

export type WeekScheduleTimeline = {
  startHour: number;
  totalHours: number;
  hourHeightPx: number;
  topOffsetPx: number;
  currentTime: string;
};

export type MonthCalendarEventVariant = "blue" | "green" | "orange" | "purple";

export type MonthCalendarEvent = {
  id: string;
  label: string;
  variant: MonthCalendarEventVariant;
};

export type MonthCalendarCell =
  | { kind: "empty" }
  | {
      kind: "day";
      dayNumber: number;
      isSelected?: boolean;
      events?: MonthCalendarEvent[];
      moreLabel?: string;
    };

export type MonthAttendanceItem = {
  id: string;
  label: string;
  percent: number;
};

export type MonthDeadlineIcon = "priority" | "science" | "description";

export type MonthDeadlineItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: MonthDeadlineIcon;
  variant: "error" | "primary" | "tertiary";
};

export type MonthQuickAction = {
  id: string;
  title: string;
  icon: "log-hours" | "absence";
};

export type MonthCampusEvent = {
  title: string;
  subtitle: string;
};
