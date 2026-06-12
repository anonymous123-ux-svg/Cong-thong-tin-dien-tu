import Link from "next/link"

export default function LecturerExamsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-0">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="mb-8">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-tight mb-2">
            Exam Management Hub
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Curate assessments and monitor student academic growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create */}
          <Link
            href="/lecturer/exams/create"
            className="group bg-white p-8 rounded-3xl transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)] cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">add_circle</span>
            </div>
            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-700 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">post_add</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Exam</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Design new assessments with AI-assisted question generation.
            </p>
          </Link>

          {/* View */}
          <Link
            href="/lecturer/exams/library"
            className="group bg-white p-8 rounded-3xl transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)] cursor-pointer"
          >
            <div className="w-12 h-12 bg-emerald-600/10 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">list_alt</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">View Exams</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Access and manage your library of published examinations.
            </p>
          </Link>

          {/* Edit / Update */}
          <Link
            href="/lecturer/exams/edit"
            className="group bg-white p-8 rounded-3xl transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)] cursor-pointer"
          >
            <div className="w-12 h-12 bg-orange-600/10 text-orange-700 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">edit_square</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Edit Exam</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Modify existing drafts and update question distribution.
            </p>
          </Link>

          {/* Delete */}
          <Link
            href="/lecturer/exams/delete"
            className="group bg-white p-8 rounded-3xl transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)] cursor-pointer"
          >
            <div className="w-12 h-12 bg-red-600/10 text-red-700 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">delete_sweep</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Delete Exam</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Securely remove outdated or redundant assessments.
            </p>
          </Link>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Assessments List */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Current Assessments
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  Recent
                </button>
                <button className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  Archived
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    <th className="pb-6">Exam Title</th>
                    <th className="pb-6">Status</th>
                    <th className="pb-6">Participants</th>
                    <th className="pb-6">Date</th>
                    <th className="pb-6"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  <tr className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-700 text-xl">
                            science
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            Advanced Biochemistry Mid-Term
                          </p>
                          <p className="text-xs text-slate-400">Section B • Dr. Aris</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-600/10 text-emerald-700 uppercase">
                        Active
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span className="material-symbols-outlined text-sm">group</span>
                        127
                      </div>
                    </td>
                    <td className="py-5 text-sm text-slate-500">Oct 24, 2023</td>
                    <td className="py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-600/5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-orange-700 text-xl">
                            calculate
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            Differential Equations Final
                          </p>
                          <p className="text-xs text-slate-400">Honors Section • 2023</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                        Draft
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="text-sm font-medium text-slate-400">—</span>
                    </td>
                    <td className="py-5 text-sm text-slate-500">Scheduled Nov 12</td>
                    <td className="py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-emerald-700 text-xl">
                            psychology
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            Ethics in Machine Learning
                          </p>
                          <p className="text-xs text-slate-400">Post-Grad Seminar</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-600 uppercase">
                        Completed
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span className="material-symbols-outlined text-sm">group</span> 45
                      </div>
                    </td>
                    <td className="py-5 text-sm text-slate-500">Oct 12, 2023</td>
                    <td className="py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="w-full mt-6 py-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              View All Assessments
            </button>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          {/* Performance Analytics */}
          <div className="bg-slate-50 rounded-3xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-1 text-slate-900">
                  Performance Analytics
                </h3>
                <p className="text-xs text-slate-500">Avg. cohort score trajectory</p>
              </div>
              <span className="material-symbols-outlined text-indigo-600">trending_up</span>
            </div>

            <div className="h-40 w-full relative mb-6">
              <svg className="w-full h-full" viewBox="0 0 400 150" aria-hidden="true">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 Q50,110 100,80 T200,90 T300,50 T400,30"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M0,120 Q50,110 100,80 T200,90 T300,50 T400,30 V150 H0 Z"
                  fill="url(#chartGradient)"
                />
                <circle cx="400" cy="30" r="4" fill="#4f46e5" />
              </svg>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-indigo-700">84.2%</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  +2.4% from last exam
                </p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:underline">
                Full Report
              </button>
            </div>
          </div>

          {/* Question Banks Quick Links */}
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-lg font-bold tracking-tight mb-6 text-slate-900">
              Question Banks
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-indigo-600 text-lg">
                      functions
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">STEM Archive</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">1,240 Qs</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-indigo-600 text-lg">
                      history_edu
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Liberal Arts</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">856 Qs</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-indigo-600 text-lg">
                      code
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    Computer Science
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">2,100 Qs</span>
              </div>
            </div>

            <button className="w-full mt-6 text-sm font-semibold text-indigo-700 py-2 hover:bg-indigo-50 rounded-xl transition-all">
              Browse All Banks
            </button>
          </div>

          {/* Quick Tip Card */}
          <div className="bg-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
            </div>
            <h4 className="text-lg font-bold mb-2">New: AI Proctor</h4>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
              Our enhanced proctoring engine now detects multi-device usage with 99.4% accuracy.
            </p>
            <button className="bg-white text-indigo-700 px-6 py-2 rounded-full text-xs font-bold hover:bg-indigo-50 transition-colors">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}