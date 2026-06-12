"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import {
  BadgeCheck,
  BookOpen,
  Clock,
  Copy,
  Radio,
  Users,
  Video,
  X,
} from "lucide-react";

type JoinCurrentClassModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MODAL_CONTENT = {
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuARYFgTy0YY6TtCp4JfX-YxZDgFA6HCL0o2LNGaSrntZmicdl3V7UOCIX_wCGesMeLXzUvijyVJWOsOprUz2tUGoQUkSHNP7guJrTOMstu0kgxahrnOlhiaEGCgnqvaMCUfYknXKumbHaQhHvT7lcPGncSE4hGcYS9E6b5ceuYzoKvSrvce4az0I75nAs7YEu2T5C-odd7SQkDoGhS09euLxPypkg8VPRF2yMfeinj1spyHNilh4J7EFvM-aLd4IHlKZWyFbzZ4Z0ih",
  title: "Quantum Mechanics",
  timeRange: "14:00 - 15:30",
  studentsJoinedLabel: "42 Students Joined",
  instructorName: "Dr. Lawrence Sterling",
  instructorImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAp8tgIaR6qheSX8EH8BPp7N4TIU-AmPvzqlDmUUtO7Q26fojWCp588fV7MrXrSFzkdR23wBIf2cFYM6WJqsM4hzg3ItQQtv334UIk9i9ZHCLC9ZMg8OJcIv8KC2eImMjU7348Yrf9AxfJELuBYKcyNONIVvZfqpGA-pO4wf3IUR5nl6DNJrwWg4BynTAYDru-oyLzIwie2Mmvf9nRge4C5_MhHRpXNZOSM0rTjoDNIzXZUso9YCNxnKN_fOE_A7XkTXdkrQ-9kRhk8",
  joinRoomLink: "https://example.com/join-room",
};

export default function JoinCurrentClassModal({
  open,
  onOpenChange,
}: JoinCurrentClassModalProps) {
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
      aria-label="Join Current Class"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* ── Hero banner ── */}
        <div
          className="relative h-36 w-full overflow-hidden"
          style={{ backgroundColor: "#3730A3" }}
        >
          {/* Gradient overlay matching design (deep indigo → blue) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #3730A3 0%, #4F46E5 60%, #6366F1 100%)",
            }}
          />
          <Image
            src={MODAL_CONTENT.heroImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-cover mix-blend-overlay opacity-60"
            priority
          />
          {/* Close button */}
          <div className="absolute right-4 top-4">
            <button
              type="button"
              onClick={requestClose}
              className="cursor-pointer rounded-full p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-8">
          {/* Live Now badge */}
          <div className="mb-4">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
            >
              <Radio className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Live Now
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            {MODAL_CONTENT.title}
          </h3>

          {/* Meta row */}
          <div className="mt-2 flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {MODAL_CONTENT.timeRange}
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {MODAL_CONTENT.studentsJoinedLabel}
              </span>
            </div>
          </div>

          {/* Instructor card */}
          <div
            className="my-6 flex items-center justify-between rounded-2xl p-4"
            style={{ backgroundColor: "#F8F8FB" }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <Image
                  src={MODAL_CONTENT.instructorImageUrl}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Instructor
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {MODAL_CONTENT.instructorName}
                </p>
              </div>
            </div>
            <BadgeCheck className="h-6 w-6" style={{ color: "#4338CA" }} />
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {/* Join Room — primary indigo pill */}
            <button
              type="button"
              className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#4338CA" }}
            >
              <Video className="h-5 w-5" />
              Join Room
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="cursor-pointer flex items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
                style={{ borderColor: "#E5E7EB" }}
              >
                <BookOpen className="h-4.5 w-4.5" />
                Resources
              </button>
              <button
                type="button"
                className="cursor-pointer flex items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
                style={{ borderColor: "#E5E7EB" }}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      MODAL_CONTENT.joinRoomLink,
                    );
                  } catch {
                    /* ignore */
                  }
                }}
              >
                <Copy className="h-4.5 w-4.5" />
                Copy Link
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-xs text-gray-400">
              Ensure your camera and microphone are configured before entering.{" "}
              <a
                className="cursor-pointer font-bold hover:underline"
                style={{ color: "#4338CA" }}
                href="#"
              >
                Test Settings
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
