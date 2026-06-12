import ResourceCard from "./ResourceCard";
import type { ResourceItem } from "./types";

type ResourceGridProps = {
  resources: ResourceItem[];
  onView?: (resourceId: string) => void;
  onDownload?: (resourceId: string) => void;
  onEdit?: (resourceId: string) => void;
};

export default function ResourceGrid({
  resources,
  onView,
  onDownload,
  onEdit,
}: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onView={onView}
          onDownload={onDownload}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
