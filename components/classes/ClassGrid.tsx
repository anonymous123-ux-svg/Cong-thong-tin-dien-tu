import type { ClassDirectoryItem } from "./types";
import ClassCard from "./ClassCard";

type ClassGridProps = {
  items: ClassDirectoryItem[];
};

export default function ClassGrid({ items }: ClassGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ClassCard key={item.id} item={item} />
      ))}
    </div>
  );
}
