import Card from "@/components/ui/Card";

export default function InsightsCard() {
  return (
    <Card className="flex flex-col justify-between bg-linear-to-br from-blue-600 to-blue-800 p-6 text-white shadow-[0px_20px_40px_rgba(37,99,235,0.25)]">
      <div>
        <h3 className="mb-2 text-xl font-bold">Curriculum Insights</h3>
        <p className="text-sm leading-relaxed text-blue-100/80">
          Your students in PH-202 show 15% higher engagement compared to the
          departmental average this week.
        </p>
      </div>

      <div className="mt-8 flex h-24 items-end gap-2">
        <div className="h-[40%] flex-1 rounded-t-lg bg-white/20" />
        <div className="h-[60%] flex-1 rounded-t-lg bg-white/20" />
        <div className="h-[45%] flex-1 rounded-t-lg bg-white/20" />
        <div className="h-[80%] flex-1 rounded-t-lg bg-white/20" />
        <div className="h-[95%] flex-1 rounded-t-lg bg-white/50" />
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-white py-2 text-xs font-bold uppercase tracking-widest text-blue-700 transition-colors hover:bg-blue-50"
      >
        View Detailed Report
      </button>
    </Card>
  );
}
