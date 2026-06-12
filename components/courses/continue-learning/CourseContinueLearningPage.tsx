import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Clock,
  Flame,
  MessageSquare,
  NotebookPen,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type RecommendedCourse = {
  id: string;
  levelLabel: string;
  durationLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type CourseProgress = {
  id: string;
  subjectLabel: string;
  moduleLabel: string;
  title: string;
  instructor: string;
  completedLabel: string;
  lessonsLeftLabel: string;
  lastActivityLabel: string;
  progressWidthClassName: string;
  imageSrc: string;
  imageAlt: string;
  variant?: "mostRecent" | "default" | "secondary";
};

type ActivityItem = {
  id: string;
  timeLabel: string;
  title: string;
  description: string;
  isActive?: boolean;
};

type UpcomingTask = {
  id: string;
  badgeLabel: string;
  badgeTone: "danger" | "neutral";
  dueLabel: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTone: "danger" | "neutral";
};

const RECOMMENDED: RecommendedCourse[] = [
  {
    id: "rec-ml",
    levelLabel: "Intermediate",
    durationLabel: "8w",
    title: "Applied Machine Learning",
    description:
      "Deep dive into practical ML algorithms and deployment strategies.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtdIb2KlKl3XOx_043wVFkPBP2RzGtvwcNlKOGcDfW6et_9ZvpEklxP-EsakT7oOsswWOPbm9WQK2p8vlrUCGk7-cq0j4x-ZuCjbOnxYNKSDrY1DFg2Yx3wPYfSCeLB5KKKD9UUwRqYykAcKWR9CPAzckONgHfk2WzdkaYMaQumkf6zvj8QaqAB-xYrXMbQ8DTR_YPgcI_nEJtE-af0BXYdM6wuWvFRYs9juapAXi6LQChKihRP3oRabLPTR-Ux_A9M39bqcZlfqfz",
    imageAlt: "Machine learning course thumbnail",
  },
  {
    id: "rec-astro",
    levelLabel: "Advanced",
    durationLabel: "12w",
    title: "Stellar Astrophysics",
    description: "Study the life cycle of stars and galactic evolution.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg-ukm1DE86anP-mbpAVJBCcSRqeiP8PQZUrME1Z2ZKBo4xxcimTvaWVoPHVHwBifIBBV96lT_sZanzbNhEmWj2jKV2vIYKqsGga3AobSiIiMKH_TNvFHpoMZIplMwE4ifZpupfHZqK3pra2khKT_5hhKZ8Wds9eiK0y4IWRUFSg7bEBjFsNfNas7tO_m2IyDudn1fvr2QPCY-hOAEDvmw-CXWeYfSkZS6VZaH0MuOSVnYBjWNSnJxbwVr6vv2RUOusa7z-fTWFU-_",
    imageAlt: "Astrophysics course thumbnail",
  },
  {
    id: "rec-ds",
    levelLabel: "Beginner",
    durationLabel: "4w",
    title: "Data Structures in Python",
    description: "Foundation course for software engineering principles.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwVGQ3YjSXxhD7SRBgbvZIRqERvkSceSdHtLwxzklyTiRe01ljb5hsrJxoh-PAdHcvMdItW_WGlxLpp20RZ11CSPjwCfDP88fhPVJgUdAS5f1G4srKaSq0UkmWr1Ibs3RgM8Q5P0_wM9vBxTcppBK5RyzNotXQ3Jq2yBvJawaOpkMMUPmCjc_RBsQC5YIwJ82Zmw75D3Z_Pp348D4FOyXL4S1wi2JdMvK7UZKaZEREz-Jvhg5FJgH43nfvLg4_Grd3d-2yBogqFwtY",
    imageAlt: "Data structures course thumbnail",
  },
  {
    id: "rec-ux",
    levelLabel: "Beginner",
    durationLabel: "3w",
    title: "UX Foundations for Product Teams",
    description:
      "Learn research, wireframing, and usability heuristics with real cases.",
    imageSrc: "/courses/linguistic.svg",
    imageAlt: "UX foundations course thumbnail",
  },
  {
    id: "rec-cloud",
    levelLabel: "Intermediate",
    durationLabel: "6w",
    title: "Cloud Architecture Essentials",
    description:
      "Design reliable systems with networking, storage, and observability.",
    imageSrc: "/courses/neural.svg",
    imageAlt: "Cloud architecture course thumbnail",
  },
  {
    id: "rec-sec",
    levelLabel: "Intermediate",
    durationLabel: "5w",
    title: "Web Security for Developers",
    description:
      "Cover auth, OWASP risks, secure APIs, and threat modeling basics.",
    imageSrc: "/courses/cognitive.svg",
    imageAlt: "Web security course thumbnail",
  },
  {
    id: "rec-sql",
    levelLabel: "Beginner",
    durationLabel: "2w",
    title: "SQL for Analytics",
    description:
      "Write clean queries, joins, and window functions for dashboards.",
    imageSrc: "/courses/quantum.svg",
    imageAlt: "SQL analytics course thumbnail",
  },
  {
    id: "rec-react",
    levelLabel: "Intermediate",
    durationLabel: "7w",
    title: "Modern React Patterns",
    description:
      "Build scalable UIs with hooks, composition, and state architecture.",
    imageSrc: "/courses/neural.svg",
    imageAlt: "React patterns course thumbnail",
  },
  {
    id: "rec-nlp",
    levelLabel: "Advanced",
    durationLabel: "10w",
    title: "Natural Language Processing",
    description:
      "Tokenization, embeddings, transformers, and evaluation workflows.",
    imageSrc: "/courses/linguistic.svg",
    imageAlt: "NLP course thumbnail",
  },
];

const IN_PROGRESS: CourseProgress[] = [
  {
    id: "prog-quantum",
    subjectLabel: "Physics",
    moduleLabel: "Mod 4",
    title: "Quantum Computing Fundamentals",
    instructor: "Dr. Sarah Jenkins",
    completedLabel: "68% Completed",
    lessonsLeftLabel: "4 lessons left",
    lastActivityLabel: "2 hrs ago",
    progressWidthClassName: "w-[68%]",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOhWtH2MkjL_NvA7f8gt8kiMdgRdZLSfhnh9RNk3TcIDPeZi1mmPnhAIZmZzZEn4nZ9dKWT4Z8R1NonkDScmhtlNTmCHwleANeyJe_zQgfqFZAcV5WXb82F6GzfdiTDJVV_4bVMJFgyEijos1D_UW1Swi-0bBKO7nFEI4C1y-4fHJM6wMdCanYHglJQ--vYAQ6G094pVbf5C1KjGsKZenii35JhxMFq4-sH2NGrYpuXv1Um--UOlKgbsQc0C7mWZdl-OW3mAcp5r0K",
    imageAlt: "Quantum computing thumbnail",
    variant: "mostRecent",
  },
  {
    id: "prog-theory",
    subjectLabel: "Physics",
    moduleLabel: "Mod 2",
    title: "Advanced Theoretical Physics",
    instructor: "Prof. Marcus Thorne",
    completedLabel: "32% Completed",
    lessonsLeftLabel: "12 lessons left",
    lastActivityLabel: "Yesterday",
    progressWidthClassName: "w-[32%]",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJy3MGINZgOrH_D__d7bge62v7Iy08PxeM7ayiv2FliZDZHHGiAEyiXuqLhFHEswTHQ1KjXSNiLNKQumohlde_o2eNLyn0knR5ofC7z3_Sy7MDSab4LQEx2cTiU0k0Vz81z1eAbG_fGZO7pmyWbkV2xhCW4bXvi5PO9qrFYzkvnr941QsCeDYrWLwfc0sHHLBNaeueEJGTZr-Y_hqquCIhgcwdvFykZOyI7yUDRjAVD999rqbXGURjss7Pdr0ouige8fU-hD81N2Hm",
    imageAlt: "Advanced physics thumbnail",
  },
  {
    id: "prog-neuro",
    subjectLabel: "Engineering",
    moduleLabel: "Mod 8",
    title: "Neuromorphic Engineering",
    instructor: "Dr. Elena Rostova",
    completedLabel: "89% Completed",
    lessonsLeftLabel: "2 lessons left",
    lastActivityLabel: "Oct 12",
    progressWidthClassName: "w-[89%]",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH7rrHgLqGWLt0wuzUbOAal7ao_Cpyr6J2tYHRtpIkMd0VqOw6tb5KL9-ydEQD2aZEU_-_PpUm6VT4qevDFUXzJYFdxf4B7poGByrpDqcsvrZZmSdBbASqQo7B3uyeETsyKsrdrOYVucrQGfz6wp0M-Ut-BLXDsZzEANM24zqCL325HNmByCqfr8TJcxFgP6qZKhHPv-3fNu1PFIkvh76OsvZQjQPwBaWAfVZNo2V-D84FGozsKUqgV4iqnMRN-B11K5GUlXWWCP_p",
    imageAlt: "Neuromorphic engineering thumbnail",
    variant: "secondary",
  },
  {
    id: "prog-mlops",
    subjectLabel: "AI/ML",
    moduleLabel: "Mod 3",
    title: "MLOps in Practice",
    instructor: "Ava Nguyen",
    completedLabel: "45% Completed",
    lessonsLeftLabel: "7 lessons left",
    lastActivityLabel: "3 days ago",
    progressWidthClassName: "w-[45%]",
    imageSrc: "/courses/neural.svg",
    imageAlt: "MLOps thumbnail",
  },
  {
    id: "prog-db",
    subjectLabel: "Data",
    moduleLabel: "Mod 1",
    title: "Database Design Basics",
    instructor: "Minh Tran",
    completedLabel: "18% Completed",
    lessonsLeftLabel: "16 lessons left",
    lastActivityLabel: "Last week",
    progressWidthClassName: "w-[18%]",
    imageSrc: "/courses/cognitive.svg",
    imageAlt: "Database design thumbnail",
  },
  {
    id: "prog-frontend",
    subjectLabel: "Frontend",
    moduleLabel: "Mod 6",
    title: "TypeScript for UI Engineers",
    instructor: "Khoa Le",
    completedLabel: "76% Completed",
    lessonsLeftLabel: "3 lessons left",
    lastActivityLabel: "Mon",
    progressWidthClassName: "w-[76%]",
    imageSrc: "/courses/quantum.svg",
    imageAlt: "TypeScript course thumbnail",
  },
];

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "act-1",
    timeLabel: "2 hours ago",
    title: "Completed Quiz: Qubits and Superposition",
    description: "Quantum Computing Fundamentals • Scored 95%",
    isActive: true,
  },
  {
    id: "act-2",
    timeLabel: "Yesterday, 4:30 PM",
    title: "Watched Video: Entanglement Paradox",
    description: "Quantum Computing Fundamentals • 15 min watched",
  },
  {
    id: "act-3",
    timeLabel: "Oct 14, 10:00 AM",
    title: "Submitted Assignment: Tensor Networks",
    description: "Advanced Theoretical Physics • Pending review",
  },
  {
    id: "act-4",
    timeLabel: "Oct 13, 6:20 PM",
    title: "Finished Lesson: Gradient Descent",
    description: "Applied Machine Learning • 22 min watched",
  },
  {
    id: "act-5",
    timeLabel: "Oct 12, 9:05 AM",
    title: "Created Note: Key Takeaways",
    description: "Neuromorphic Engineering • 6 notes added",
  },
  {
    id: "act-6",
    timeLabel: "Oct 11, 8:40 PM",
    title: "Joined Discussion: Hardware Acceleration",
    description: "Quantum Computing Fundamentals • 3 replies",
  },
  {
    id: "act-7",
    timeLabel: "Oct 10, 3:15 PM",
    title: "Completed Quiz: SQL Joins",
    description: "SQL for Analytics • Scored 88%",
  },
];

const UPCOMING_TASKS: UpcomingTask[] = [
  {
    id: "task-1",
    badgeLabel: "Due Today",
    badgeTone: "danger",
    dueLabel: "11:59 PM",
    title: "Module 4 Peer Review",
    subtitle: "Quantum Computing Fundamentals",
    ctaLabel: "Start Review",
    ctaTone: "danger",
  },
  {
    id: "task-2",
    badgeLabel: "Quiz",
    badgeTone: "neutral",
    dueLabel: "Tomorrow",
    title: "Midterm Assessment",
    subtitle: "Advanced Theoretical Physics",
    ctaLabel: "Review Material",
    ctaTone: "neutral",
  },
  {
    id: "task-3",
    badgeLabel: "Live Session",
    badgeTone: "neutral",
    dueLabel: "Oct 20, 2 PM",
    title: "Guest Lecture: Neuromorphic Design",
    subtitle: "Neuromorphic Engineering",
    ctaLabel: "Add to Calendar",
    ctaTone: "neutral",
  },
  {
    id: "task-4",
    badgeLabel: "Project",
    badgeTone: "neutral",
    dueLabel: "Oct 22",
    title: "Deploy a Model Endpoint",
    subtitle: "MLOps in Practice",
    ctaLabel: "Open Brief",
    ctaTone: "neutral",
  },
  {
    id: "task-5",
    badgeLabel: "Due Soon",
    badgeTone: "danger",
    dueLabel: "Oct 21, 6 PM",
    title: "Assignment: Error Mitigation",
    subtitle: "Quantum Computing Fundamentals",
    ctaLabel: "Start",
    ctaTone: "danger",
  },
  {
    id: "task-6",
    badgeLabel: "Reading",
    badgeTone: "neutral",
    dueLabel: "This weekend",
    title: "Chapter: Normal Forms",
    subtitle: "Advanced Theoretical Physics",
    ctaLabel: "View",
    ctaTone: "neutral",
  },
];

function HideScrollbarRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

function RecommendedCard({ item }: { item: RecommendedCourse }) {
  return (
    <article className="min-w-[320px] max-w-[320px] shrink-0 rounded-xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 flex gap-4">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          width={80}
          height={80}
          className="h-20 w-20 rounded-lg bg-slate-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
              {item.levelLabel}
            </span>
            <span className="flex items-center text-xs text-slate-400">
              <Clock className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              {item.durationLabel}
            </span>
          </div>
          <h4 className="mb-1 line-clamp-2 text-sm font-bold leading-tight text-slate-900">
            {item.title}
          </h4>
          <p className="line-clamp-2 text-xs text-slate-500">
            {item.description}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-auto w-full cursor-pointer rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        Enroll Now
      </button>
    </article>
  );
}

function InsightsWidget() {
  return (
    <section className="flex-1 rounded-xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
        Learning Insights
      </h3>

      <div className="mb-4 flex h-24 items-end gap-4">
        <div className="relative flex h-full flex-1 items-end justify-between gap-2">
          <div className="h-[40%] w-full rounded-t-sm bg-slate-100" />
          <div className="h-[60%] w-full rounded-t-sm bg-slate-100" />
          <div className="h-[90%] w-full rounded-t-sm bg-[#3D52A0]" />
          <div className="h-[30%] w-full rounded-t-sm bg-slate-100" />
          <div className="h-[70%] w-full rounded-t-sm bg-slate-100" />
          <div className="h-[20%] w-full rounded-t-sm bg-slate-100" />
          <div className="h-[10%] w-full rounded-t-sm bg-slate-100" />
        </div>
      </div>

      <div className="flex justify-between text-xs font-medium text-slate-400">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="text-2xl font-black text-slate-900">16h</span>
          <span className="ml-1 text-xs text-slate-500">this week</span>
        </div>
        <div className="text-right">
          <span className="flex items-center justify-end text-sm font-bold text-[#16A34A]">
            <TrendingUp className="mr-1 h-4 w-4" aria-hidden="true" />
            12%
          </span>
          <span className="text-xs text-slate-500">vs last week</span>
        </div>
      </div>
    </section>
  );
}

function StreakWidget() {
  return (
    <section className="flex-1 rounded-xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">
            Study Streak
          </h3>
          <div className="flex items-center gap-2">
            <Flame className="h-10 w-10 text-[#F97316]" aria-hidden="true" />
            <div>
              <span className="text-3xl font-black text-slate-900">5</span>
              <span className="ml-1 text-sm font-medium text-slate-500">
                Days
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="mb-1 block text-xs text-slate-500">
            Longest Streak
          </span>
          <span className="text-lg font-bold text-slate-900">14 Days</span>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F97316] text-xs font-bold text-white shadow-sm ring-2 ring-[#F97316]/20">
          M
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F97316] text-xs font-bold text-white shadow-sm">
          T
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F97316] text-xs font-bold text-white shadow-sm ring-2 ring-[#F97316]/20">
          W
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F97316] text-xs font-bold text-white shadow-sm">
          T
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F97316] text-xs font-bold text-white shadow-sm ring-2 ring-[#F97316]/20">
          F
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-400">
          S
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-400">
          S
        </div>
      </div>
    </section>
  );
}

function QuickActionsWidget() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-3 rounded-xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3D52A0] py-3 font-bold text-white shadow-md transition-colors hover:bg-[#2D3F80]"
      >
        <Play className="h-5 w-5" aria-hidden="true" />
        Resume Last Course
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ClipboardList className="h-4 w-4" aria-hidden="true" />
          Assignments
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <NotebookPen className="h-4 w-4" aria-hidden="true" />
          Notes
        </button>
      </div>

      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Join Discussion
      </button>
    </section>
  );
}

function CourseProgressCard({
  item,
  resumeHref,
}: {
  item: CourseProgress;
  resumeHref: string;
}) {
  const isMostRecent = item.variant === "mostRecent";
  const isSecondary = item.variant === "secondary";

  const wrapperClassName = isMostRecent
    ? "group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-2 ring-[#3D52A0] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    : "group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";

  const progressFillColor = isSecondary ? "#16A34A" : "#3D52A0";

  return (
    <article className={wrapperClassName}>
      {isMostRecent ? (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-[#3D52A0]/20 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#3D52A0]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#3D52A0]">
            Most Recent
          </span>
        </div>
      ) : null}

      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={
              isSecondary
                ? "text-xs font-semibold uppercase tracking-wider text-[#16A34A]"
                : "text-xs font-semibold uppercase tracking-wider text-slate-400"
            }
          >
            {item.subjectLabel} • {item.moduleLabel}
          </span>
        </div>

        <h3 className="mb-1 text-xl font-bold leading-tight text-slate-900">
          {item.title}
        </h3>
        <p className="mb-6 text-sm text-slate-500">{item.instructor}</p>

        <div className="mt-auto">
          <div className="mb-2 flex justify-between text-xs">
            <span
              className={
                isSecondary
                  ? "font-medium text-[#16A34A]"
                  : "font-medium text-slate-700"
              }
            >
              {item.completedLabel}
            </span>
            <span className="text-slate-400">{item.lessonsLeftLabel}</span>
          </div>

          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${item.progressWidthClassName}`}
              style={{ backgroundColor: progressFillColor }}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {item.lastActivityLabel}
            </span>

            <Link
              href={resumeHref}
              className={
                isMostRecent
                  ? "flex cursor-pointer items-center gap-2 rounded-full bg-[#3D52A0] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#2D3F80]"
                  : "cursor-pointer rounded-full bg-[#3D52A0]/10 px-5 py-2.5 text-sm font-semibold text-[#3D52A0] transition-colors hover:bg-[#3D52A0] hover:text-white"
              }
            >
              Resume
              {isMostRecent ? (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function RecentActivityTimeline() {
  return (
    <section className="mt-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-slate-900">Recent Activity</h3>

      <div className="relative ml-4 space-y-8 border-l-2 border-slate-100">
        {RECENT_ACTIVITY.map((item) => (
          <div key={item.id} className="relative pl-6">
            <div
              className={
                item.isActive
                  ? "absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#3D52A0] ring-4 ring-white"
                  : "absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-slate-200 bg-slate-100 ring-4 ring-white"
              }
              aria-hidden="true"
            />
            <div className="mb-1 text-xs font-medium text-slate-400">
              {item.timeLabel}
            </div>
            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 w-full cursor-pointer rounded-lg py-2 text-sm font-semibold text-[#3D52A0] transition-colors hover:bg-slate-50"
      >
        View Full History
      </button>
    </section>
  );
}

function UpcomingTasksCard() {
  return (
    <aside className="sticky top-24 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
        <CalendarClock className="h-5 w-5 text-[#3D52A0]" aria-hidden="true" />
        Upcoming Tasks
      </h3>

      <div className="space-y-4">
        {UPCOMING_TASKS.map((task) => {
          const isDanger = task.badgeTone === "danger";
          const wrapperClassName = isDanger
            ? "rounded-lg border border-red-100 bg-red-50/50 p-4"
            : "rounded-lg border border-slate-100 bg-slate-50 p-4";

          const badgeClassName = isDanger
            ? "bg-red-100 text-red-700"
            : "bg-slate-100 text-slate-600";

          const dueClassName = isDanger ? "text-red-600" : "text-slate-400";

          const ctaClassName =
            task.ctaTone === "danger"
              ? "bg-[#DC2626] text-white hover:bg-red-700"
              : "border border-slate-200 text-slate-700 hover:bg-slate-100";

          return (
            <div key={task.id} className={wrapperClassName}>
              <div className="mb-2 flex items-start justify-between">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${badgeClassName}`}
                >
                  {task.badgeLabel}
                </span>
                <span className={`text-xs font-semibold ${dueClassName}`}>
                  {task.dueLabel}
                </span>
              </div>
              <h4 className="mb-1 text-sm font-bold text-slate-900">
                {task.title}
              </h4>
              <p className="mb-3 text-xs text-slate-500">{task.subtitle}</p>
              <button
                type="button"
                className={`w-full cursor-pointer rounded-md py-1.5 text-xs font-semibold transition-colors ${ctaClassName}`}
              >
                {task.ctaLabel}
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-4 w-full cursor-pointer rounded-lg py-2 text-sm font-semibold text-[#3D52A0] transition-colors hover:bg-slate-50"
      >
        View Calendar
      </button>
    </aside>
  );
}

export default function CourseContinueLearningPage({
  courseId,
  courseTitle,
}: {
  courseId?: string;
  courseTitle?: string;
}) {
  const resumeHref = courseId
    ? `/admin/courses/${courseId}/continue-learning/resume`
    : "/admin/courses/continue-learning/resume";

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Sparkles className="h-5 w-5 text-[#3D52A0]" aria-hidden="true" />
            Recommended for You
          </h2>
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-[#3D52A0] hover:underline"
          >
            View All
          </button>
        </div>

        <HideScrollbarRow>
          {RECOMMENDED.map((item) => (
            <RecommendedCard key={item.id} item={item} />
          ))}
        </HideScrollbarRow>
      </section>

      <section className="flex flex-col gap-6 lg:flex-row">
        <InsightsWidget />
        <StreakWidget />
        <QuickActionsWidget />
      </section>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-8 lg:w-2/3">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
                Continue Learning
              </h2>
              <p className="max-w-2xl text-slate-500">
                Pick up where you left off. You have {IN_PROGRESS.length}{" "}
                courses currently in progress
                {courseTitle ? ` for ${courseTitle}.` : "."}
              </p>
            </div>

            <div className="flex gap-2 rounded-full bg-slate-100 p-1">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                In Progress
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-full px-5 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Almost Completed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {IN_PROGRESS.map((item) => (
              <CourseProgressCard
                key={item.id}
                item={item}
                resumeHref={resumeHref}
              />
            ))}
          </div>

          <RecentActivityTimeline />
        </div>

        <div className="lg:w-1/3">
          <UpcomingTasksCard />
        </div>
      </div>
    </div>
  );
}
