export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  lifecycle: "Active" | "Completed" | "Draft";
  publishStatus: "Published" | "In Review" | "Draft" | "Archived";
  students: number;
  rating: number | null;
  modules: number;
  updatedAt: string;
  thumbnailSrc: string;
  avatarUrls: string[];
  code: string;
  featured?: boolean;
};
