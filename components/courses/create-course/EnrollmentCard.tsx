"use client";

import Card from "@/components/ui/Card";
import type { EnrollmentType } from "./types";

type EnrollmentCardProps = {
  enrollmentType: EnrollmentType;
  price: string;
  onEnrollmentTypeChange: (value: EnrollmentType) => void;
  onPriceChange: (value: string) => void;
};

export default function EnrollmentCard({
  enrollmentType,
  price,
  onEnrollmentTypeChange,
  onPriceChange,
}: EnrollmentCardProps) {
  const isPaid = enrollmentType === "paid";

  return (
    <Card className="bg-surface-container-lowest p-8">
      <h2 className="mb-6 text-lg font-bold">Enrollment</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Type
          </label>

          <div className="grid grid-cols-1 gap-2">
            <label
              className={
                isPaid
                  ? "flex cursor-pointer items-center rounded-xl border-2 border-indigo-700 bg-indigo-50/30 p-3"
                  : "flex cursor-pointer items-center rounded-xl border-2 border-transparent bg-slate-50 p-3 transition-colors hover:bg-slate-100"
              }
            >
              <input
                type="radio"
                name="enroll_type"
                className="text-indigo-700 focus:ring-indigo-700"
                checked={isPaid}
                onChange={() => onEnrollmentTypeChange("paid")}
              />
              <div className="ml-3">
                <span
                  className={
                    isPaid
                      ? "block text-sm font-bold text-indigo-900"
                      : "block text-sm font-bold text-slate-700"
                  }
                >
                  Paid Access
                </span>
                <span
                  className={
                    isPaid
                      ? "block text-xs text-indigo-700/70"
                      : "block text-xs text-slate-500"
                  }
                >
                  One-time payment
                </span>
              </div>
            </label>

            <label
              className={
                !isPaid
                  ? "flex cursor-pointer items-center rounded-xl border-2 border-indigo-700 bg-indigo-50/30 p-3"
                  : "flex cursor-pointer items-center rounded-xl border-2 border-transparent bg-slate-50 p-3 transition-colors hover:bg-slate-100"
              }
            >
              <input
                type="radio"
                name="enroll_type"
                className="text-indigo-700 focus:ring-indigo-700"
                checked={!isPaid}
                onChange={() => onEnrollmentTypeChange("free")}
              />
              <div className="ml-3">
                <span
                  className={
                    !isPaid
                      ? "block text-sm font-bold text-indigo-900"
                      : "block text-sm font-bold text-slate-700"
                  }
                >
                  Free/Scholarship
                </span>
                <span
                  className={
                    !isPaid
                      ? "block text-xs text-indigo-700/70"
                      : "block text-xs text-slate-500"
                  }
                >
                  No student fees
                </span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Course Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 font-bold text-slate-400">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="99.00"
              disabled={!isPaid}
              className="w-full rounded-xl bg-slate-50 py-3 pl-8 pr-4 text-on-surface outline-none transition focus:ring-2 focus:ring-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
