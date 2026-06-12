"use client";

import type { ReactNode } from "react";
import {
  Bold,
  CloudCheck,
  ExternalLink,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";

type Props = {
  onToggleSplitView?: () => void;
};

export default function NotesToolbar({ onToggleSplitView }: Props) {
  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6">
      <div className="flex items-center gap-1">
        <ToolbarButton label="Bold">
          <Bold className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Italic">
          <Italic className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Underline">
          <Underline className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton label="Bulleted List">
          <List className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Numbered List">
          <ListOrdered className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton label="Insert Image">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Insert Link">
          <LinkIcon className="h-5 w-5" aria-hidden="true" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <CloudCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          <span>Saved just now</span>
        </div>
        <button
          type="button"
          onClick={onToggleSplitView}
          className="inline-flex items-center gap-1 font-medium text-indigo-600 transition-colors hover:text-indigo-800"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          <span>Split View</span>
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-2 h-6 w-px bg-gray-200" aria-hidden="true" />;
}

function ToolbarButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
