type SentimentVelocityCardProps = {
  score: number;
  label: string;
  quote: string;
};

export default function SentimentVelocityCard({
  score,
  label,
  quote,
}: SentimentVelocityCardProps) {
  return (
    <section className="col-span-12 flex flex-col justify-between rounded-3xl bg-indigo-600 p-8 text-white shadow-lg shadow-indigo-200 lg:col-span-4">
      <div>
        <h2 className="mb-1 text-xl font-semibold">Sentiment Velocity</h2>
        <p className="text-sm text-indigo-200">
          Class-wide emotional resonance
        </p>
      </div>

      <div className="py-6">
        <div className="mb-2 flex items-end gap-1">
          <span className="text-5xl font-bold">{score.toFixed(1)}</span>
          <span className="mb-1 text-sm text-indigo-200">/ 10</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
          <span className="h-2 w-2 rounded-full bg-secondary-container" />
          {label}
        </div>
      </div>

      <div className="rounded-2xl bg-indigo-500/30 p-4">
        <p className="text-center text-xs italic text-indigo-50">{quote}</p>
      </div>
    </section>
  );
}
