import type {
  ClassSummary,
  GradeAlert,
  PerformanceCard,
  ScheduleItem,
  Student,
} from "./types";

export const CLASS_SUMMARY: ClassSummary = {
  cohortLabel: "Cohort 2024-B",
  title: "Advanced Quantum Dynamics",
  subtitle: "Postgraduate Research Track • Room 402, Science Wing",
};

export const PERFORMANCE_CARDS: PerformanceCard[] = [
  {
    id: "class-average",
    label: "Class Average",
    value: "84.2%",
    valueNote: "+2.4%",
    variant: "primary",
    progressLabel: "Average",
    progressValue: 84,
  },
  {
    id: "assignments-graded",
    label: "Assignments Graded",
    value: "12/15",
    valueNote: "80%",
    variant: "secondary",
  },
  {
    id: "active-students",
    label: "Active Students",
    value: "28",
    valueNote: "/ 30 Cap",
    variant: "neutral",
  },
];

export const STUDENTS: Student[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    studentIdLabel: "#44921-X",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnUg7ow1wRwxZdYLq-jcsVweiDBRJbfGOJ6F7XT4_A00taYMVyDg_wugC9e5MKUjCpZEAy9NFZQngJZBflGhiuNGMd6V-R4BuynynvgliVPUSFI2RHymqFdRWXNvJzNIxfJVBq9wcCPfPq74_apr9Y53L3nWuMhBvUTX0IPuFjNpDzBPPErZL2V1elBp5y_MO-IAPOBxGvSUF3hiAROd_sLzOGQNYJ7YYfbFkfHYem9W-9ZPJHsJMp3FXj_0L8IE59aU99P3irDz21",
    status: "Top Performer",
    performance: "98.2%",
    lastActive: "2 mins ago",
  },
  {
    id: "marcus-vane",
    name: "Marcus Vane",
    studentIdLabel: "#44922-K",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsbQEBZnygFDfGHetQXEpa9S4DrXRekgsZ-LgO6KftVgh4e7azoYJsrsMsUh_0KjaJH-7PN5fm-BgffF9Ti409h0W11iY_jHV83iblajDOxsSFKCUJm7c9zqqC4YKzt1AJpBemofuF85ye77Nln7RHHVxKXkwcDGoGMWMOGPbSQxrcKdCk_VlKnkUaNwiLANRDlu7C7fTHtCxg5OUcXOE4VOfdzvC_nRTNEY7ylTQiuoGOrVXTp-wGyyxaHg5pUI6g2MNnQuydoFQZ",
    status: "Stable",
    performance: "84.5%",
    lastActive: "4 hours ago",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    studentIdLabel: "#44923-P",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3RQ54-kk3yqCSgFzvYI1ePA21S3GyynLS4zGSFge1nS8DnpQ72mBu3IYZzuHPuvHCLYDW5Kjy3WOP2R6KFoGDp1mmNd86fXoqdVRTeRlCSTruz6LTL8GI1KbygQLYVyncrl1SgNwc94sTGDwrHs24q31xBGcznLJOL9xg7eLeWmMeWpiCWRVOacnbj2ZM6xNbxmdenAstW39fU0SZ5zopMLSB-VBGTW7mtRMsaT0ZwBN2wCl_JbXkycKiGW0fprKnu41wsxqeKHuw",
    status: "At Risk",
    performance: "61.0%",
    lastActive: "Yesterday",
  },
  {
    id: "liam-oconnor",
    name: "Liam O'Connor",
    studentIdLabel: "#44924-A",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkvwd6sHM2lBsIRJjfxA61yAq-ivHDtGsTMyQ591y_1tjd0kftiW-WXPGGnUwCwo_RqVf3msWXj1_pkmaj25AqupOgyQDgmgOHgMIwkI-TPP2tcJmVIhvpzNosDsR-OEf0QBTNgwlPn_C2l3lKQqUMoRY7QqY4nizJ_f2WXxYn5n5xoDbV4UzWtjD77oAX5c02h8Z3XR1gB7vMjSj2Y8YY62qDdX-A0hCYXANuJf6HEXfRLmenlzX9_gihVZePyGeVeE8zAawJ8tOc",
    status: "Stable",
    performance: "79.8%",
    lastActive: "3 days ago",
  },
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: "mon",
    day: "MON",
    time: "14:00 - 16:00",
    location: "Lecture Hall A",
  },
  {
    id: "wed",
    day: "WED",
    time: "10:00 - 12:00",
    location: "Research Lab 4",
  },
];

export const GRADE_ALERTS: GradeAlert[] = [
  {
    id: "late-submissions",
    tone: "error",
    title: "3 Late Submissions",
    subtitle: "Assignment: 'Quantum States'",
  },
  {
    id: "graded",
    tone: "success",
    title: "24 Graded",
    subtitle: "Lab Report 02",
  },
];
