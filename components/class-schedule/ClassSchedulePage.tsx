"use client";

import { useState } from "react";

import ClassScheduleView from "./ClassScheduleView";
import JoinCurrentClassModal from "./JoinCurrentClassModal";
import JoinLiveLectureModal from "./JoinLiveLectureModal";
import ScheduleSidebarWidgets from "./ScheduleSidebarWidgets";
import type { ScheduleMode } from "./types";

export default function ClassSchedulePage() {
  const [mode, setMode] = useState<ScheduleMode>("day");
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [liveLectureModalOpen, setLiveLectureModalOpen] = useState(false);

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 flex flex-col gap-8 xl:col-span-8">
          <ClassScheduleView
            mode={mode}
            onModeChange={setMode}
            onJoinLiveLecture={() => setLiveLectureModalOpen(true)}
          />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <ScheduleSidebarWidgets
            onJoinCurrentClass={() => setJoinModalOpen(true)}
          />
        </div>
      </div>

      <JoinCurrentClassModal
        open={joinModalOpen}
        onOpenChange={setJoinModalOpen}
      />

      <JoinLiveLectureModal
        open={liveLectureModalOpen}
        onOpenChange={setLiveLectureModalOpen}
      />
    </main>
  );
}
