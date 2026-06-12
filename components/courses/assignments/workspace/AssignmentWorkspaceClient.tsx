"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cloud,
  Send,
  Timer,
  Play,
  Trash2,
  Sparkles,
  ArrowUp,
  BookOpen,
  Terminal,
  CheckCircle2,
  Circle,
  Clock,
  FileCode2,
  Code,
  MessageSquare,
  NotebookPen,
} from "lucide-react";

import type { AssignmentWorkspaceData } from "./types";

const AUTOHIDE_SCROLLBAR_TIMEOUTS = new WeakMap<HTMLElement, number>();

function markScrolling(element: HTMLElement) {
  element.classList.add("is-scrolling");

  const existingTimeout = AUTOHIDE_SCROLLBAR_TIMEOUTS.get(element);
  if (existingTimeout) {
    window.clearTimeout(existingTimeout);
  }

  const timeout = window.setTimeout(() => {
    element.classList.remove("is-scrolling");
    AUTOHIDE_SCROLLBAR_TIMEOUTS.delete(element);
  }, 900);

  AUTOHIDE_SCROLLBAR_TIMEOUTS.set(element, timeout);
}

const RESOURCE_TONE_STYLES = {
  primary: {
    wrap: "bg-indigo-100 text-indigo-600",
    icon: BookOpen,
  },
  secondary: {
    wrap: "bg-emerald-100 text-emerald-600",
    icon: Terminal,
  },
} as const;

export default function AssignmentWorkspaceClient({
  data,
  backHref,
}: {
  data: AssignmentWorkspaceData;
  backHref: string;
}) {
  const [activeTabId, setActiveTabId] = useState(data.editor.tabs[0]?.id);
  const [hasRun, setHasRun] = useState(false);
  const lineNumbersInnerRef = useRef<HTMLDivElement | null>(null);
  const editorTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [fileContents, setFileContents] = useState<Record<string, string>>(
    () => {
      const entries = Object.entries(data.editor.files).map(([id, lines]) => [
        id,
        (lines ?? []).join("\n"),
      ]);
      return Object.fromEntries(entries);
    },
  );

  const activeFileId = useMemo(() => {
    return activeTabId ?? data.editor.tabs[0]?.id;
  }, [activeTabId, data.editor.tabs]);

  const activeFileContent = useMemo(() => {
    if (!activeFileId) return "";
    return fileContents[activeFileId] ?? "";
  }, [activeFileId, fileContents]);

  const activeFileLines = useMemo(() => {
    const normalized = activeFileContent.replace(/\r\n/g, "\n");
    const lines = normalized.split("\n");
    return lines.length ? lines : [""];
  }, [activeFileContent]);

  const consoleLines = useMemo(() => {
    if (!hasRun) return data.editor.consoleOutput;
    return [...data.editor.consoleOutput, "", "✓ Latest run completed."];
  }, [data.editor.consoleOutput, hasRun]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-50 text-gray-900">
      {/* Focused Task Top Bar */}
      <header className="relative z-50 flex h-20 shrink-0 items-center justify-between bg-white px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href={backHref}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-100"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {data.courseTagLabel}
            </span>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900">
              {data.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden flex-col items-end sm:flex">
            <div className="flex items-center gap-2 rounded-full bg-indigo-900 px-3 py-1 font-mono text-sm font-medium text-white">
              <Timer className="h-4 w-4" aria-hidden="true" />
              <span>{data.timeRemainingLabel}</span>
            </div>
            <span className="mt-1 flex items-center gap-1 text-xs text-gray-400">
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
              {data.savedLabel}
            </span>
          </div>

          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-indigo-700 transition-colors duration-200 hover:bg-indigo-50"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-indigo-900 px-6 py-2.5 text-sm font-medium text-white shadow-[0px_8px_16px_rgba(53,37,205,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-[0px_12px_20px_rgba(53,37,205,0.3)]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit Assignment
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="mx-auto flex w-full max-w-480 min-h-0 flex-1 flex-col gap-6 overflow-hidden p-6 xl:flex-row">
        {/* LEFT PANEL */}
        <aside className="flex w-full min-h-0 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm xl:w-85">
          <div className="shrink-0 p-6 pb-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Assignment
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {data.daysLeftLabel}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Due: {data.dueLabel}
            </p>
          </div>

          <div
            className="autohide-scrollbar flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-6 pt-4"
            onScroll={(event) => markScrolling(event.currentTarget)}
          >
            <section>
              <p className="text-sm leading-relaxed text-gray-700">
                {data.description.split("utils.py")[0]}
                <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-indigo-600">
                  utils.py
                </code>
                {data.description.split("utils.py")[1] ?? ""}
              </p>
            </section>

            <section>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Requirements
              </h3>
              <ul className="flex flex-col gap-3">
                {data.requirements.map((req) => (
                  <li key={req.id} className="flex items-start gap-3">
                    {req.done ? (
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="h-5 w-5 shrink-0 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        req.done
                          ? "text-sm text-gray-400 line-through"
                          : "text-sm text-gray-700"
                      }
                    >
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-auto">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Attached Resources
              </h3>

              <div className="flex flex-col gap-2">
                {data.resources.map((resource) => {
                  const tone = RESOURCE_TONE_STYLES[resource.tone];
                  const Icon = tone.icon;

                  return (
                    <button
                      key={resource.id}
                      type="button"
                      className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${tone.wrap} transition-transform group-hover:scale-105`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-gray-800">
                          {resource.title}
                        </span>
                        <span className="truncate text-xs text-gray-400">
                          {resource.metaLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </aside>

        {/* CENTER PANEL */}
        <section className="relative z-20 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-[#1e2333] shadow-md ring-1 ring-white/5">
          <div className="flex shrink-0 items-center justify-between bg-[#1f2430] pr-4">
            <div className="flex">
              {data.editor.tabs.map((tab) => {
                const isActive = tab.id === activeTabId;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={
                      isActive
                        ? "flex items-center gap-2 border-t-2 border-indigo-400 bg-[#1e2333] px-5 py-3 text-white"
                        : "flex items-center gap-2 px-5 py-3 text-gray-400 transition-colors hover:bg-[#1e2333]/50 hover:text-white"
                    }
                  >
                    {tab.kind === "python" ? (
                      <Code
                        className="h-4 w-4 text-[#ffca28]"
                        aria-hidden="true"
                      />
                    ) : (
                      <FileCode2
                        className="h-4 w-4 text-[#4ae176]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-sm font-mono font-medium">
                      {tab.label}
                    </span>
                    {tab.isDirty ? (
                      <span className="ml-2 h-2 w-2 rounded-full bg-gray-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setHasRun(true)}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-400"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Run Code
            </button>
          </div>

          <div className="flex min-h-0 flex-1 overflow-hidden bg-[#1e2333] font-mono text-sm leading-relaxed text-gray-200">
            <div className="flex min-h-0 flex-1 overflow-hidden">
              <div
                className="min-h-0 w-12 shrink-0 overflow-hidden border-r border-white/5 bg-[#232936] text-right text-[#5c677f] select-none"
                onWheel={(event) => {
                  const textarea = editorTextareaRef.current;
                  if (!textarea) return;

                  event.preventDefault();
                  textarea.scrollTop += event.deltaY;
                  markScrolling(textarea);

                  if (lineNumbersInnerRef.current) {
                    lineNumbersInnerRef.current.style.transform = `translateY(-${textarea.scrollTop}px)`;
                  }
                }}
              >
                <div ref={lineNumbersInnerRef} className="py-6 pr-3">
                  {activeFileLines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 flex-1 p-6">
                <textarea
                  ref={editorTextareaRef}
                  value={activeFileContent}
                  onChange={(event) => {
                    if (!activeFileId) return;
                    const next = event.target.value;
                    setFileContents((prev) => ({
                      ...prev,
                      [activeFileId]: next,
                    }));
                  }}
                  onScroll={(event) => {
                    const target = event.currentTarget;
                    markScrolling(target);
                    if (lineNumbersInnerRef.current) {
                      lineNumbersInnerRef.current.style.transform = `translateY(-${target.scrollTop}px)`;
                    }
                  }}
                  spellCheck={false}
                  className="autohide-scrollbar min-h-0 w-full flex-1 resize-none border-0 bg-transparent p-0 font-mono text-sm leading-relaxed text-gray-200 outline-none focus:ring-0 overflow-y-auto"
                  aria-label="Code editor"
                />
              </div>
            </div>
          </div>

          <div className="flex h-48 shrink-0 flex-col border-t border-white/5 bg-[#161a23]">
            <div className="flex items-center justify-between bg-[#1b202c] px-4 py-2">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Console Output
              </span>
              <button
                type="button"
                onClick={() => setHasRun(false)}
                className="text-gray-500 transition-colors hover:text-gray-300"
                aria-label="Clear console"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              className="autohide-scrollbar flex-1 overflow-y-auto p-4 font-mono text-sm text-[#8f9bb3]"
              onScroll={(event) => markScrolling(event.currentTarget)}
            >
              {consoleLines.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="relative z-10 flex w-full min-h-0 shrink-0 flex-col gap-4 overflow-hidden xl:w-80">
          <div
            className="autohide-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto"
            onScroll={(event) => markScrolling(event.currentTarget)}
          >
            {/* Progress */}
            <div className="shrink-0 rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-end justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Progress
                </h3>
                <span className="text-xl font-bold tracking-tight text-indigo-700">
                  {data.progressPercent}%
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-indigo-700 transition-all duration-1000 ease-out ${data.progressWidthClassName}`}
                />
              </div>

              <p className="mt-3 text-xs font-medium text-gray-400">
                {data.progressLabel}
              </p>
            </div>

            {/* Tutor AI */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 p-5 pb-3">
                <Sparkles
                  className="h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold text-gray-900">
                  Tutor AI
                </h3>
              </div>

              <div
                className="autohide-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5"
                onScroll={(event) => markScrolling(event.currentTarget)}
              >
                <div className="rounded-lg rounded-tl-none border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">
                    {data.tutor.message.text}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {data.tutor.suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 p-4">
                <div className="relative">
                  <input
                    className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Ask for help..."
                    type="text"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-700 text-white transition-colors hover:bg-indigo-600"
                    aria-label="Send"
                  >
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes + Discuss */}
          <div className="shrink-0 flex gap-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <NotebookPen className="h-4 w-4" aria-hidden="true" />
              Notes
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Discuss
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
