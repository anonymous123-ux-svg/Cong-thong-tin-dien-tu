"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function AccessRequestToast({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const timeoutId = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timeoutId);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-8 right-8 z-60 max-w-sm rounded-2xl bg-on-background px-6 py-4 text-white shadow-2xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold">Access Request Sent</p>
          <p className="text-xs text-slate-300">
            Dr. Aris will review your application within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
