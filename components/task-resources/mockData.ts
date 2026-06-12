import {
  BarChart3,
  BookOpen,
  Code,
  Database,
  FileText,
  Table,
  Video,
} from "lucide-react";

import type {
  FeaturedModule,
  PinnedTask,
  ResourceCategory,
  ResourceDataset,
} from "./types";

export const RESOURCE_DATASETS: ResourceDataset[] = [
  {
    id: "d1",
    title: "quantum_fluctuation_v2.csv",
    subtitle: "Last modified 2h ago • 45.2 MB",
    tone: "indigo",
    icon: BarChart3,
    verified: true,
  },
  {
    id: "d2",
    title: "thermodynamics_baseline.xlsx",
    subtitle: "Last modified 1d ago • 12.8 MB",
    tone: "green",
    icon: Table,
  },
  {
    id: "d3",
    title: "experimental_protocol_04.pdf",
    subtitle: "Last modified 3d ago • 2.4 MB",
    tone: "amber",
    icon: FileText,
  },
];

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "c1",
    title: "E-Books & PDFs",
    countLabel: "142 items",
    icon: BookOpen,
  },
  { id: "c2", title: "Raw Datasets", countLabel: "89 items", icon: Database },
  { id: "c3", title: "Notebooks & Code", countLabel: "56 items", icon: Code },
  { id: "c4", title: "Lecture Media", countLabel: "21 items", icon: Video },
];

export const PINNED_TASKS: PinnedTask[] = [
  {
    id: "p1",
    title: "String Theory Analysis",
    description: "Reference: Witten (1995) papers attached in PDFs.",
    tone: "primary",
  },
  {
    id: "p2",
    title: "Lab Dataset: Particle Decays",
    description: "Collaborative workspace active. 4 team members.",
    tone: "success",
  },
  {
    id: "p3",
    title: "General Relativity Models",
    description: "Drafting LaTeX documentation for repository.",
    tone: "muted",
  },
];

export const FEATURED_MODULE: FeaturedModule = {
  eyebrow: "Featured Module",
  title: "Advanced Particle Simulation Toolkit v4.0",
  description:
    "Download the complete Python library and documentation for simulating high-energy collisions.",
  cta: "Access Library",
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBNICcsVR6lSWGkVfXuLuk6tdqUBgbdcA2RLjfIlET78UzubGdnx-bgJom-u5i021EbpjiEGo-Pcp1tYw8AnRzPQrVBDAsSuSqVE8c6Rw7rJjFKslT7_a7UFuDzjbLKJAFmPjiz1zlJnRZog_PA-R9btxBzJrg6Zuy69B4SzvvvEK22zk0Ql0HMPT1co2LMLcIslsFtynvXmDffMWUgKY2k-La-1Ek1x8t5QFE5uKG7xq9VXnfiei0PcyW1Wg7gfwuUL_zkgwmkSGq7",
  imageAlt:
    "Abstract 3D visualization of complex particle paths and physics simulations.",
};
