"use client";

import { useCallback, useState } from "react";

import AccessRequestToast from "./AccessRequestToast";

export default function ClassHeroActions() {
  const [toastOpen, setToastOpen] = useState(false);

  const handleRequestAccess = useCallback(() => {
    setToastOpen(true);
  }, []);

  const handleJoinClass = useCallback(() => {
    // Intentionally minimal: join flow is out of scope for this UI slice.
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleJoinClass}
          className="rounded-full bg-white px-8 py-3 font-bold text-indigo-700 shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          Join Class
        </button>
        <button
          type="button"
          onClick={handleRequestAccess}
          className="rounded-full border border-white/20 bg-indigo-700/30 px-6 py-3 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Request Access
        </button>
      </div>

      <AccessRequestToast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}
