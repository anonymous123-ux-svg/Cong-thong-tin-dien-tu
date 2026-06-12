import type { TaskMemberDetail } from "./types";

const DEFAULT_DETAIL: TaskMemberDetail = {
  taskId: "task-1",
  moduleLabel: "Module 04",
  phaseLabel: "Active Phase",
  title: "Quantum Entanglement Lab",
  description:
    "Cooperative research task focusing on EPR paradox simulations and Bell inequality verification.",
  assignedCount: 4,
  collaborators: [
    {
      id: "collab-1",
      name: "Dr. Julianne Davis",
      role: "Lead Researcher • Simulation Specialist",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GHZYNkSfnfkMtECsLcRbLiedjtXhXHR5tghBh0UIBxmFUTx0Dhp5yLOqUC9GSdOPEn3LygQ4EkDa7ekvBp2o4bMggPDSJqhwXy5HgeOe5LDqnQLV2tqjwAKiUg3tEH43L2LunYH_a6mNuim833SW9MH24FwIwW-phYBMQ4danhpMeUsbLcLmH-x-bcOIVResegDFN4kkfl_bcAdWIEuMKtnbQHiT33PFAgPtyYVc7k2cHYvNR3WwNYAgqtTc8McuEjontONYFssr",
      presence: "online",
      score: 98.4,
    },
    {
      id: "collab-2",
      name: "Alex Mercer",
      role: "Data Analyst • Algorithm Design",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDB2QaGtCGjHoFLpQkpXhSeP7fnuk2kN_rYOPoXDcGinPmdO7a3a39PztjlITYVroG9YdXhYQ5tCqZNR6fhX0aIQX5rPMXRywvgeHhDML2HKQaLLZhC-uGtEHIQxymXEXfDTPbFMNLOJeqHbAeujlgcqaC4kAm_AYcTBGhJbKB3pkc30SZZJDloRtSZtEmSBnV6uCS0TM8IYe2Ap5_Qy4n4RJUajtPxJn-FwkEo4HxNGb6bSOWDvfLq9x2wDMNO4DTr9d8lPt3R1VsZ",
      presence: "online",
      score: 92.1,
    },
    {
      id: "collab-3",
      name: "Sarah Lin",
      role: "Theoretical Reviewer • Peer Auditor",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIwykLeqzoww3eCX0H4yUQzNwqoup3fYKLkumtkW2klCqIN06VUJtJJ-cLzsZBcoJ9O4a4lLI85_7CuxjbBZ9wNT1Z99lfIkPFpNXJzoLhrdrvlKC2a-4uJ3CTCDN1MjgFK9MkKB1FR6fRuM9_NNOxUHqX0FKIH2c4jN9ZQZ8Dhe9n5BA0o2MVbrvoAGIe-4QmJSj5e4ndZcDLObCVEIngkVw8Q5apN7OSxJewd_FTVs3xXJG1AarxjScaS8Yx8UORicmyDHm_Ye4n",
      presence: "idle",
      score: 88.5,
    },
    {
      id: "collab-4",
      name: "Morgan Lee",
      role: "Research Assistant • Documentation",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDqX4kJQO4lgbZDEdr-ZsohPmY5p6xADoSp1JRq5JMq2ofuQxyX9foJGj78os-ozdNlwYFBIixj7kqj4n8nViKZysm0pxBMQVFb9Y6YWK7Hn7tTWstFn3gn2UJix3QUdhf4b7BczD5LVBXX65ujiysZrDJf5FilzavEgtZDOvcRsNzsDEDldJjzsmkLe7AtNCerS5ElIFBSMxiOJFO-bh7NRlfGQvFcT2MxozDp1VvrONf_e8r7OT3i8ymEmFHkaQr81ntqJN3UGiZ_",
      presence: "online",
      score: 86.2,
    },
  ],
  activityLogs: [
    {
      id: "log-1",
      type: "update",
      title: "Julianne Davis updated Simulation Alpha-7",
      description:
        "Refined the qubit interaction parameters for higher fidelity.",
      timestampLabel: "2 HOURS AGO",
    },
    {
      id: "log-2",
      type: "complete",
      title: "Alex Mercer completed Data Ingestion Phase",
      description:
        "Successfully imported 5TB of telemetry from the CERN portal.",
      timestampLabel: "6 HOURS AGO",
    },
    {
      id: "log-3",
      type: "discussion",
      title: 'New discussion thread started: "Paradox Limits"',
      description: "Sarah Lin raised questions regarding the observer effect.",
      timestampLabel: "YESTERDAY",
    },
  ],
  syncRatePercent: 85,
  aboveBenchmarkPercent: 12,
  resourceAllocation: {
    calculation: 70,
    theorizing: 45,
    peerReview: 90,
  },
  referenceCard: {
    label: "Reference",
    title: "The EPR Paradox Revisited",
    description:
      "Study the foundational paper by Einstein, Podolsky, and Rosen.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBySgSGC3oeZZ3g6w252qjRjSV_Zwp6nTtFTf0SwfM5NyiMZ8-DS-qimV8KO7c8X1CxfmOh0C_mPX74pfj57JlQ-nNq4qilaBwjkt0SCh-gtpztz3tj-ERDAg5Nvx_2p6jtuEG-5x-d4d2HkOpLObgzKEONre7h77IXuxGJe_5S37lN4EbwvRPPhZTp3dK1ZPKOkbMPyiwCTdR8-YMjR2P_UuiJM5GJFIE_NOHo2mE7IiurmGXyZ5ydjHzUZ0l52bL-GDgZv_SxIRXA",
  },
};

const DETAILS: Record<string, TaskMemberDetail> = {
  "task-1": DEFAULT_DETAIL,
  "task-2": {
    ...DEFAULT_DETAIL,
    taskId: "task-2",
    moduleLabel: "Archive",
    phaseLabel: "Completed",
    title: "Thermodynamics Review",
  },
  "task-3": {
    ...DEFAULT_DETAIL,
    taskId: "task-3",
    moduleLabel: "Research",
    phaseLabel: "Planning",
    title: "Singularity Theory",
  },
  "task-4": {
    ...DEFAULT_DETAIL,
    taskId: "task-4",
    moduleLabel: "Laboratory",
    phaseLabel: "In Progress",
    title: "Optical Fiber Test",
  },
};

export function getTaskMemberDetail(taskId: string): TaskMemberDetail {
  return DETAILS[taskId] ?? { ...DEFAULT_DETAIL, taskId };
}
