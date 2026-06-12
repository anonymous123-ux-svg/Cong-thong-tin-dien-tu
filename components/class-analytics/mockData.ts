import type { ClassAnalyticsData } from "./types";

export function getClassAnalyticsMock(classTitle: string): ClassAnalyticsData {
  return {
    title: classTitle,
    subtitle:
      "Deep dive into the Fall 2023 cohort performance and engagement metrics.",
    topStats: [
      {
        icon: "users",
        label: "Total Members",
        value: "142",
        deltaLabel: "+12%",
      },
      {
        icon: "bolt",
        label: "Active Students",
        value: "28",
        noteLabel: "Steady",
      },
      {
        icon: "star",
        label: "Avg Mastery",
        value: "76%",
        deltaLabel: "+3%",
      },
      {
        icon: "check",
        label: "Completion Rate",
        value: "84%",
        deltaLabel: "+5%",
      },
    ],
    charts: {
      attendance: {
        rangeLabel: "Last 30 Days",
        xLabels: ["Oct 01", "Oct 15", "Oct 30"],
        bars: [
          { basePct: 40, fillPct: 60 },
          { basePct: 55, fillPct: 75 },
          { basePct: 45, fillPct: 50 },
          { basePct: 70, fillPct: 85 },
          { basePct: 85, fillPct: 95 },
          { basePct: 60, fillPct: 65 },
          { basePct: 40, fillPct: 55 },
          { basePct: 75, fillPct: 80 },
          { basePct: 90, fillPct: 100 },
          { basePct: 65, fillPct: 70 },
        ],
      },
      gradeDistribution: {
        entries: [
          { label: "A (90-100)", pct: 24, barClassName: "bg-green-500" },
          { label: "B (80-89)", pct: 42, barClassName: "bg-indigo-600" },
          { label: "C (70-79)", pct: 18, barClassName: "bg-indigo-400" },
          { label: "D/F (<70)", pct: 16, barClassName: "bg-red-500" },
        ],
        medianValueLabel: "82% (B)",
      },
    },
    lower: {
      atRisk: {
        footerLabel: "View All Risk Alerts (14)",
        items: [
          {
            name: "Julian Mercer",
            severity: "CRITICAL",
            insight:
              "AI Insight: Missing 3 consecutive lab reports; engagement down 45%.",
            avatarUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDUPrjuuSZKz8-kO0i29j6mz_PCyumD2IWiOb_G5BXe9wgLLOydx7m7KsCxnXS7b5rLtZ6zjaUS_TdOQOb95N8gfpD1Vyq6_1r5KHZo0YQX_CyoErnK2DOc_EjJ4Y5xX2yNRaLf6fy6jWLG2fMmu3tk7AlZk833y6AhtMjGJXwFukcwynNAqAXFXoZOXx64H0Op2rHy4chOaixqzaGNCEuvOR3EDyyFGmQhUt7KIAH8-hJrc8yOIeuAdfrb0-o5JdCKAifuTGxN-ryV",
          },
          {
            name: "Elena Rodriguez",
            severity: "WARNING",
            insight:
              "AI Insight: Score drop in Quantum Mechanics module; suggests peer tutoring.",
            avatarUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCytHx3oWj-CZhkr6AwjlIqKsvq__XnlmpOihePQgVCSnMrnpMsA-SM443lQuLagLgEzZ2GL9Mz9iBBtr1lCcgX6nKXi4A5cIbMVyV_46M8KLtLG5j7UvHtawyijE3lp6F4I4WRVBsPJPahEKOrGCmR6y5uKONwXssPMHGvYV74g_3_v4utpO3NcP2LXbijPXyVLf2j3UussotCL6zfY31OLnhrspLnLOZVXtamAZiKRpTb2UN_-87eQduiHMsM169ZFSZixN_JMNgQ",
          },
          {
            name: "Marcus Thorne",
            severity: "WARNING",
            insight:
              "AI Insight: Rapid decline in quiz completion speed; possible comprehension block.",
            avatarUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCmX8ni7iASUKF6U2dmplQd9NRo9NVldRA8hNN-l6zn7v-JRXTKvHhxvWLOQQKmF3LkCtUl5sFTUokaC9SYa2RLWUqaSnJ9Be5V2FbR2sdmRysNWgCETl8De_CzAOnal4SOR73-97IKzmo3BUDlC-HGPRv1qKzD46jaEVKUzWx8sQymmc5xMA9t86Uoxaun_REYO5TwoaqmWDS_aQzDzV49rUM-rRr1IdgNZDRndvdgCu6UL75Ao7ibX8_djmbXR2iKn_jl9LUZ4",
          },
        ],
      },
      topPerformers: {
        badgeLabel: "Cohort Leaders",
        items: [
          {
            initials: "SC",
            name: "Sarah Chen",
            masteryLabel: "98.4%",
            badges: [{ icon: "award" }, { icon: "rocket" }],
            trend: "up",
          },
          {
            initials: "DW",
            name: "David Wu",
            masteryLabel: "96.2%",
            badges: [{ icon: "award" }],
            trend: "up",
          },
          {
            initials: "KL",
            name: "Kaitlyn Lee",
            masteryLabel: "95.8%",
            badges: [{ icon: "school" }],
            trend: "flat",
          },
          {
            initials: "JB",
            name: "James Brown",
            masteryLabel: "94.5%",
            badges: [{ icon: "trophy" }],
            trend: "up",
          },
        ],
      },
    },
  };
}
