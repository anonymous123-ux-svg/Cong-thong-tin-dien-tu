"use client";

import { useRef } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";

import Card from "@/components/ui/Card";

type CourseThumbnailCardProps = {
  coverImageUrl: string | null;
  onPickCover: (file: File) => void;
};

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export default function CourseThumbnailCard({
  coverImageUrl,
  onPickCover,
}: CourseThumbnailCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = "course-cover-image";

  return (
    <Card className="bg-surface-container-lowest p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold">Course Thumbnail</h2>
      </div>

      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const file = e.dataTransfer.files?.[0];
          if (!file || !isImageFile(file)) return;
          onPickCover(file);
        }}
        className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 transition-colors hover:bg-slate-50"
      >
        <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
            <Upload className="h-6 w-6 text-indigo-600" />
          </div>

          <p className="font-semibold text-on-surface">
            Drag and drop course cover image
          </p>
          <p className="mt-1 text-sm text-slate-500">
            PNG, JPG or WebP. Max 10MB (1600x900 recommended)
          </p>

          <span className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition group-hover:shadow-sm">
            Browse Files
          </span>

          {coverImageUrl ? (
            <p className="mt-4 text-xs text-slate-500">
              Selected cover image ready.
            </p>
          ) : null}
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          aria-label="Course cover image"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file || !isImageFile(file)) return;
            onPickCover(file);
          }}
        />
      </label>
    </Card>
  );
}
