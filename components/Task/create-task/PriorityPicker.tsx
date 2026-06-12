import type { TaskPriority } from "./types";

type PriorityPickerProps = {
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
};

export default function PriorityPicker({
  value,
  onChange,
}: PriorityPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        type="button"
        onClick={() => onChange("low")}
        className={
          value === "low"
            ? "py-2 text-xs font-semibold rounded-lg bg-indigo-700 text-white shadow-md"
            : "py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-indigo-50 transition-colors"
        }
      >
        Low
      </button>

      <button
        type="button"
        onClick={() => onChange("medium")}
        className={
          value === "medium"
            ? "py-2 text-xs font-semibold rounded-lg bg-indigo-700 text-white shadow-md"
            : "py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-indigo-50 transition-colors"
        }
      >
        Medium
      </button>

      <button
        type="button"
        onClick={() => onChange("high")}
        className={
          value === "high"
            ? "py-2 text-xs font-semibold rounded-lg bg-indigo-700 text-white shadow-md"
            : "py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-red-100 transition-colors"
        }
      >
        High
      </button>
    </div>
  );
}
