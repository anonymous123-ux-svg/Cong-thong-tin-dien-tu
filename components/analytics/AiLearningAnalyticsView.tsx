import Link from "next/link"

type Role = "admin" | "lecturer" | "student"

type Props = {
  role: Role
}

const roleConfig: Record<Role, { badge: string; heading: string; description: string }> = {
  admin: {
    badge: "Institution Intelligence",
    heading: "Learning Analysis",
    description:
      "Institution-wide AI analysis across departments, cohorts, and curriculum quality signals.",
  },
  lecturer: {
    badge: "Classroom Intelligence",
    heading: "Learning Analysis",
    description:
      "AI-driven class insights to track mastery velocity, weak topics, and recommended interventions.",
  },
  student: {
    badge: "Personal Intelligence",
    heading: "Learning Analysis",
    description:
      "Your learning trajectory is refined through algorithmic curation. Review your cognitive patterns and recommended pathways below.",
  },
}

const bars = [40, 60, 55, 75, 85, 45, 95, 70, 65, 80]

const weakTopics = ["Quantum Mechanics Basics", "Linear Algebra Refresher"]

const segments = [
  {
    name: "Data Structures",
    track: "Computer Science Core",
    score: 94,
    confidence: "Optimal",
    confidenceTone: "bg-emerald-100 text-emerald-700",
    status: "Mastered",
    statusTone: "text-emerald-700",
    action: "Ready for recursive algorithms unit.",
    barTone: "bg-emerald-600",
    icon: "check_circle",
  },
  {
    name: "Vector Calculus",
    track: "Mathematical Foundation",
    score: 62,
    confidence: "Variable",
    confidenceTone: "bg-amber-100 text-amber-700",
    status: "Plateau",
    statusTone: "text-amber-700",
    action: "Review divergence theorem practice sets.",
    barTone: "bg-amber-600",
    icon: "warning",
  },
  {
    name: "Economic Theory",
    track: "Global Markets",
    score: 88,
    confidence: "Stable",
    confidenceTone: "bg-indigo-100 text-indigo-700",
    status: "Improving",
    statusTone: "text-indigo-700",
    action: "Exceptional performance in micro-modules.",
    barTone: "bg-indigo-600",
    icon: "trending_up",
  },
]

function routeFor(role: Role, area: "home" | "learn" | "analytics") {
  if (area === "home") {
    return `/${role}/dashboard`
  }

  if (area === "learn") {
    return role === "admin" ? "/admin/courses" : `/${role}/courses`
  }

  return `/${role}/analytics`
}

export default function AiLearningAnalyticsView({ role }: Props) {
  const cfg = roleConfig[role]

  return (
    <div className="w-full">
      <section className="mt-0 flex w-full flex-col gap-10 md:mt-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">{cfg.badge}</span>
          <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900 md:text-5xl">{cfg.heading}</h1>
          <p className="max-w-4xl text-lg text-slate-600">{cfg.description}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
          <div className="group rounded-2xl bg-white p-8 transition-all hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)] md:col-span-8">
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-xl font-semibold text-slate-900">Cognitive Velocity</h3>
                <p className="text-sm text-slate-500">Course mastery speed vs. content complexity over 30 days</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Velocity
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Baseline
                </span>
              </div>
            </div>

            <div className="relative flex h-64 items-end justify-between gap-2">
              {bars.map((h, idx) => (
                <div
                  key={`${h}-${idx}`}
                  className={`flex-1 rounded-t-lg transition-all ${
                    idx % 2 === 0
                      ? "bg-indigo-500 group-hover:h-[calc(var(--h)+5%)]"
                      : "bg-indigo-100 group-hover:h-[calc(var(--h)+5%)]"
                  }`}
                  style={{ height: `${h}%`, ["--h" as string]: `${h}%` }}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-between px-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4">
            <div className="flex-1 rounded-2xl bg-white p-6 transition-all hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                <h3 className="text-lg font-semibold text-slate-900">Attention Required</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                The AI has identified friction points in your current curriculum nodes.
              </p>
              <ul className="space-y-3">
                {weakTopics.map((topic) => (
                  <li
                    key={topic}
                    className="group flex items-center justify-between rounded-xl bg-slate-100 p-3 transition-colors hover:bg-red-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-slate-800">{topic}</span>
                    </div>
                    <span className="material-symbols-outlined text-lg text-red-600 opacity-0 transition-opacity group-hover:opacity-100">
                      arrow_forward
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-indigo-600 p-6 text-white">
              <h4 className="mb-2 font-bold">Efficiency Rating</h4>
              <div className="mb-1 text-3xl font-extrabold">
                A+ <span className="text-lg font-normal opacity-80">92.4</span>
              </div>
              <p className="text-xs leading-relaxed opacity-80">
                You are in the top 5% of learners in this specialization.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Recommended Actions</h2>
            <button className="flex items-center gap-1 text-sm font-bold text-indigo-600 transition-all hover:gap-2">
              View Full Curriculum
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <span className="material-symbols-outlined text-emerald-700">task_alt</span>
              </div>
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Priority Task</span>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Resolve Physics Lab Quiz</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                Our AI suggests tackling this now while your cognitive momentum is high.
              </p>
              <button className="w-full rounded-full bg-indigo-600 py-3 text-sm font-bold text-white">Launch Module</button>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
              <div className="relative h-32 w-full bg-gradient-to-br from-indigo-200 via-violet-300 to-sky-300">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded bg-indigo-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                  Next Step
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900">Advanced Fluid Dynamics</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                  Connects your previous mastery of Calculus with upcoming Aerodynamics units.
                </p>
                <button className="w-full rounded-full border-2 border-indigo-200 py-3 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50">
                  Preview Course
                </button>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-indigo-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <span className="material-symbols-outlined text-indigo-700">auto_awesome</span>
              </div>
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Discovery</span>
              <h3 className="mb-3 text-lg font-bold text-slate-900">Cross-Disciplinary Bridge</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                You exhibit patterns found in successful software architects. Explore computational design.
              </p>
              <button className="w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white">Explore Pathway</button>
            </div>
          </div>
        </div>

        <div className="mb-10 w-full rounded-2xl bg-white p-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Analytical Breakdown</h2>
              <p className="text-sm text-slate-500">Actionable granular insights from the last learning cycle.</p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-slate-100 px-6 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200">
              <span className="material-symbols-outlined text-lg">download</span>
              Download Full Audit
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100">
                  <th className="rounded-l-xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Metric Segment</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Retention Score</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Confidence Level</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Status</th>
                  <th className="rounded-r-xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Action Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {segments.map((segment) => (
                  <tr key={segment.name} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{segment.name}</div>
                      <div className="text-xs text-slate-500">{segment.track}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{segment.score}%</span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div className={`${segment.barTone} h-full`} style={{ width: `${segment.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${segment.confidenceTone}`}>
                        {segment.confidence}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center gap-1 ${segment.statusTone}`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {segment.icon}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider">{segment.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs text-slate-600">{segment.action}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-3xl border-t border-slate-200 bg-white/90 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-lg md:hidden">
        <Link
          href={routeFor(role, "home")}
          className="flex flex-col items-center justify-center px-5 py-2 text-slate-400 transition-all duration-300 active:scale-95"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">Home</span>
        </Link>
        <Link
          href={routeFor(role, "learn")}
          className="flex flex-col items-center justify-center px-5 py-2 text-slate-400 transition-all duration-300 active:scale-95"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">Learn</span>
        </Link>
        <Link
          href={routeFor(role, "analytics")}
          className="flex flex-col items-center justify-center rounded-2xl bg-indigo-100 px-5 py-2 text-indigo-700 transition-all duration-300"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            monitoring
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">Analytics</span>
        </Link>
        <Link
          href="/settings"
          className="flex flex-col items-center justify-center px-5 py-2 text-slate-400 transition-all duration-300 active:scale-95"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
