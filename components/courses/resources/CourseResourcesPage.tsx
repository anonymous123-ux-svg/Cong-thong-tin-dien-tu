import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  Play,
  Video,
  Wrench,
} from "lucide-react";

type ResourceKind = "paper" | "lecture" | "tool";

type CourseResource = {
  id: string;
  kind: ResourceKind;
  badgeLabel: string;
  title: string;
  description: string;
  metaLabel: string;
  actions: {
    preview?: boolean;
    download?: boolean;
    play?: boolean;
    open?: boolean;
  };
};

const RESOURCES: CourseResource[] = [
  {
    id: "paper-quantum-supremacy",
    kind: "paper",
    badgeLabel: "Paper",
    title: "Quantum Supremacy Using a Programmable Superconducting Processor",
    description:
      "Nature paper outlining the first demonstration of quantum supremacy by the Google Quantum AI team.",
    metaLabel: "2.4 MB",
    actions: { preview: true, download: true },
  },
  {
    id: "lecture-4-recording",
    kind: "lecture",
    badgeLabel: "Lecture",
    title: "Lecture 4: Quantum Gates and Circuits",
    description:
      "Recording of Week 2 lecture covering Pauli matrices, Hadamard gates, and basic circuit construction.",
    metaLabel: "1h 15m",
    actions: { play: true },
  },
  {
    id: "lecture-4-slides",
    kind: "paper",
    badgeLabel: "Lecture",
    title: "Lecture 4 Slides",
    description:
      "Accompanying slide deck for Lecture 4 with annotated circuit diagrams.",
    metaLabel: "5.1 MB",
    actions: { preview: true, download: true },
  },
  {
    id: "tool-ibm-composer",
    kind: "tool",
    badgeLabel: "Tool",
    title: "IBM Quantum Composer",
    description:
      "Interactive graphical tool for constructing quantum circuits and running them on real quantum hardware.",
    metaLabel: "External Link",
    actions: { open: true },
  },
  {
    id: "paper-shor",
    kind: "paper",
    badgeLabel: "Paper",
    title: "Shor's Algorithm for Factoring",
    description:
      "Original 1994 paper by Peter Shor detailing the polynomial-time quantum algorithm for integer factorization.",
    metaLabel: "1.1 MB",
    actions: { preview: true, download: true },
  },
  {
    id: "lecture-1-intro",
    kind: "lecture",
    badgeLabel: "Lecture",
    title: "Lecture 1: Why Quantum?",
    description:
      "A fast, intuitive introduction to the motivation behind quantum computation and what makes it different.",
    metaLabel: "52m",
    actions: { play: true },
  },
  {
    id: "paper-deutsch-jozsa",
    kind: "paper",
    badgeLabel: "Paper",
    title: "Deutsch–Jozsa Algorithm (Notes)",
    description:
      "Short notes covering the promise problem, circuit, and why the quantum algorithm outperforms the classical approach.",
    metaLabel: "860 KB",
    actions: { preview: true, download: true },
  },
  {
    id: "paper-grovers",
    kind: "paper",
    badgeLabel: "Paper",
    title: "Grover's Search: A Practical Walkthrough",
    description:
      "Step-by-step explanation of the amplitude amplification idea with an example oracle and measurement intuition.",
    metaLabel: "1.6 MB",
    actions: { preview: true, download: true },
  },
  {
    id: "lecture-2-linear-algebra-refresh",
    kind: "lecture",
    badgeLabel: "Lecture",
    title: "Lecture 2: Linear Algebra Refresh",
    description:
      "Vectors, complex numbers, inner products, and unitary matrices you need for the rest of the course.",
    metaLabel: "1h 08m",
    actions: { play: true },
  },
  {
    id: "lecture-3-qubits",
    kind: "lecture",
    badgeLabel: "Lecture",
    title: "Lecture 3: Qubits and Bloch Sphere",
    description:
      "Qubit states, measurement, and how the Bloch sphere helps you reason about gates and rotations.",
    metaLabel: "44m",
    actions: { play: true },
  },
  {
    id: "paper-no-cloning",
    kind: "paper",
    badgeLabel: "Paper",
    title: "No-Cloning Theorem (Reading)",
    description:
      "Concise proof and common misconceptions, plus why it matters for quantum communication and security.",
    metaLabel: "740 KB",
    actions: { preview: true, download: true },
  },
  {
    id: "tool-qiskit-textbook",
    kind: "tool",
    badgeLabel: "Tool",
    title: "Qiskit Textbook",
    description:
      "Interactive explanations and small exercises that complement the lectures and help validate your intuition.",
    metaLabel: "External Link",
    actions: { open: true },
  },
  {
    id: "tool-circuit-simulator",
    kind: "tool",
    badgeLabel: "Tool",
    title: "Circuit Simulator Sandbox",
    description:
      "A lightweight sandbox to experiment with single- and two-qubit circuits and inspect intermediate states.",
    metaLabel: "External Link",
    actions: { open: true },
  },
];

function KindIcon({ kind }: { kind: ResourceKind }) {
  if (kind === "lecture")
    return <Video className="h-6 w-6" aria-hidden="true" />;
  if (kind === "tool") return <Wrench className="h-6 w-6" aria-hidden="true" />;
  return <FileText className="h-6 w-6" aria-hidden="true" />;
}

function KindIconWrapper({ kind }: { kind: ResourceKind }) {
  const className =
    kind === "lecture"
      ? "bg-[#EDE9FE] text-[#3D52A0]"
      : kind === "tool"
        ? "bg-[#DCFCE7] text-[#16A34A]"
        : "bg-[#FEE2E2] text-[#DC2626]";

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${className}`}
      aria-hidden="true"
    >
      <KindIcon kind={kind} />
    </div>
  );
}

export default function CourseResourcesPage({
  courseTitle,
}: {
  courseTitle?: string;
}) {
  return (
    <div className="pb-10 pt-4">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
            Course Resources
          </h1>
          <p className="max-w-2xl text-lg text-slate-500">
            Access all supplementary materials, lecture slides, and required
            reading{courseTitle ? ` for ${courseTitle}.` : "."}
          </p>
        </header>

        <section aria-label="Resource filters" className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-[#3D52A0] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2D3F80]"
            >
              All Resources
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Lectures
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Papers
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Tools
            </button>
          </div>
        </section>

        <section aria-label="Resource list">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource) => (
              <article
                key={resource.id}
                className="group flex h-full flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:bg-slate-50"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <KindIconWrapper kind={resource.kind} />
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {resource.badgeLabel}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold leading-tight text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                  {resource.title}
                </h3>
                <p className="mb-6 flex-1 text-sm text-slate-500 line-clamp-3">
                  {resource.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    {resource.kind === "lecture" ? (
                      <Video className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : resource.kind === "tool" ? (
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{resource.metaLabel}</span>
                  </div>

                  <div className="flex gap-2">
                    {resource.actions.preview ? (
                      <button
                        type="button"
                        aria-label="Preview"
                        className="cursor-pointer rounded-full p-2 text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/10"
                      >
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      </button>
                    ) : null}

                    {resource.actions.download ? (
                      <button
                        type="button"
                        aria-label="Download"
                        className="cursor-pointer rounded-full bg-[#3D52A0]/10 p-2 text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/20"
                      >
                        <Download className="h-5 w-5" aria-hidden="true" />
                      </button>
                    ) : null}

                    {resource.actions.play ? (
                      <button
                        type="button"
                        aria-label="Play"
                        className="cursor-pointer rounded-full bg-[#3D52A0]/10 p-2 text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/20"
                      >
                        <Play className="h-5 w-5" aria-hidden="true" />
                      </button>
                    ) : null}

                    {resource.actions.open ? (
                      <button
                        type="button"
                        aria-label="Open link"
                        className="cursor-pointer rounded-full bg-[#3D52A0]/10 p-2 text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/20"
                      >
                        <ExternalLink className="h-5 w-5" aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
