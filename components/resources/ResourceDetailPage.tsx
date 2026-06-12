import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Edit,
  Info,
  Maximize2,
  Minus,
  Plus,
  Share2,
  Star,
  Eye,
} from "lucide-react";

import type { ResourceItem } from "./types";

function kindLabel(kind: ResourceItem["kind"]) {
  switch (kind) {
    case "pdf":
      return "Document (PDF)";
    case "video":
      return "Video";
    case "doc":
      return "Document";
    case "dataset":
      return "Dataset";
    default:
      return "Resource";
  }
}

function fileBadge(kind: ResourceItem["kind"]) {
  switch (kind) {
    case "pdf":
      return { label: "PDF", bg: "#FEF2F2", color: "#EF4444" };
    case "video":
      return { label: "VIDEO", bg: "#ECFDF5", color: "#10B981" };
    case "doc":
      return { label: "DOC", bg: "#FFF7ED", color: "#F97316" };
    case "dataset":
      return { label: "DATA", bg: "#EEF2FF", color: "#4338CA" };
    default:
      return { label: "FILE", bg: "#F1F5F9", color: "#64748B" };
  }
}

function toFilename(title: string, kind: ResourceItem["kind"]) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
  const ext =
    kind === "pdf"
      ? "pdf"
      : kind === "video"
        ? "mp4"
        : kind === "dataset"
          ? "csv"
          : "doc";
  return `${base || "resource"}.${ext}`;
}

// Activity row data
const ACTIVITY = [
  {
    name: "Sarah J. Miller",
    action: "Viewed 12m ago",
    icon: "eye",
    role: "Student",
  },
  {
    name: "Prof. Liam Chen",
    action: "Downloaded 1h ago",
    icon: "download",
    role: "Admin",
  },
  {
    name: "Marcus Rodriguez",
    action: "Viewed 3h ago",
    icon: "eye",
    role: "Student",
  },
];

// Related items with icon colours matching design
const RELATED = [
  {
    title: "Lecture: Introduction to Dirac Notation",
    meta: "Video • 45:12 min",
    iconBg: "#EEF2FF",
    iconColor: "#4338CA",
    Icon: "play",
  },
  {
    title: "Assignment: The Stern-Gerlach Experiment",
    meta: "Exercise • Due Oct 24",
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    Icon: "edit",
  },
  {
    title: "Supplement: Pauli Matrices Reference Sheet",
    meta: "Cheat Sheet • 2 pages",
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
    Icon: "star",
  },
];

type Props = { resource: ResourceItem };

export default function ResourceDetailPage({ resource }: Props) {
  const badge = fileBadge(resource.kind);
  const filename = toFilename(resource.title, resource.kind);
  const moduleTag = resource.tags.find((t) => /^module\s+/i.test(t.label));
  const moduleLabel = moduleTag?.label ?? "Module 04";

  const authorInitials =
    resource.author.kind === "initials"
      ? resource.author.initials
      : resource.author.name
          .split(" ")
          .slice(0, 2)
          .map((p) => p[0])
          .join("")
          .toUpperCase();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FC" }}>
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* ── Header ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Link
              href="/class/resources"
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#94A3B8" }}
            >
              <span>Resources</span>
              <span>›</span>
              <span style={{ color: "#4338CA" }}>Detailed View</span>
            </nav>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "#0F172A" }}
            >
              {resource.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
            >
              <Edit className="h-5 w-5" />
              Edit Resource
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.99]"
              style={{
                backgroundColor: "#4338CA",
                boxShadow: "0 4px 14px rgba(67,56,202,0.3)",
              }}
            >
              <Download className="h-5 w-5" />
              Download
            </button>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
          {/* ── PDF Preview ── */}
          <div className="space-y-6 lg:col-span-6">
            <section
              className="flex h-[800px] flex-col overflow-hidden rounded-3xl"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {/* Toolbar */}
              <header
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: "1px solid #F1F5F9",
                  backgroundColor: "#ffffff",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-12 items-center justify-center rounded text-xs font-bold"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                    aria-hidden="true"
                  >
                    {badge.label}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#64748B" }}
                  >
                    {filename}
                  </span>
                </div>

                <div
                  className="flex items-center gap-3"
                  style={{ color: "#94A3B8" }}
                >
                  <button
                    type="button"
                    className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
                    aria-label="Zoom out"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-semibold">75%</span>
                  <button
                    type="button"
                    className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
                    aria-label="Zoom in"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span
                    className="mx-2 h-4 w-px bg-gray-200"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Page content */}
              <div
                className="flex-1 overflow-y-auto p-8"
                style={{ backgroundColor: "#F1F5F9" }}
              >
                <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
                  <div className="relative aspect-[1/1.414] w-full rounded-sm bg-white p-12 shadow-sm">
                    <div className="space-y-4">
                      <div
                        className="h-4 w-3/4 rounded-full"
                        style={{ backgroundColor: "#E2E8F0" }}
                      />
                      <div
                        className="h-8 w-full rounded-sm"
                        style={{ backgroundColor: "#EEF2FF" }}
                      />
                      <div className="space-y-2 pt-6">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-3 rounded-full ${i === 3 ? "w-5/6" : "w-full"}`}
                            style={{ backgroundColor: "#E2E8F0" }}
                          />
                        ))}
                      </div>
                      <div
                        className="mt-8 h-48 w-full overflow-hidden rounded-xl"
                        style={{ backgroundColor: "#C7D2FE", opacity: 0.4 }}
                      />
                      <div className="space-y-2 pt-8">
                        <div
                          className="h-3 w-full rounded-full"
                          style={{ backgroundColor: "#E2E8F0" }}
                        />
                        <div
                          className="h-3 w-4/5 rounded-full"
                          style={{ backgroundColor: "#E2E8F0" }}
                        />
                      </div>
                    </div>
                    <p
                      className="absolute bottom-4 right-6 text-[10px] font-medium"
                      style={{ color: "#94A3B8" }}
                    >
                      Page 1 of 42
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6 lg:col-span-4">
            {/* Resource Attributes */}
            <section
              className="space-y-6 rounded-3xl p-6"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ color: "#0F172A" }}>
                  Resource Attributes
                </h2>
                <Info
                  className="h-5 w-5"
                  style={{ color: "#94A3B8" }}
                  aria-hidden="true"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "Type", value: kindLabel(resource.kind) },
                  { label: "Size", value: "4.2 MB" },
                  { label: "Uploaded", value: "Oct 12, 2023" },
                  { label: "Version", value: "v4.1.2" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: "#94A3B8" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#0F172A" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#94A3B8" }}
                >
                  Owner / Instructor
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                  >
                    {authorInitials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#0F172A" }}
                    >
                      {resource.author.name}
                    </p>
                    <p className="text-[11px]" style={{ color: "#94A3B8" }}>
                      Physics Department
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Insights */}
            <section
              className="relative overflow-hidden rounded-3xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, #3730A3 0%, #4338CA 60%, #5B5FCF 100%)",
              }}
            >
              {/* Decorative star */}
              <div
                className="absolute -right-4 -top-4 opacity-10"
                aria-hidden="true"
              >
                <Star className="h-28 w-28 text-white" />
              </div>

              <div className="relative space-y-3">
                {/* Label row */}
                <div
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#A5B4FC" }}
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(165,180,252,0.2)" }}
                  >
                    <Eye className="h-3.5 w-3.5" style={{ color: "#A5B4FC" }} />
                  </span>
                  Curator AI Insights
                </div>

                {/* Headline */}
                <p className="text-lg font-medium leading-relaxed text-white">
                  This resource has{" "}
                  <span className="font-bold" style={{ color: "#4ADE80" }}>
                    15% higher engagement
                  </span>{" "}
                  than the average for {moduleLabel}.
                </p>

                {/* Sub-text */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Students frequently highlight Chapter 3 (Particle Spin).
                  Consider creating a dedicated assessment for this section.
                </p>
              </div>
            </section>

            {/* Recent Activity */}
            <section
              className="space-y-4 rounded-3xl p-6"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ color: "#0F172A" }}>
                  Recent Activity
                </h2>
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase tracking-widest hover:underline"
                  style={{ color: "#4338CA" }}
                >
                  View All
                </button>
              </div>

              <div className="divide-y" style={{ borderColor: "#F1F5F9" }}>
                {ACTIVITY.map(({ name, action, icon, role }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      {icon === "download" ? (
                        <Download
                          className="h-5 w-5"
                          style={{ color: "#94A3B8" }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye
                          className="h-5 w-5"
                          style={{ color: "#94A3B8" }}
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <p
                          className="text-xs font-bold"
                          style={{ color: "#0F172A" }}
                        >
                          {name}
                        </p>
                        <p className="text-[10px]" style={{ color: "#94A3B8" }}>
                          {action}
                        </p>
                      </div>
                    </div>
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-semibold"
                      style={
                        role === "Admin"
                          ? { backgroundColor: "#EEF2FF", color: "#4338CA" }
                          : { backgroundColor: "#F1F5F9", color: "#64748B" }
                      }
                    >
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Related */}
            <section
              className="space-y-4 rounded-3xl p-6"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <h2 className="text-lg font-bold" style={{ color: "#0F172A" }}>
                {moduleLabel}: Related
              </h2>

              <div className="space-y-2">
                {RELATED.map(
                  ({ title, meta, iconBg, iconColor, Icon: iconName }) => (
                    <div
                      key={title}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-gray-50"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: iconBg }}
                      >
                        {iconName === "play" ? (
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: iconColor }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : iconName === "edit" ? (
                          <Edit
                            className="h-4 w-4"
                            style={{ color: iconColor }}
                          />
                        ) : (
                          <Star
                            className="h-4 w-4"
                            style={{ color: iconColor }}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-bold transition-colors group-hover:text-indigo-600"
                          style={{ color: "#0F172A" }}
                        >
                          {title}
                        </p>
                        <p
                          className="mt-0.5 text-[10px]"
                          style={{ color: "#94A3B8" }}
                        >
                          {meta}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
