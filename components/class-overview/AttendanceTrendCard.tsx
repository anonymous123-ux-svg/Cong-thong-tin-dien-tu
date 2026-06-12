export default function AttendanceTrendCard() {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Attendance Trend</h3>
          <p className="text-sm text-slate-500">
            Longitudinal attendance over the semester
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-600" />
            <span className="text-xs font-medium text-slate-600">
              Current Semester
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-slate-200" />
            <span className="text-xs font-medium text-slate-600">
              Historical Avg
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-2">
        <div className="relative h-55 w-full">
          <svg
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 1000 200"
          >
            <line
              x1="0"
              y1="0"
              x2="1000"
              y2="0"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="50"
              x2="1000"
              y2="50"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="100"
              x2="1000"
              y2="100"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="150"
              x2="1000"
              y2="150"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="200"
              x2="1000"
              y2="200"
              stroke="#f1f5f9"
              strokeWidth="1"
            />

            <path
              d="M0,80 Q100,70 200,90 T400,85 T600,100 T800,90 T1000,95"
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              strokeWidth="2"
            />
            <path
              d="M0,120 L66,110 L132,115 L198,90 L264,85 L330,70 L396,75 L462,60 L528,65 L594,40 L660,50 L726,55 L792,45 L858,30 L924,35 L1000,25"
              fill="none"
              stroke="#4f46e5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <circle
              cx="594"
              cy="40"
              r="6"
              fill="#4f46e5"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="mt-6 flex justify-between px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>W01</span>
          <span>W04</span>
          <span>W08</span>
          <span>W12</span>
          <span>W16</span>
        </div>
      </div>
    </section>
  );
}
