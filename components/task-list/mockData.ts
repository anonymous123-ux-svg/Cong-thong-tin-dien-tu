import type { TaskListRow, TaskTeamMember } from "./types";

const TEAM_MEMBERS: TaskTeamMember[] = [
  {
    id: "member-1",
    name: "Team Member",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQUrbNPvc2oyVLWMvwG87-gohHutKRsHqDZ6d71ipIP28h9G7WeFVUr0WejwXweQl0CPi-WswoyioZftqk_q_i3PI9L63Qq2veAEq4ZGiek4WsoAskxBf_BD7b4EKIHyspinTOkWaAn8z67le_c-6ap0p_2aCwJZLK1WtUyvEFUZxwT11wnODF2peeD-9n4NxOY45NUyLUbf3wSSKDAaic4smn9JX5QYfGldUC9cnkzlMIdKgO-t0WztEkpzr3rrZzhCg_NihdmaHL",
  },
  {
    id: "member-2",
    name: "Team Member",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVTw9T2lqieyMKZe4BkYPQ8ohzJ5RGPxC-gFaolXoZ05Ruz2z_lmnGZBBqRwigcg76IzisEtN5fyTG3y8GQSnW0qQs6UgfLc2rIzZJUdDIljlEi91NU_ZyjsUTKxa2UrmYjg2Ds9fTAGXZ3xicLRS8kQiqiITXMrvpjxg7petkxAoIZCvEWRvjBSjOrLNy57aZPBXAxyRyUmWu6RWdSE0IQzzWFDknVIljkvyXZYUL2YsbIvj0M5UGbbLkHZthB_wM0nck_fqOQYdO",
  },
  {
    id: "member-3",
    name: "Team Member",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9dt8MGmfAp3xq31nBbBagNHrFMoX0VXsa8-InGeTp_duSofAbz9ziSW7X5tPuKdIBeY4Au6EfrsIBLT9RbgtxuPX_mPCRr5IEJEPI0Y0tCi8y5x5IKHrDWJVUIQTNWWWkO1lJnsNke85erz4e4OrMz2GyvUB_NmulAkvBY-Jq_U6bdQAImGJBzWYdPPe9Y5kFYYdS_F6TpQADCr0XuzMOiFFAsNPI8SZb40tWLA4GvmA9uN-xI5HCsTJlErQrYsGIR09nQxoKclWP",
  },
];

export const TASK_LIST_HEADER_TEAM = {
  members: TEAM_MEMBERS,
  extraCount: 12,
};

export const TASK_LIST_ROWS: TaskListRow[] = [
  {
    id: "task-1",
    title: "Quantum Entanglement Modeling",
    subtitle: "Module 4: Particle Interactions",
    priority: "High",
    status: "In Progress",
    dueDateLabel: "Oct 24, 2023",
    dueDateISO: "2023-10-24",
    team: [TEAM_MEMBERS[0], TEAM_MEMBERS[1]],
  },
  {
    id: "task-2",
    title: "Thermodynamics Data Review",
    subtitle: "Archive: Semester 1 Labs",
    priority: "Medium",
    status: "Completed",
    dueDateLabel: "Oct 12, 2023",
    dueDateISO: "2023-10-12",
    team: [TEAM_MEMBERS[2]],
  },
  {
    id: "task-3",
    title: "Black Hole Singularity Theory",
    subtitle: "Research: Final Thesis Preparation",
    priority: "High",
    status: "Planning",
    dueDateLabel: "Nov 05, 2023",
    dueDateISO: "2023-11-05",
    team: [TEAM_MEMBERS[0], TEAM_MEMBERS[1], TEAM_MEMBERS[2]],
  },
  {
    id: "task-4",
    title: "Optical Fiber Refraction Test",
    subtitle: "Laboratory: Light Studies",
    priority: "Low",
    status: "In Progress",
    dueDateLabel: "Oct 28, 2023",
    dueDateISO: "2023-10-28",
    team: [TEAM_MEMBERS[1], TEAM_MEMBERS[2]],
  },
];

export const TASK_LIST_TOTAL_COUNT = 24;

export const TASK_LIST_STATS = {
  completionRate: 74,
  teamCapacity: 82,
  teamCapacityDeltaPercent: 5.4,
  upcomingDeadlines: [
    { label: "Phase 2 Review", badge: "Today", tone: "danger" as const },
    {
      label: "Lab Safety Audit",
      badge: "Tomorrow",
      tone: "neutral" as const,
    },
  ],
};
