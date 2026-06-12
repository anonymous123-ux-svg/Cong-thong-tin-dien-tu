"use client";

export default function RepositoryStorageCard() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#1a1a6e] p-8 text-white md:col-span-4">
      <div className="relative z-10">
        <h3 className="mb-1 text-lg font-bold sm:text-xl">
          Repository Storage
        </h3>
        <p className="text-sm text-indigo-200">74% of 50GB utilized</p>
      </div>

      <div className="relative z-10 mt-8 space-y-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-3/4 rounded-full bg-emerald-300" />
        </div>
        <p className="text-xs text-indigo-200/80">
          Upgrade to Academic Pro for unlimited datasets and AI-powered metadata
          tagging.
        </p>
        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="w-full rounded-full bg-white py-3 font-bold text-[#1a1a6e] transition hover:bg-indigo-50"
        >
          Upgrade Plan
        </button>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-indigo-700/30 blur-3xl" />
    </section>
  );
}
