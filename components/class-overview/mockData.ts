import type {
  AtRiskStudent,
  RecentActivityItem,
  SectionRow,
  StatCard,
  UpcomingEvent,
} from "./types";

export const CLASS_OVERVIEW_META = {
  title: "Class Overview",
  subtitle: "Monitoring Advanced Curation – Section A (Winter 2024)",
};

export const STAT_CARDS: StatCard[] = [
  {
    id: "students",
    label: "Total Students",
    value: "124",
    badge: "+4%",
    badgeTone: "success",
    icon: "students",
  },
  {
    id: "attendance",
    label: "Attendance",
    value: "92.8%",
    badge: "Stable",
    badgeTone: "neutral",
    icon: "attendance",
  },
  {
    id: "performance",
    label: "Avg Performance",
    value: "88.4%",
    badge: "+2.1",
    badgeTone: "success",
    icon: "performance",
  },
  {
    id: "alerts",
    label: "Active Alerts",
    value: "03",
    badge: "Critical",
    badgeTone: "danger",
    icon: "alerts",
  },
];

export const SECTIONS: SectionRow[] = [
  {
    id: "section-a",
    name: "Advanced Curation - Section A",
    instructor: { initials: "RH", name: "Dr. Robert Hayes", tone: "primary" },
    occupancy: { current: 38, max: 40, tone: "secondary" },
    schedule: "Mon/Wed • 10:00 AM",
    status: { label: "ALMOST FULL", tone: "secondary" },
  },
  {
    id: "section-b",
    name: "Advanced Curation - Section B",
    instructor: {
      initials: "SC",
      name: "Sarah Collins",
      tone: "primaryContainer",
    },
    occupancy: { current: 28, max: 40, tone: "primary" },
    schedule: "Tue/Thu • 02:00 PM",
    status: { label: "OPEN", tone: "primary" },
  },
];

export const AT_RISK_STUDENTS: AtRiskStudent[] = [
  {
    id: "marcus-lee",
    initials: "ML",
    name: "Marcus Lee",
    tone: "critical",
    note: "3 missing assignments",
  },
  {
    id: "anita-white",
    initials: "AW",
    name: "Anita White",
    tone: "high",
    note: "Low participation score (20%)",
  },
  {
    id: "james-dean",
    initials: "JD",
    name: "James Dean",
    tone: "medium",
    note: "Declining quiz trend",
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "midterm",
    month: "DEC",
    day: "12",
    title: "Mid-Term Assessment",
    meta: "09:00 AM • Lab 402",
  },
  {
    id: "guest-lecture",
    month: "DEC",
    day: "15",
    title: "Guest Lecture: AI Trends",
    meta: "02:30 PM • Main Hall",
  },
];

export const RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: "activity-1",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2mUR_93NWZg30w-BBFSNnXw6LFfr4QUp4oRsTYbjj-N8Xm4yRMyoPmn0LfvyG8uPx8bWT7g4miXE5ThCg1rYZXTv_98XZDQpY0ufKxlHZtkBX_HBrsFVZo-rqkiQK_kT_iZV2tGYo4zI2ZgxAzKfiPaxhupt8FrPeYGPRBQE7aixSRrS1FWDUOehPREUz4pe9YOqUiH8y1gjr0rNgPyX7TqP-oYLlcPX-KQ4urjBIfDQgqH-K2M56Ehkjmi3qHNo7U2hJkkHxpG-",
    name: "David Chen",
    action: "submitted the final curation project.",
    timeAgo: "14 minutes ago",
    badge: { label: "Graded", tone: "secondary" },
  },
  {
    id: "activity-2",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAecLOHgyu5Tysafm_zseSjkb06PWqiNkt3A_zwK04bn_dL1OkbU4Y8Hvv87dnJQhgGxD7iPje79XUm1oChcDkAZAzK6sG8ndWw9SpO7Pe8NrfuDN1quihdIhvwhe53QLimQegyAH61bngNdAPdrEFqfpROiW9UoWqFLVs5T1xBbuxr5b-ZmWOZAfqFpYptUow5m_9tfEGV08rZkJYOBn0UM9QxmlD3PDjvI7EMpdIKyoBcL3l3zin9Yu9eAtpMFEu36wYhvrnAK8ED",
    name: "Sarah Jenkins",
    action: 'raised an inquiry on "Module 04: Visual Curation".',
    timeAgo: "1 hour ago",
    badge: { label: "Support", tone: "primary" },
  },
];
