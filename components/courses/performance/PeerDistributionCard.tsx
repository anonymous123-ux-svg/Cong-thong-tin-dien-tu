import PeerDistributionBars from "./PeerDistributionBars";

type Props = {
  bars: number[];
  highlightIndex: number;
  labels: string[];
};

export default function PeerDistributionCard({
  bars,
  highlightIndex,
  labels,
}: Props) {
  return (
    <section className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="mb-4 text-base font-medium text-slate-900">
        Peer Distribution
      </h2>

      <PeerDistributionBars bars={bars} highlightIndex={highlightIndex} />

      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
        <span>{labels[0] ?? ""}</span>
        <span>{labels[1] ?? ""}</span>
        <span>{labels[2] ?? ""}</span>
        <span className="font-medium text-indigo-600">{labels[3] ?? ""}</span>
        <span>{labels[4] ?? ""}</span>
      </div>
    </section>
  );
}
