interface StatsProps {
  userCount: number;
  courseCount: number;
  submissionCount: number;
}

export default function StatsCards({ userCount, courseCount, submissionCount }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm transition-all hover:-translate-y-1">
        <div className="flex items-center gap-3 text-indigo-600 mb-2">
          <span className="material-symbols-outlined text-2xl">group</span>
          <span className="text-xs font-bold uppercase tracking-widest">Total Users</span>
        </div>
        <div className="text-4xl font-black text-indigo-950 tracking-tight">{userCount}</div>
        <div className="text-xs text-indigo-600/80 font-bold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
          Live from Database
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1">
        <div className="flex items-center gap-3 text-slate-500 mb-2">
          <span className="material-symbols-outlined text-2xl">menu_book</span>
          <span className="text-xs font-bold uppercase tracking-widest">Active Courses</span>
        </div>
        <div className="text-4xl font-black text-slate-800 tracking-tight">{courseCount}</div>
        <div className="text-xs text-slate-400 font-bold mt-2">
          Platform-wide classes
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1">
        <div className="flex items-center gap-3 text-emerald-500 mb-2">
          <span className="material-symbols-outlined text-2xl">task</span>
          <span className="text-xs font-bold uppercase tracking-widest">Total Submissions</span>
        </div>
        <div className="text-4xl font-black text-slate-800 tracking-tight">{submissionCount}</div>
        <div className="text-xs text-slate-400 font-bold mt-2">
          Student assignments graded
        </div>
      </div>

    </div>
  )
}