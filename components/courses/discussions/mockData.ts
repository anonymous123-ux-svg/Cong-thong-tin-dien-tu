import type { ContributionSummary, DiscussionThread } from "./types";

export const discussionThreads: DiscussionThread[] = [
  {
    id: "thread-clarification-bell-states",
    title: "Clarification needed on Bell States and entanglement correlation",
    excerpt:
      "I'm struggling to visualize how the four Bell states form a complete orthonormal basis for the two-qubit Hilbert space. The math makes sense, but the physical intuition is lacking. Can someone explain this differently?",
    votes: 42,
    replies: 12,
    authorName: "Sarah J.",
    authorAvatarUrl: "https://i.pravatar.cc/80?img=5",
    timeAgoLabel: "2 hours ago",
    tag: { label: "Resolved", variant: "resolved" },
    contextLabel: "Module 3: Superposition",
  },
  {
    id: "thread-study-group-midterm",
    title: "Study group for upcoming Midterm",
    excerpt:
      "Hey everyone, a few of us are organizing a virtual study group this weekend to go over the practice problems for the midterm. We'll be using Discord. Let me know if you want the invite link!",
    votes: 18,
    replies: 34,
    authorName: "David M.",
    authorAvatarUrl: "https://i.pravatar.cc/80?img=12",
    timeAgoLabel: "5 hours ago",
    tag: { label: "General", variant: "general" },
  },
];

export const contributionSummary: ContributionSummary = {
  posts: 14,
  replies: 48,
  reputationLabel: "Top 5% Contributor",
};

export const discussionFilters = [
  "All Topics",
  "Lesson-based",
  "General",
  "Announcements",
] as const;

export const sortOptions = [
  "Latest Activity",
  "Most Popular",
  "Unanswered",
] as const;
