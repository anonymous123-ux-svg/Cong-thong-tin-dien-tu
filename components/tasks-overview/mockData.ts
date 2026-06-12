import type {
  CategoryProgress,
  RecentActivity,
  TaskStat,
  TrendPoint,
  UpcomingDeadline,
  WorkloadByPriority,
} from "./types";

export const taskStats: TaskStat[] = [
  {
    id: "total",
    label: "Total Tasks",
    value: 124,
    badge: { label: "+12%", tone: "success" },
    icon: "total",
  },
  {
    id: "active",
    label: "In Progress",
    value: 38,
    badge: { label: "Active", tone: "info" },
    icon: "active",
  },
  {
    id: "completed",
    label: "Completed",
    value: 76,
    badge: { label: "Done", tone: "success" },
    icon: "completed",
  },
  {
    id: "deadlines",
    label: "Upcoming Deadlines",
    value: 5,
    badge: { label: "Critical", tone: "danger" },
    icon: "deadline",
  },
];

export const weeklyTrend: TrendPoint[] = [
  { label: "Mon", percent: 40, heightClassName: "h-[40%]" },
  { label: "Tue", percent: 60, heightClassName: "h-[60%]" },
  { label: "Wed", percent: 45, heightClassName: "h-[45%]" },
  { label: "Thu", percent: 85, heightClassName: "h-[85%]" },
  { label: "Fri", percent: 70, heightClassName: "h-[70%]" },
  { label: "Sat", percent: 95, heightClassName: "h-[95%]", highlight: true },
  { label: "Sun", percent: 50, heightClassName: "h-[50%]" },
];

export const monthlyTrend: TrendPoint[] = [
  { label: "W1", percent: 35, heightClassName: "h-[35%]" },
  { label: "W2", percent: 55, heightClassName: "h-[55%]" },
  { label: "W3", percent: 65, heightClassName: "h-[65%]", highlight: true },
  { label: "W4", percent: 45, heightClassName: "h-[45%]" },
];

export const workloadByPriority: WorkloadByPriority[] = [
  {
    priority: "high",
    label: "High",
    countLabel: "18 Tasks",
    percent: 85,
    widthClassName: "w-[85%]",
  },
  {
    priority: "medium",
    label: "Medium",
    countLabel: "12 Tasks",
    percent: 45,
    widthClassName: "w-[45%]",
  },
  {
    priority: "low",
    label: "Low",
    countLabel: "8 Tasks",
    percent: 25,
    widthClassName: "w-[25%]",
  },
];

export const upcomingDeadlines: UpcomingDeadline[] = [
  {
    id: "qm-term-paper",
    priority: "high",
    relativeDue: "TODAY",
    title: "Quantum Mechanics Term Paper",
    dueLabel: "Due 11:59 PM",
  },
  {
    id: "solid-state-quiz",
    priority: "medium",
    relativeDue: "TOMORROW",
    title: "Solid State Physics Quiz",
    dueLabel: "Due 10:00 AM",
  },
  {
    id: "lab-report-superconductivity",
    priority: "low",
    relativeDue: "3 DAYS",
    title: "Lab Report: Superconductivity",
    dueLabel: "Due Oct 24",
  },
  {
    id: "electromagnetism-exam",
    priority: "high",
    relativeDue: "4 DAYS",
    title: "Electromagnetism Exam",
    dueLabel: "Due Oct 25",
  },
];

export const recentActivity: RecentActivity[] = [
  {
    id: "wave-functions-complete",
    type: "completed",
    description: 'Marked "Wave Functions" as Complete',
    contributor: {
      name: "John Doe",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYjpzKECy8Le61UonuXI9avo59nxSqNpOnrUk3sDqeTOoW9ijm10y2aKnYXBZtmZ7vYpYnaxYTIv9w3CZOx7rtmXPfwgmkQTrgxqNcLjJUFydXanyDt2F2ttp08l5cpJKYzfF5PYDBct6TMVASAxZ-ZI9ZhN3RDfIL72ZLbSmcccib6Kw1azRqcb4_9bCkUORzwcZB-edydp0qAzry5SweNHOdbR4kDyxp17uP5cLaQx3JLdFpgkYaIMW8JFhiOXigVMf8LlEh259",
    },
    category: "Homework",
    timestamp: "2 hours ago",
  },
  {
    id: "bosons-added",
    type: "added",
    description: 'Added "Research on Bosons"',
    contributor: {
      name: "Sarah A.",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nuBftPl0okvkhxkGcyaDcPHGikTBcgTYN6dk7QeEQtfeebvHBj9iQ95N0Dq8_j8Zq3CGm_c1ieqIwjnlxV-ra4vAB9sc0AO21C4XdlJhWQKqFs7YoL_d4boef-LAUlOTl-X5b2wn2xkSACeckBoRaqsLMegTmlXftyE61N7BwRD0cfSnRV2U1CD_mvCyNmK4KUCYbm4HkMBb-eFsDfcM1iDzLtoCqemneHGkWz7joccXfwQ9khVRnAupmjMoJbSEizAjZq2XGVAy",
    },
    category: "Project",
    timestamp: "5 hours ago",
  },
];

export const categoryProgress: CategoryProgress[] = [
  { label: "Homework", percent: 45, tone: "primary" },
  { label: "Exams", percent: 30, tone: "success" },
  { label: "Projects", percent: 25, tone: "muted" },
];
