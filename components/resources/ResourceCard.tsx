import Image from "next/image";
import {
  Download,
  Eye,
  FileText,
  Pencil,
  PlayCircle,
  Table,
} from "lucide-react";
import type { ResourceItem } from "./types";

// Icon styles matching the design image exactly
const RESOURCE_META: Record<
  ResourceItem["kind"],
  { Icon: typeof FileText; bg: string; color: string }
> = {
  pdf: { Icon: FileText, bg: "#FEF2F2", color: "#EF4444" }, // red
  video: { Icon: PlayCircle, bg: "#ECFDF5", color: "#10B981" }, // green
  doc: { Icon: FileText, bg: "#FFF7ED", color: "#F97316" }, // orange
  dataset: { Icon: Table, bg: "#EEF2FF", color: "#4338CA" }, // indigo
};

type ResourceCardProps = {
  resource: ResourceItem;
  onView?: (resourceId: string) => void;
  onDownload?: (resourceId: string) => void;
  onEdit?: (resourceId: string) => void;
};

export default function ResourceCard({
  resource,
  onView,
  onDownload,
  onEdit,
}: ResourceCardProps) {
  const { Icon, bg, color } = RESOURCE_META[resource.kind];

  return (
    <article
      className="group rounded-3xl p-6 transition-all hover:shadow-[0_20px_40px_rgba(67,56,202,0.08)]"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        {/* Kind icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: bg }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {[
            {
              label: "View resource",
              Icon2: Eye,
              handler: () => onView?.(resource.id),
            },
            {
              label: "Download resource",
              Icon2: Download,
              handler: () => onDownload?.(resource.id),
            },
            {
              label: "Edit resource",
              Icon2: Pencil,
              handler: () => onEdit?.(resource.id),
            },
          ].map(({ label, Icon2, handler }) => (
            <button
              key={label}
              type="button"
              className="cursor-pointer rounded-lg p-2 transition-colors"
              style={{ color: "#CBD5E1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4338CA")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#CBD5E1")}
              aria-label={label}
              onClick={handler}
            >
              <Icon2 className="h-4 w-4" />
            </button>
          ))}
        </div>
      </header>

      <h3
        className="mb-2 text-lg font-bold leading-tight"
        style={{ color: "#0F172A" }}
      >
        {resource.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm" style={{ color: "#64748B" }}>
        {resource.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag.label}
            className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: "#F1F5F9", color: "#4338CA" }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Footer */}
      <footer
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "1px solid #F1F5F9" }}
      >
        <div className="flex items-center gap-2">
          {resource.author.kind === "avatar" ? (
            <div className="h-6 w-6 overflow-hidden rounded-full bg-slate-200">
              <Image
                src={resource.author.avatarUrl}
                alt={resource.author.name}
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold"
              style={{ backgroundColor: "#E2E8F0", color: "#64748B" }}
            >
              {resource.author.initials}
            </div>
          )}
          <span className="text-xs font-medium" style={{ color: "#64748B" }}>
            {resource.author.name}
          </span>
        </div>

        <span className="text-[10px] font-medium" style={{ color: "#94A3B8" }}>
          {resource.updatedLabel}
        </span>
      </footer>
    </article>
  );
}
