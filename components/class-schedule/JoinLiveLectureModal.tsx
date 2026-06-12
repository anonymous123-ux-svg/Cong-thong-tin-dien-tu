"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Clock, FileText, PlayCircle, Users, X } from "lucide-react";

type JoinLiveLectureModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const LIVE_LECTURE_CONTENT = {
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ekLV2-7y0AbUKBsT0sDp5MYUDd5RviW0tF5qThUVTGtD3cLNKeTodgY0LKzWdnLqgx5WJhIYbYRJLL6sXx6i6NDx5jTFRuuNG5faSgtbU6h-8p_OORSLwE_rHFYqrFiAWwlN62BbtiUWc3IdXhf_0xhJKvAnmqYBa9io2fAtZh5ebNSNYOR4o8IeZTkwJ_jQRZT0IDTN64_cEj8jWvff7kadR6WdCD6U_j3FuPFeLpDEKfAot_6EYKMnkG59gs9RWYprft-CgJzy",
  courseLabel: "Advanced Architecture • ARC-502",
  title: "The Philosophy of Vernacular Structural Systems",
  lecturerName: "Dr. Elena Volkov",
  lecturerImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRuhEQ28iEr-KUMH8MJMd94woTtuLUMA0Ez5BtOKv3EgTq7ppWxk42L2uFdsDQ6imO1AWgj1yd4R-6DPdI2wt2tta4d4PQzL-hT6MAWUrqaNVKW7vJPjsFyQPjW9bjwdzR9erdhcpGBPIdQab3-e9Oej5mkyuidR1TwQfJ8PewDjRPwLj5xMwNZKr5bG-ZyVLb6yBM6kmT_PxwnyoctU4sthqreTYJZGOgzLFtYEApxrQVCtmvNhYFMeyi3y6_L7fJnF-UvCgvYgb",
  attendanceLabel: "142 Students",
  startedEndsLabel: "Started 12 minutes ago • Ends at 14:30 PM (EST)",
  materialsLabel: "Required Materials: Structural Anthology Vol. IV",
  footerNote: "Session is being recorded for archival purposes",
};

export default function JoinLiveLectureModal({
  open,
  onOpenChange,
}: JoinLiveLectureModalProps) {
  const requestClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, requestClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Join Live Lecture"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white"
        style={{ boxShadow: "0 24px 64px rgba(67,56,202,0.18)" }}
      >
        {/* ── Hero banner ── */}
        <div className="relative h-44 w-full overflow-hidden">
          {/* Indigo → blue-violet gradient matching the design */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #3730A3 0%, #4338CA 50%, #5B5FCF 100%)",
            }}
          />
          <Image
            src={LIVE_LECTURE_CONTENT.heroImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover mix-blend-overlay opacity-50"
            priority
          />

          {/* ONGOING badge — green pill */}
          <div className="absolute left-6 top-5">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5 shadow-lg"
              style={{ backgroundColor: "#16A34A" }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                Ongoing
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={requestClose}
            className="cursor-pointer absolute right-5 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:bg-white/20"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-8">
          {/* Course label */}
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#10B981" }}
          >
            {LIVE_LECTURE_CONTENT.courseLabel}
          </p>

          {/* Title */}
          <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-gray-900">
            {LIVE_LECTURE_CONTENT.title}
          </h2>

          {/* Info cards row */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {/* Lecturer */}
            <div
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{ backgroundColor: "#F5F5FA" }}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={LIVE_LECTURE_CONTENT.lecturerImageUrl}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Lecturer
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {LIVE_LECTURE_CONTENT.lecturerName}
                </p>
              </div>
            </div>

            {/* Attendance */}
            <div
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{ backgroundColor: "#F5F5FA" }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <Users className="h-6 w-6" style={{ color: "#4338CA" }} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Attendance
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {LIVE_LECTURE_CONTENT.attendanceLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Meta rows */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-500">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <Clock className="h-4 w-4" style={{ color: "#4338CA" }} />
              </div>
              <span className="text-sm font-medium">
                {LIVE_LECTURE_CONTENT.startedEndsLabel}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <FileText className="h-4 w-4" style={{ color: "#4338CA" }} />
              </div>
              <span className="text-sm font-medium">
                {LIVE_LECTURE_CONTENT.materialsLabel}
              </span>
            </div>
          </div>

          {/* Join Session CTA */}
          <button
            type="button"
            className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-full py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: "#4338CA",
              boxShadow: "0 8px 24px rgba(67,56,202,0.35)",
            }}
          >
            <PlayCircle className="h-6 w-6" />
            Join Session
          </button>

          {/* Footer note */}
          <p
            className="mt-5 text-center text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "#9CA3AF" }}
          >
            {LIVE_LECTURE_CONTENT.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
}
