import { getGradebookAnalytics } from "@/lib/actions/lecturer";
import { connection } from "next/server";

function getHeatClass(score: number) {
  if (score >= 80) return "bg-emerald-100 text-emerald-700 shadow-sm";
  if (score >= 60) return "bg-amber-100 text-amber-700 shadow-sm";
  return "bg-rose-100 text-rose-700 shadow-sm";
}

export default async function LecturerAiReportPage() {
  await connection();
  const { students, avgScore, passRate } = await getGradebookAnalytics();

  return (
    <div className="mx-auto max-w-[1200px] pb-24 md:pb-8">
      {/* Hero Header */}
      <header className="mb-10 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/30 blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/30 blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-200 mb-4 border border-white/10">
              Instructor Dashboard
            </span>
            <h1 className="mb-3 text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Gradebook Analytics
            </h1>
            <p className="max-w-2xl text-lg text-indigo-100/80 font-medium">
              AI performance report for{" "}
              <span className="text-white font-bold border-b border-indigo-400/50 pb-0.5">
                Advanced Quantum Mechanics - Cohort B
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 border border-white/10 hover:border-white/30 hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export CSV
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_10px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              Generate PDF
            </button>
          </div>
        </div>

        {/* Filter Bar (Glassmorphic) */}
        <div className="relative z-10 mt-10 flex flex-wrap items-end gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-inner">
          <div className="min-w-[200px] flex-1">
            <label className="mb-2 block px-1 text-[10px] font-extrabold uppercase tracking-widest text-indigo-200/70">
              Select Cohort
            </label>
            <select className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-indigo-400 outline-none backdrop-blur-md appearance-none">
              <option className="text-slate-900">Quantum Physics - Spring 2024</option>
              <option className="text-slate-900">Theoretical Mechanics - Fall 2023</option>
              <option className="text-slate-900">Particle Physics - Winter 2024</option>
            </select>
          </div>

          <div className="min-w-[250px] flex-1">
            <label className="mb-2 block px-1 text-[10px] font-extrabold uppercase tracking-widest text-indigo-200/70">
              Date Range
            </label>
            <div className="flex items-center gap-3">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-indigo-400 outline-none backdrop-blur-md [color-scheme:dark]"
                type="date"
              />
              <span className="text-indigo-300 font-bold">to</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-indigo-400 outline-none backdrop-blur-md [color-scheme:dark]"
                type="date"
              />
            </div>
          </div>

          <div className="min-w-[180px]">
            <label className="mb-2 block px-1 text-[10px] font-extrabold uppercase tracking-widest text-indigo-200/70">
              Status Filter
            </label>
            <div className="flex gap-2">
              <button className="rounded-2xl bg-indigo-500/80 px-5 py-3 text-sm font-bold text-white shadow-sm border border-indigo-400/50">
                All
              </button>
              <button className="rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-bold text-indigo-100 transition-colors hover:bg-white/10 hover:text-white">
                At Risk
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gradebook Table */}
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="sticky left-0 z-10 whitespace-nowrap bg-slate-50/50 px-8 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                  Student Profile
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Assignment 1
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Assignment 2
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Midterm
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Final Exam
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Participation
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-indigo-600 text-center bg-indigo-50/30">
                  Overall Grade
                </th>
                <th className="whitespace-nowrap px-6 py-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="group transition-colors hover:bg-indigo-50/30">
                  <td className="sticky left-0 z-10 bg-white px-8 py-5 group-hover:bg-indigo-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full blur-sm opacity-40 group-hover:opacity-80 transition-opacity ${student.avatarBg.split(' ')[0]}`}></div>
                        <div className={`relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ${student.avatarBg}`}>
                          {student.initials}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-800">{student.name}</div>
                        <div className="text-[11px] font-medium text-slate-400 mt-0.5">ID: #{student.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getHeatClass(student.assignment1)}`}>
                      {student.assignment1}%
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getHeatClass(student.assignment2)}`}>
                      {student.assignment2}%
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getHeatClass(student.midterm)}`}>
                      {student.midterm}%
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getHeatClass(student.finalExam)}`}>
                      {student.finalExam}%
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getHeatClass(student.participation)}`}>
                      {student.participation}%
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center bg-indigo-50/10 group-hover:bg-transparent">
                    <div className="text-lg font-black text-indigo-600 drop-shadow-sm">
                      {student.overall.toFixed(1)}%
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${
                        student.status === "Pass"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Glassmorphic look) */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 bg-slate-50/50 px-8 py-6 gap-4">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="font-extrabold text-slate-700">{students.length}</span> students
          </p>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              1
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-sm font-extrabold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
              2
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-sm font-extrabold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
              3
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Analytics Bento Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Average Score */}
        <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 md:col-span-1 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined text-2xl">analytics</span>
            </div>
            <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">Average Score</h3>
            <div className="text-5xl font-black text-slate-800 tracking-tight">{avgScore.toFixed(1)}%</div>
          </div>
          <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 w-fit">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            +3.2% vs Last Cohort
          </div>
        </div>

        {/* Pass Rate */}
        <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 md:col-span-1 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-colors"></div>
          <div className="relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined text-2xl">group</span>
            </div>
            <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">Pass Rate</h3>
            <div className="text-5xl font-black text-slate-800 tracking-tight">{passRate.toFixed(1)}%</div>
          </div>
          <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-500 w-fit">
            <span className="material-symbols-outlined text-sm">flag</span>
            Target: 85.0%
          </div>
        </div>

        {/* AI Assistant */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)] md:col-span-2 animate-gradient bg-[length:200%_200%]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-[60px]" />
          <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-9xl">smart_toy</span>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
                <span className="material-symbols-outlined text-sm animate-pulse">auto_awesome</span>
                AI Assistant
              </div>
              <h3 className="mb-4 text-3xl font-extrabold tracking-tight drop-shadow-sm">Remedial Action Recommended</h3>
              <p className="mb-8 text-base font-medium leading-relaxed text-indigo-50/90 max-w-lg">
                Based on Assignment 2 results, 12 students are struggling with <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">Wave-Particle Duality</span>. Would you like to schedule a remedial session?
              </p>
            </div>
            <button className="w-fit inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-indigo-600 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:scale-105 active:scale-95 group/btn">
              Generate Remedial Plan
              <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
