type ModuleNavItem = {
  id: string;
  label: string;
  state: "completed" | "active" | "upcoming";
};

type Props = {
  title?: string;
  items?: ModuleNavItem[];
  progressPercent?: number;
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export default function CurriculumModuleNavigation({
  title = "Module Navigation",
  items = [
    { id: "module-1", label: "1. Foundations", state: "completed" },
    { id: "module-2", label: "2. Qubits & Superposition", state: "active" },
    { id: "module-3", label: "3. Gates & Circuits", state: "upcoming" },
    { id: "module-4", label: "4. Entanglement", state: "upcoming" },
  ],
  progressPercent = 35,
}: Props) {
  const clampedProgress = clampPercent(progressPercent);

  return (
    <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
      <h4 className="mb-6 text-base font-semibold text-slate-900">{title}</h4>

      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          if (item.state === "completed") {
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-3 text-sm font-normal text-slate-700 transition-colors hover:text-[#3D52A0]"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#16A34A] shrink-0" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          }

          if (item.state === "active") {
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-3 text-sm font-semibold text-[#3D52A0]"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#3D52A0] ring-4 ring-[#3D52A0]/15 shrink-0" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex items-center gap-3 text-sm font-normal text-slate-400 transition-colors hover:text-[#3D52A0]"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300 shrink-0" />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <h5 className="mb-3 text-sm font-semibold text-slate-800">
          Overall Progress
        </h5>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#4338CA] to-[#6366F1]"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-slate-500">
          {clampedProgress}% Completed
        </p>
      </div>
    </div>
  );
}
