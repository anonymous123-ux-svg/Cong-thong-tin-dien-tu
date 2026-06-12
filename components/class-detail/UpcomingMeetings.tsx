import { ChevronRight } from "lucide-react";

import type { Meeting } from "./types";

export default function UpcomingMeetings({
  meetings,
}: {
  meetings: Meeting[];
}) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">Upcoming Meetings</h3>
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div className="rounded-lg bg-surface-container px-4 py-2 text-center">
                <span className="block text-xs font-bold uppercase text-indigo-600">
                  {meeting.month}
                </span>
                <span className="text-xl font-extrabold">{meeting.day}</span>
              </div>
              <div>
                <h5 className="font-bold">{meeting.title}</h5>
                <p className="text-sm text-slate-500">
                  {meeting.location} • {meeting.timeRange}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
