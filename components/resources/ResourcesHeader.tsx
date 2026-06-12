import { Upload } from "lucide-react";

type ResourcesHeaderProps = {
  onUploadClick: () => void;
};

export default function ResourcesHeader({
  onUploadClick,
}: ResourcesHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#0F172A" }}
        >
          Research Materials
        </h2>
        <p className="mt-1" style={{ color: "#64748B" }}>
          Explore your curated library of academic excellence.
        </p>
      </div>

      <button
        type="button"
        onClick={onUploadClick}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#4338CA",
          boxShadow: "0 8px 20px rgba(67,56,202,0.3)",
        }}
      >
        <Upload className="h-5 w-5" />
        Upload Resource
      </button>
    </div>
  );
}
