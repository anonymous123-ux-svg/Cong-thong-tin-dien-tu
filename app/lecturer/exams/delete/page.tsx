"use client"

import { useMemo, useState } from "react"

type Exam = {
  id: string
  title: string
  code: string
  status: "Active" | "Draft" | "Completed"
  questions: number
  participants: number
  createdText: string
}

export default function LecturerDeleteExamPage() {
  const exams: Exam[] = useMemo(
    () => [
      {
        id: "ex-1",
        title: "Advanced Mathematics - Final 2024",
        code: "MATH-2024-QT1",
        status: "Active",
        questions: 40,
        participants: 124,
        createdText: "Created 2 weeks ago",
      },
      {
        id: "ex-2",
        title: "Physics 101",
        code: "PHY-SCR-09",
        status: "Draft",
        questions: 30,
        participants: 0,
        createdText: "Created 3 days ago",
      },
      {
        id: "ex-3",
        title: "Discrete Structures",
        code: "DS-2023-W",
        status: "Completed",
        questions: 25,
        participants: 45,
        createdText: "Created 3 months ago",
      },
    ],
    []
  )

  const [selected, setSelected] = useState<Exam | null>(null)
  const [confirmText, setConfirmText] = useState("")
  const canDelete =
    !!selected &&
    (confirmText.trim().toUpperCase() === selected.code.toUpperCase() ||
      confirmText.trim().toUpperCase() === "DELETE")

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Delete Exams
          </h1>
          <p className="text-slate-500">
            Choose an exam, then confirm deletion. This action is irreversible.
          </p>
        </div>
      </header>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={[
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      exam.status === "Active"
                        ? "bg-emerald-600/10 text-emerald-700"
                        : exam.status === "Draft"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-indigo-100 text-indigo-700",
                    ].join(" ")}
                  >
                    {exam.status}
                  </span>

                  <span className="text-xs text-slate-400">{exam.createdText}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {exam.title}
                </h3>
                <p className="text-sm text-slate-500 font-mono">{exam.code}</p>

                <div className="flex items-center gap-6 mt-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-[18px]">
                      description
                    </span>
                    <span className="font-medium">{exam.questions} Questions</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-[18px]">
                      person_check
                    </span>
                    <span className="font-medium">{exam.participants} Participants</span>
                  </div>
                </div>
              </div>

              {/* Trash button */}
              <button
                type="button"
                onClick={() => {
                  setSelected(exam)
                  setConfirmText("")
                }}
                className="shrink-0 p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label={`Delete ${exam.code}`}
                title="Delete"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-lg rounded-[1.5rem] shadow-2xl overflow-hidden relative">
            {/* Edge decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-300 to-red-600 opacity-60" />

            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-6">
                <span
                  className="material-symbols-outlined text-red-600 text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" } as any}
                >
                  warning
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Confirm Exam Deletion
              </h2>

              <p className="text-slate-500 mt-3 text-sm leading-relaxed px-4">
                This action cannot be undone. All data related to this exam, including student
                results and AI analytics, will be permanently deleted.
              </p>
            </div>

            {/* Exam Summary Card */}
            <div className="mx-8 mb-6 p-5 bg-slate-50 rounded-xl flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">
                    Target Exam
                  </div>
                  <h4 className="font-bold text-slate-900">{selected.title}</h4>
                  <div className="text-xs font-medium text-slate-500 font-mono uppercase">
                    {selected.code}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-2 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    description
                  </span>
                  <span className="text-xs text-slate-500">
                    {selected.questions} Questions
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    person_check
                  </span>
                  <span className="text-xs text-slate-500">
                    {selected.participants} Participants
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="px-8 mb-8">
              <label
                className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide"
                htmlFor="confirm-input"
              >
                Type the exam code to confirm
              </label>
              <input
                id="confirm-input"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all placeholder:text-slate-400 font-mono uppercase"
                placeholder={selected.code}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
              <p className="mt-2 text-[10px] text-slate-500 italic text-right">
                Tip: You can type &apos;DELETE&apos;
              </p>
            </div>

            {/* Actions */}
            <div className="px-8 pb-8 flex space-x-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 bg-slate-100 text-slate-600 py-3.5 rounded-full font-semibold hover:bg-slate-200 transition-colors text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!canDelete}
                onClick={() => {
                  // TODO: call API then close
                  // For now: just close modal
                  setSelected(null)
                }}
                className={[
                  "flex-[1.5] py-3.5 rounded-full font-semibold shadow-lg transition-all text-sm",
                  "flex items-center justify-center space-x-2",
                  canDelete
                    ? "bg-red-600 text-white hover:opacity-90 shadow-red-600/20"
                    : "bg-red-300 text-white/90 cursor-not-allowed",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-lg">delete_forever</span>
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}