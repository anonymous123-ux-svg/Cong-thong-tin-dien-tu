import type {
  AcademicEvent,
  DeadlineItem,
  MonthAttendanceItem,
  MonthCalendarCell,
  MonthCampusEvent,
  MonthDeadlineItem,
  MonthQuickAction,
  ScheduleDay,
  TimelineRow,
  WeekScheduleEvent,
  WeekScheduleTimeline,
} from "./types";

export const SCHEDULE_TITLE = {
  monthLabel: "April 2025",
  semesterLabel: "Spring Semester",
  weekLabel: "Week 12",
};

export const SCHEDULE_DAYS: ScheduleDay[] = [
  { id: "sun", weekdayShort: "Sun", dayOfMonth: 14 },
  { id: "mon", weekdayShort: "Mon", dayOfMonth: 15 },
  { id: "tue", weekdayShort: "Tue", dayOfMonth: 16, isActive: true },
  { id: "wed", weekdayShort: "Wed", dayOfMonth: 17 },
  { id: "thu", weekdayShort: "Thu", dayOfMonth: 18 },
  { id: "fri", weekdayShort: "Fri", dayOfMonth: 19 },
  { id: "sat", weekdayShort: "Sat", dayOfMonth: 20 },
];

export const TIMELINE_ROWS: TimelineRow[] = [
  { id: "slot-08", type: "slot", timeLabel: "08:00 AM" },
  {
    id: "event-09",
    type: "event",
    timeLabel: "09:00 AM",
    event: {
      id: "qm-lecture",
      timeLabel: "09:00 AM",
      kind: "online",
      status: "ongoing",
      title: "Quantum Mechanics Lecture",
      metaLeft: { icon: "clock", label: "09:00 - 10:30" },
      metaRight: { icon: "video", label: "Microsoft Teams" },
    },
  },
  {
    id: "event-11",
    type: "event",
    timeLabel: "11:00 AM",
    event: {
      id: "calc-quiz",
      timeLabel: "11:00 AM",
      kind: "quiz",
      status: "completed",
      title: "Calculus II Quiz",
      metaLeft: { icon: "map", label: "Room 201 • Physical Class" },
      metaRight: { icon: "clock", label: "11:00 - 12:00" },
    },
  },
  {
    id: "break-12",
    type: "break",
    timeLabel: "12:00 PM",
    label: "Mid-day Break",
  },
  {
    id: "event-14",
    type: "event",
    timeLabel: "02:00 PM",
    event: {
      id: "lab",
      timeLabel: "02:00 PM",
      kind: "in-person",
      status: "upcoming",
      title: "Lab Session: Wave Optics",
      metaLeft: { icon: "science", label: "Lab 4, Physics Wing" },
      metaRight: { icon: "clock", label: "14:00 - 15:30" },
    },
  },
  {
    id: "event-16",
    type: "event",
    timeLabel: "04:30 PM",
    event: {
      id: "office-hours",
      timeLabel: "04:30 PM",
      kind: "consultation",
      status: "upcoming",
      title: "Office Hours",
      metaLeft: {
        icon: "map",
        label: "Dr. Sarah Thompson • Building C, Rm 402",
      },
    },
  },
];

export const ATTENDANCE_RATE = {
  value: 94.2,
  label: "Excellent",
  helperText:
    "You have missed only 1 lab session this semester. Keep up the consistency!",
};

export const UPCOMING_DEADLINES: DeadlineItem[] = [
  {
    id: "deadline-1",
    accent: "error",
    title: "Ethics Essay Submisson",
    subtitle: "Overdue - 2 hours ago",
  },
  {
    id: "deadline-2",
    accent: "tertiary",
    title: "Linear Algebra Homework",
    subtitle: "Due in 3 days",
  },
  {
    id: "deadline-3",
    accent: "secondary",
    title: "AI Project Proposal",
    subtitle: "Due in 5 days",
  },
];

export const ACADEMIC_EVENTS: AcademicEvent[] = [
  {
    id: "event-1",
    icon: "graduation",
    title: "Graduate Fair 2025",
    subtitle: "Main Hall • Tomorrow, 10:00",
    variant: "primary",
  },
  {
    id: "event-2",
    icon: "users",
    title: "CS Student Mixer",
    subtitle: "South Quad • April 18, 17:00",
    variant: "secondary",
  },
];

export const WEEK_SCHEDULE_TIMELINE: WeekScheduleTimeline = {
  startHour: 8,
  totalHours: 11,
  hourHeightPx: 80,
  topOffsetPx: 110,
  currentTime: "13:15",
};

export const WEEK_SCHEDULE_EVENTS: WeekScheduleEvent[] = [
  {
    id: "week-quantum",
    dayId: "mon",
    startTime: "09:00",
    endTime: "10:30",
    label: "09:00 - 10:30",
    title: "Quantum Mechanics Lecture",
    variant: "primary",
  },
  {
    id: "week-calculus",
    dayId: "tue",
    startTime: "10:00",
    endTime: "11:00",
    label: "10:00 - 11:00",
    title: "Calculus II Midterm Quiz",
    variant: "tertiary",
    badge: "Ongoing",
  },
  {
    id: "week-ethics",
    dayId: "tue",
    startTime: "13:00",
    endTime: "14:00",
    label: "13:00 - 14:00",
    title: "Ethics & AI Seminar",
    variant: "primary",
  },
  {
    id: "week-chem-lab",
    dayId: "wed",
    startTime: "11:00",
    endTime: "12:30",
    label: "11:00 - 12:30",
    title: "Chemistry Lab",
    variant: "secondary",
  },
  {
    id: "week-physics-rec",
    dayId: "wed",
    startTime: "14:00",
    endTime: "15:00",
    label: "14:00 - 15:00",
    title: "Physics Recitation",
    variant: "primary",
  },
  {
    id: "week-office-hours",
    dayId: "thu",
    startTime: "15:30",
    endTime: "16:30",
    label: "15:30 - 16:30",
    title: "Office Hours — Dr. Thompson",
    variant: "tertiary",
  },
  {
    id: "week-algorithms",
    dayId: "fri",
    startTime: "13:00",
    endTime: "14:30",
    label: "13:00 - 14:30",
    title: "Advanced Algorithms Lab",
    variant: "secondary",
    participants: [
      {
        id: "participant-1",
        name: "Student",
        imageUrl: "https://i.pravatar.cc/64?img=47",
      },
      {
        id: "participant-2",
        name: "Student",
        imageUrl: "https://i.pravatar.cc/64?img=12",
      },
    ],
  },
];

export const MONTH_DAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export const MONTH_CALENDAR_CELLS: MonthCalendarCell[] = [
  { kind: "empty" },
  { kind: "empty" },
  {
    kind: "day",
    dayNumber: 1,
    events: [{ id: "m-1-lecture", label: "Lecture: Bio 101", variant: "blue" }],
  },
  { kind: "day", dayNumber: 2 },
  {
    kind: "day",
    dayNumber: 3,
    events: [
      { id: "m-3-lab", label: "Lab: Molecular", variant: "green" },
      { id: "m-3-consult", label: "Consultation", variant: "orange" },
    ],
  },
  { kind: "day", dayNumber: 4 },
  { kind: "day", dayNumber: 5 },
  { kind: "day", dayNumber: 6 },
  {
    kind: "day",
    dayNumber: 7,
    events: [
      { id: "m-7-lecture", label: "Lecture: Bio 101", variant: "blue" },
      { id: "m-7-quiz", label: "Quiz: Genetics", variant: "purple" },
    ],
  },
  { kind: "day", dayNumber: 8 },
  {
    kind: "day",
    dayNumber: 9,
    isSelected: true,
    events: [
      { id: "m-9-lecture", label: "Lecture: Chem 4", variant: "blue" },
      { id: "m-9-lab", label: "Lab: Titration", variant: "green" },
      { id: "m-9-office", label: "Office Hour", variant: "orange" },
    ],
    moreLabel: "+2 more",
  },
  {
    kind: "day",
    dayNumber: 10,
    events: [{ id: "m-10-lecture", label: "Lecture: Ethics", variant: "blue" }],
  },
  { kind: "day", dayNumber: 11 },
  { kind: "day", dayNumber: 12 },
  { kind: "day", dayNumber: 13 },
  {
    kind: "day",
    dayNumber: 14,
    events: [
      { id: "m-14-lecture", label: "Lecture: Bio 101", variant: "blue" },
    ],
  },
  {
    kind: "day",
    dayNumber: 15,
    events: [{ id: "m-15-midterm", label: "Midterm Prep", variant: "purple" }],
  },
  { kind: "day", dayNumber: 16 },
  {
    kind: "day",
    dayNumber: 17,
    events: [{ id: "m-17-field", label: "Field Trip", variant: "green" }],
  },
  { kind: "day", dayNumber: 18 },
  { kind: "day", dayNumber: 19 },
  { kind: "day", dayNumber: 20 },
  { kind: "day", dayNumber: 21 },
  {
    kind: "day",
    dayNumber: 22,
    events: [
      { id: "m-22-lecture", label: "Lecture: History", variant: "blue" },
    ],
  },
  {
    kind: "day",
    dayNumber: 23,
    events: [{ id: "m-23-thesis", label: "Thesis Review", variant: "orange" }],
  },
  { kind: "day", dayNumber: 24 },
  {
    kind: "day",
    dayNumber: 25,
    events: [{ id: "m-25-math", label: "Math Quiz", variant: "purple" }],
  },
  { kind: "day", dayNumber: 26 },
  { kind: "day", dayNumber: 27 },
  {
    kind: "day",
    dayNumber: 28,
    events: [{ id: "m-28-physics", label: "Physics 101", variant: "blue" }],
  },
  { kind: "day", dayNumber: 29 },
  {
    kind: "day",
    dayNumber: 30,
    events: [{ id: "m-30-optics", label: "Lab: Optics", variant: "green" }],
  },
  { kind: "empty" },
  { kind: "empty" },
  { kind: "empty" },
];

export const MONTH_QUICK_ACTIONS: MonthQuickAction[] = [
  { id: "qa-log", title: "Log Hours", icon: "log-hours" },
  { id: "qa-absence", title: "Absence", icon: "absence" },
];

export const MONTH_ATTENDANCE_OVERVIEW: MonthAttendanceItem[] = [
  { id: "att-bio", label: "Biology 101", percent: 98 },
  { id: "att-chem", label: "Chem Lab", percent: 85 },
  { id: "att-history", label: "World History", percent: 100 },
];

export const MONTH_UPCOMING_DEADLINES: MonthDeadlineItem[] = [
  {
    id: "md-1",
    title: "Thesis Draft #2",
    subtitle: "Tomorrow • 11:59 PM",
    icon: "priority",
    variant: "error",
  },
  {
    id: "md-2",
    title: "Lab Report: Optics",
    subtitle: "Fri, Apr 11 • 5:00 PM",
    icon: "science",
    variant: "primary",
  },
  {
    id: "md-3",
    title: "Weekly Reflection",
    subtitle: "Sun, Apr 13 • Midnight",
    icon: "description",
    variant: "tertiary",
  },
];

export const MONTH_CAMPUS_EVENT: MonthCampusEvent = {
  title: "Annual Science Fair",
  subtitle: "Main Plaza • April 22nd, 10:00 AM. Keynote by Dr. Aris Thorne.",
};
