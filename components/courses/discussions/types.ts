export type DiscussionTopicTag = {
  label: string;
  variant: "resolved" | "general" | "lesson" | "announcement";
};

export type DiscussionThread = {
  id: string;
  title: string;
  excerpt: string;
  votes: number;
  replies: number;
  authorName: string;
  authorAvatarUrl?: string;
  timeAgoLabel: string;
  tag: DiscussionTopicTag;
  contextLabel?: string;
};

export type ContributionSummary = {
  posts: number;
  replies: number;
  reputationLabel: string;
};
