"use client";

import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type AttachmentsDropzoneProps = {
  onFilesSelected: (files: File[]) => void;
};

export default function AttachmentsDropzone({
  onFilesSelected,
}: AttachmentsDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const pickFiles = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      onFilesSelected(Array.from(fileList));
    },
    [onFilesSelected],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={pickFiles}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pickFiles();
        }
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={
        "border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group " +
        (isDragging ? "bg-gray-50" : "hover:bg-gray-50")
      }
      aria-label="Upload attachments"
    >
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
        <Upload className="h-5 w-5" />
      </div>
      <p className="text-gray-800 font-medium">
        Click to upload or drag and drop
      </p>
      <p className="text-xs text-gray-400 mt-1">
        PDF, DOCX, or ZIP files (Max 50MB)
      </p>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.zip"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
