export type NoteMeta = {
  id: string;
  title: string;
  excerpt: string;
  pinned?: boolean;
  moduleId?: string;
  updatedAt: string;
  moduleLabel?: string;
};

export type ModuleNode = {
  id: string;
  title: string;
  iconTone: "primary" | "muted";
  items: Array<{ id: string; title: string }>;
};
