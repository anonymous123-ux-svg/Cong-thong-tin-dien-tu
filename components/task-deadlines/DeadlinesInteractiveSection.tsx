"use client";

import { useMemo, useState } from "react";

import DeadlinesTableSection from "./DeadlinesTableSection";
import MiniCalendarCard, { type CalendarDate } from "./MiniCalendarCard";
import UpcomingExamCard from "./UpcomingExamCard";
import type { DeadlineItem } from "./types";

type Props = {
  items: DeadlineItem[];
  modules: string[];
};

function toIsoDate(date: CalendarDate) {
  const yyyy = String(date.year);
  const mm = String(date.month + 1).padStart(2, "0");
  const dd = String(date.day).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function DeadlinesInteractiveSection({ items, modules }: Props) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  const selectedDateIso = useMemo(() => {
    return selectedDate ? toIsoDate(selectedDate) : null;
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
      <section className="space-y-6 xl:col-span-8">
        <DeadlinesTableSection
          items={items}
          modules={modules}
          selectedDateIso={selectedDateIso}
        />
      </section>

      <aside className="space-y-6 xl:col-span-4">
        <MiniCalendarCard value={selectedDate} onChange={setSelectedDate} />
        <UpcomingExamCard />
      </aside>
    </div>
  );
}
