"use client";

import { useCallback } from "react";
import { CloudUpload } from "lucide-react";

type UploadDropzoneProps = {
  onPickFiles: () => void;
  onFilesSelected: (files: FileList) => void;
};

export default function UploadDropzone({
  onPickFiles,
  onFilesSelected,
}: UploadDropzoneProps) {
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        onFilesSelected(event.dataTransfer.files);
      }
    },
    [onFilesSelected],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPickFiles}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPickFiles();
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="group mb-10 flex cursor-pointer flex-col items-center justify-center rounded-3xl p-10 text-center transition-all"
      style={{
        border: "2px dashed #C7D2FE",
        backgroundColor: "#FAFAFA",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F7FF")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
      aria-label="Upload academic files"
    >
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
        style={{ backgroundColor: "#EEF2FF" }}
      >
        <CloudUpload className="h-8 w-8" style={{ color: "#4338CA" }} />
      </div>
      <h3 className="mb-1 text-lg font-semibold" style={{ color: "#0F172A" }}>
        Drag and drop academic files
      </h3>
      <p className="text-sm" style={{ color: "#64748B" }}>
        Support for PDF, MP4, DOCX, and XLSX (Max 128MB)
      </p>
    </div>
  );
}
