import { WandSparkles } from "lucide-react";

export default function CreateDeadlineTip() {
  return (
    <section className="mt-8 flex items-start gap-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
        <WandSparkles className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-indigo-700">Pro Tip</h3>
        <p className="mt-1 text-base leading-relaxed text-indigo-700/80">
          Setting a deadline here will automatically sync it with your Academic
          Dashboard and send mobile push notifications based on your reminder
          settings.
        </p>
      </div>
    </section>
  );
}
