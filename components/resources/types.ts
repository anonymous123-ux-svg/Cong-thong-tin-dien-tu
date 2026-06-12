export type ResourceCategoryKey =
  | "all"
  | "lectures"
  | "assignments"
  | "research"
  | "datasets";

export type ResourceKind = "pdf" | "video" | "doc" | "dataset";

export type ResourceTag = {
  label: string;
};

export type ResourceAuthor =
  | {
      kind: "avatar";
      name: string;
      avatarUrl: string;
    }
  | {
      kind: "initials";
      name: string;
      initials: string;
    };

export type ResourceItem = {
  id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  tags: ResourceTag[];
  author: ResourceAuthor;
  updatedLabel: string;
  category: Exclude<ResourceCategoryKey, "all">;
};

export type CategoryItem = {
  key: ResourceCategoryKey;
  label: string;
  count?: number;
};

export type StarredModule = {
  id: string;
  label: string;
  dotColorClassName: string;
};
