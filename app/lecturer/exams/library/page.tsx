export default function LecturerExamLibraryPage() {
    return (
      <div className="mx-auto max-w-7xl">
        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Exam Library
            </h1>
            <p className="text-slate-500 max-w-2xl">
              Manage your curriculum assessments, track student performance metrics, and curate
              examination materials across all faculties.
            </p>
          </div>
  
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
              Export
            </button>
          </div>
        </div>
  
        {/* Bento-Style Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold tracking-wider mb-2">
              TOTAL EXAMS
            </div>
            <div className="text-2xl font-bold text-slate-900">142</div>
            <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">trending_up</span> +4 this month
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold tracking-wider mb-2">
              ACTIVE SESSIONS
            </div>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-xs text-slate-500 mt-1">Currently being taken</div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold tracking-wider mb-2">
              AVG. SCORE
            </div>
            <div className="text-2xl font-bold text-slate-900">74.8%</div>
            <div className="text-xs text-indigo-700 mt-1 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">analytics</span> Across all modules
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold tracking-wider mb-2">
              COMPLETION RATE
            </div>
            <div className="text-2xl font-bold text-slate-900">91.2%</div>
            <div className="text-xs text-emerald-700 mt-1 font-semibold">High engagement</div>
          </div>
        </div>
  
        {/* Main Data Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase">
                    Exam Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase">
                    Creation Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase text-center">
                    Questions
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase text-center">
                    Avg. Score
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 tracking-wider uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">
                      Midterm Assessment: Integral Calculus
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Mathematics Department • Fall 2023
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Active
                    </span>
                  </td>
  
                  <td className="px-6 py-5 text-sm text-slate-700">Oct 12, 2023</td>
  
                  <td className="px-6 py-5 text-sm text-slate-700 text-center font-medium">
                    45
                  </td>
  
                  <td className="px-6 py-5 text-center">
                    <div className="text-sm font-bold text-slate-900">82.5%</div>
                    <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mt-1 overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: "82.5%" }} />
                    </div>
                  </td>
  
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="View Results">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
  
                {/* Row 2 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">
                      Intro to Quantum Mechanics Quiz
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Physics Faculty • Advanced Level
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Draft
                    </span>
                  </td>
  
                  <td className="px-6 py-5 text-sm text-slate-700">Oct 28, 2023</td>
  
                  <td className="px-6 py-5 text-sm text-slate-700 text-center font-medium">
                    20
                  </td>
  
                  <td className="px-6 py-5 text-center">
                    <div className="text-xs text-slate-500 italic">Pending</div>
                  </td>
  
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="View Results">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
  
                {/* Row 3 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">Macroeconomics Final Exam</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Economics Department • Spring 2023
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Completed
                    </span>
                  </td>
  
                  <td className="px-6 py-5 text-sm text-slate-700">May 15, 2023</td>
  
                  <td className="px-6 py-5 text-sm text-slate-700 text-center font-medium">
                    100
                  </td>
  
                  <td className="px-6 py-5 text-center">
                    <div className="text-sm font-bold text-slate-900">68.2%</div>
                    <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mt-1 overflow-hidden">
                      <div className="bg-indigo-600 h-full" style={{ width: "68.2%" }} />
                    </div>
                  </td>
  
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="View Results">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
  
                {/* Row 4 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">
                      Organic Chemistry I: Nomenclature
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Science Department • Lab Practical
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Active
                    </span>
                  </td>
  
                  <td className="px-6 py-5 text-sm text-slate-700">Nov 02, 2023</td>
  
                  <td className="px-6 py-5 text-sm text-slate-700 text-center font-medium">
                    35
                  </td>
  
                  <td className="px-6 py-5 text-center">
                    <div className="text-sm font-bold text-slate-900">71.4%</div>
                    <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mt-1 overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: "71.4%" }} />
                    </div>
                  </td>
  
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="View Results">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
  
                {/* Row 5 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">
                      Data Structures &amp; Algorithms Mock
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Computer Science • Exam Prep
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Draft
                    </span>
                  </td>
  
                  <td className="px-6 py-5 text-sm text-slate-700">Nov 08, 2023</td>
  
                  <td className="px-6 py-5 text-sm text-slate-700 text-center font-medium">
                    15
                  </td>
  
                  <td className="px-6 py-5 text-center">
                    <div className="text-xs text-slate-500 italic">N/A</div>
                  </td>
  
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="View Results">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* Pagination footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">1-5</span> of{" "}
              <span className="font-bold text-slate-900">142</span> exams
            </div>
  
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm font-bold">
                1
              </button>
              <button className="px-3 py-1 rounded-lg hover:bg-slate-50 text-slate-900 text-sm transition-colors">
                2
              </button>
              <button className="px-3 py-1 rounded-lg hover:bg-slate-50 text-slate-900 text-sm transition-colors">
                3
              </button>
              <span className="px-2 text-slate-400">...</span>
              <button className="px-3 py-1 rounded-lg hover:bg-slate-50 text-slate-900 text-sm transition-colors">
                29
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
  
        {/* Contextual Learning Tip */}
        <div className="mt-12 p-8 bg-indigo-600/5 rounded-2xl flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-indigo-600 text-3xl">
              lightbulb
            </span>
          </div>
  
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">Curation Suggestion</h3>
            <p className="text-slate-500 mt-1">
              Based on recent results, students are struggling with &apos;Integral Calculus&apos;
              concepts. Consider adding more descriptive feedback to Question #14 to improve average
              scores by an estimated 15%.
            </p>
          </div>
  
          <button className="md:ml-auto px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all">
            Apply Fix
          </button>
        </div>
      </div>
    )
  }