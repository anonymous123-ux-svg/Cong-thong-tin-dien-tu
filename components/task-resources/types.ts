import type { LucideIcon } from "lucide-react";

export type ResourceDataset = {
  id: string;
  title: string;
  subtitle: string;
  tone: "indigo" | "green" | "amber";
  icon: LucideIcon;
  verified?: boolean;
};

export type ResourceCategory = {
  id: string;
  title: string;
  countLabel: string;
  icon: LucideIcon;
};

export type PinnedTask = {
  id: string;
  title: string;
  description: string;
  tone: "primary" | "success" | "muted";
};

export type FeaturedModule = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageUrl: string;
  imageAlt: string;
};
