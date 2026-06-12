import type {
  AgendaItem,
  BreakdownRow,
  CalendarLegendItem,
  CalendarTask,
  GanttTask,
  ProgressSegment,
  ScheduleStatCard,
  TeamAvailabilityMember,
  UpcomingDeadline,
} from "./types";

export const SCHEDULE_STATS: ScheduleStatCard[] = [
  {
    id: "total",
    label: "Total Tasks",
    value: "24",
    badge: { label: "+12%", tone: "success", icon: "trendingUp" },
    iconTone: "primary",
    icon: "assignment",
  },
  {
    id: "inProgress",
    label: "In Progress",
    value: "8",
    badge: { label: "Active", tone: "warning" },
    iconTone: "tertiary",
    icon: "pending",
  },
  {
    id: "due",
    label: "Due This Week",
    value: "5",
    badge: { label: "Urgent", tone: "danger" },
    iconTone: "danger",
    icon: "eventBusy",
  },
  {
    id: "completed",
    label: "Completed",
    value: "11",
    badge: { label: "+5", tone: "success", icon: "verified" },
    iconTone: "success",
    icon: "check",
  },
];

export const CALENDAR_LEGEND: CalendarLegendItem[] = [
  { id: "l1", label: "Research", tone: "primary" },
  { id: "l2", label: "Lab", tone: "success" },
  { id: "l3", label: "Review", tone: "tertiary" },
];

export const CALENDAR_TASKS: CalendarTask[] = [
  { id: "c1", day: 1, label: "Research Phase A", tone: "primary" },
  { id: "c2", day: 3, label: "Lab Setup", tone: "success" },
  { id: "c3", day: 15, label: "Peer Review", tone: "danger" },
  { id: "c4", day: 16, label: "Lab Milestone", tone: "primary" },
  { id: "c5", day: 17, label: "Deadline: Thesis", tone: "danger" },
];

export const TODAY_AGENDA: AgendaItem[] = [
  {
    id: "a1",
    time: "09:00 AM",
    title: "Curriculum Review Meeting",
    subtitle: "Conference Room 4 or Zoom",
    tone: "primary",
  },
  {
    id: "a2",
    time: "11:30 AM",
    title: "Lab Equipment Audit",
    subtitle: "Chemistry Wing, Block C",
    tone: "success",
  },
  {
    id: "a3",
    time: "02:00 PM",
    title: "PhD Candidate Interview",
    subtitle: "Office of Admissions",
    tone: "tertiary",
  },
  {
    id: "a4",
    time: "04:30 PM",
    title: "Daily Progress Sync",
    subtitle: "COMPLETED",
    tone: "muted",
    completed: true,
  },
];

export const PROGRESS_SEGMENTS: ProgressSegment[] = [
  { id: "s1", label: "Done", percent: 45, tone: "success" },
  { id: "s2", label: "Active", percent: 30, tone: "primary" },
  { id: "s3", label: "Review", percent: 15, tone: "tertiary" },
  { id: "s4", label: "Stuck", percent: 10, tone: "danger" },
];

export const GANTT_TASKS: GanttTask[] = [
  {
    id: "g1",
    label: "Data Collection",
    tone: "primary",
    startOffsetPercent: 0,
    widthPercent: 42,
    progressLabel: "80%",
    progressToneText: "onPrimary",
  },
  {
    id: "g2",
    label: "Chemical Inventory",
    tone: "success",
    startOffsetPercent: 14,
    widthPercent: 57,
    progressLabel: "45%",
    progressToneText: "onPrimary",
  },
  {
    id: "g3",
    label: "Curriculum Update",
    tone: "tertiary",
    startOffsetPercent: 42,
    widthPercent: 28,
    progressLabel: "12%",
    progressToneText: "onTertiary",
  },
  {
    id: "g4",
    label: "Staff Training",
    tone: "muted",
    startOffsetPercent: 57,
    widthPercent: 42,
    progressLabel: "0%",
    progressToneText: "onSurface",
  },
];

export const TEAM_AVAILABILITY: TeamAvailabilityMember[] = [
  {
    id: "t1",
    name: "Dr. Aris Thorne",
    role: "Head of Research",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOSmq0C22a1b3_zNbctIdmgvuHk6g4GyljSF0X63ltXsytR0zMROt32aJA7we2ngP00Z_8D1bkC4znNAb4VPATPMN595PymM03I4qIaTFNeESGpL_2tiF5xeS_YKFMGbDH3LelCXu9N7TUK0dByey7BhaipKbeB8hCbs54hJXmxJPm4VbYFVqEj-CO8Mm8Xdd2pbcQ439nNjYo6cazC6ZI0aNw-e4nQT0l9Yv8-0NyzZBw2IEVA9F0BN4rkj_U2EGFlpr4moldFJHV",
    slots: ["free", "free", "busy", "free", "free"],
  },
  {
    id: "t2",
    name: "Sarah Jenkins",
    role: "Senior Curator",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMmKLkktyT17BFRZ1TzH4pFXW8SsKW5z3fTnlccYitNJRnc1SgoOdmFTp2v2Prk_LXyV_ZeZM2NyKR9AZiPY3SZsRqoZUZpb9grncNG8M6ZQ1HR0xY7qAAwiz3w06-8xFHqtTljo3P_H-Ec7Z6ca7wPb5EONncXojZx7bvq3w2uDwUjDNfs0sUJ4S8LCeOQs0Pkiu9yrrV5YXW0kj9vvko7EAS66gsXqVHc7YF5cteFs0JOHTUEURBIbAxv9geLYrs39hRjyq_daOi",
    slots: ["busy", "busy", "free", "busy", "free"],
  },
  {
    id: "t3",
    name: "Mark Walton",
    role: "Data Analyst",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq3W8qzk0Ctpo6pAXXLlcxi7fqGVAqj5iMALIyNkDt4cF3tMqVqu5epMcLsx8R4p--ksIMKKZ1LfiYlvl5RCSMBOBQP4f8dkhrMkHBm4kl87eiNqDl5GZxnEKBJnrgciB1FnDNM0hfmdhyn83Vntj9z7AOckg0LqbTKg7_KRLIxZiZ0DoAjCjmrImv8C2ceVc8UEH3ZcIaUwD_2dYEhSzXKZ95bidrBw_17qWE_8yJHzMSI5j_zq8QHwahhcY_IAtR3mG5eWl-Rs0E",
    slots: ["free", "free", "free", "free", "free"],
  },
  {
    id: "t4",
    name: "Elena Rodriguez",
    role: "Student Liaison",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWy4t2kAxdEZ0IHJD-RfVyRa28R_yVgBib6KW1BjKbUJp3fMgaHBmCgjVB9yPYm5CYIk1Ka6_JkcbUNR7I1F-DKjRaKgX-RBNBRZCCu3hzJA7FGD9ObsFr_kjqTOslagGoluu7sOl-YPTIFeRBKcVq-eG6lJzCkpHcE0IBNe6iIOM0ThqfTiPndU4ECE9-MSJRT9bcIlI8ZtoXV7eipe7D4ZX8MtNAirmuqdVkkpcTjLa9pcvWOtyB8DudLttAeQAFkxRqFQhz5X4T",
    slots: ["busy", "busy", "busy", "free", "busy"],
  },
];

export const UPCOMING_DEADLINES: UpcomingDeadline[] = [
  {
    id: "u1",
    day: "17",
    month: "APR",
    title: "Grant Proposal Submission",
    subtitle: "Module: Research Funding",
    tone: "danger",
  },
  {
    id: "u2",
    day: "21",
    month: "APR",
    title: "Q2 Resource Audit",
    subtitle: "Module: Operations",
    tone: "tertiary",
  },
  {
    id: "u3",
    day: "24",
    month: "APR",
    title: "Alumni Keynote Draft",
    subtitle: "Module: Engagement",
    tone: "primary",
  },
];

export const BREAKDOWN_ROWS: BreakdownRow[] = [
  {
    id: "b1",
    taskName: "Research Protocol A",
    module: "Medical Ethics",
    status: "Active",
    assigneeAvatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXoZKg43CEqikVwMTxMC-WwV0UFk_T3m-p4vwDM0_1WxZzpc6l4xBXOtqeQ0eS_XRn2BS2A1h-ygo9oIMONAEZUFN3YMIKezuepNtKhjWlVc3ag-83YHLhjbv3Mm3hWNBnWf3RBRPhb495wcPYIKol0EYGYhMm3dfdH34Ha3Amewr3-oyhjH8bBFIxjatnH-0Vk5VfbF9t6wTJ8E6Doi8a_nmMgXUNyOTovN4ZLsaiUg2Vb7IbCU1h3xuYedLTd8loWW4DkntuhuZ",
    dates: "Apr 12 - 19",
    progressPercent: 65,
    progressTone: "primary",
    priority: "High",
    priorityTone: "danger",
  },
  {
    id: "b2",
    taskName: "Library Archiving",
    module: "Information Systems",
    status: "Complete",
    assigneeAvatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEYEpH6Ql30dKA-tU5oXvlS5AsQ3y_bM1BwMTdO-O5np3glxTTzkCaOCvTjrnqZ2YTDXdv2kveoDNfuofMUTgdGmxdsPq6TB_sBobk3LkOjYJDGKf84Cdz0mGuj5-HixEp1-DedYW2EAZHaCeZbJVfqswTMqcoNRZxF2g_c6byz_Ln36Pu6sdC7MOt2z6_-7YPZZ-8s4WVJlZxp25dEyGxRJeQZyxLzYwwSfoLUNJ2bw2cWEOSm_1Nf3E4_ZxIsXUPc50u9-QneiEh",
    dates: "Apr 05 - 12",
    progressPercent: 100,
    progressTone: "success",
    priority: "Low",
    priorityTone: "muted",
  },
  {
    id: "b3",
    taskName: "Equipment Calibration",
    module: "Lab Management",
    status: "In Review",
    assigneeAvatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtkjk2jWG0F9fD5HdM3-_Eg8S6nqqBVj4DNoD1oY5ucDjicSFpaMyc7jsmK7QXXEWyYqy4IKjm6ilR1WVjZ4dI7s2aUCFllVcpkRkQwuYvDSmKbFqmvwg1NzXt31R9omBN8ZnG5AhVXkWlEWx5yk4V4HXipf9IfE51KCJgrwqLy4Cwj27PxCrPmDXQ1Qq4fYtI7bzsTMiKhsNHdQelfweKLwoyew8-T88bt-oAmr4qurYPB2-K1ZyPjO4HFivMeCok81Pp7cNtyRUL",
    dates: "Apr 15 - 18",
    progressPercent: 30,
    progressTone: "tertiary",
    priority: "Med",
    priorityTone: "tertiary",
  },
];
