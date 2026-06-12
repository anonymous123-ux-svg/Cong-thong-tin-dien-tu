export default function ScoreDistributionCard() {
  const bars = ["h-1/4", "h-2/4", "h-3/4", "h-full", "h-2/3"];

  return (
    <section
      className="rounded-2xl p-6"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <h4
        className="mb-6 text-sm font-bold uppercase tracking-wider"
        style={{ color: "#94A3B8" }}
      >
        Score Distribution
      </h4>

      <div className="flex h-40 items-end gap-3">
        {bars.map((heightClassName, idx) => (
          <div
            key={idx}
            className={`group relative w-full ${heightClassName} rounded-t-lg overflow-hidden`}
            style={{ backgroundColor: "#EEF2FF" }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-full rounded-t-lg transition-all group-hover:opacity-80"
              style={{ backgroundColor: "#4338CA" }}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex justify-between text-[10px]"
        style={{ color: "#94A3B8" }}
      >
        <span>&lt; 60</span>
        <span>70-80</span>
        <span>90+</span>
      </div>
    </section>
  );
}
