import Image from "next/image";

import type { PerformanceCard } from "./types";

function noteClass(cardId: PerformanceCard["id"]) {
  if (cardId === "class-average") return "text-secondary-fixed-dim";
  return "text-slate-400";
}

export default function PerformanceCards({
  cards,
  studentsPreview,
}: {
  cards: PerformanceCard[];
  studentsPreview: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const noteTone = noteClass(card.id);

        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-8 border border-slate-200"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
              {card.label}
            </span>

            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-on-background">
                {card.value}
              </span>
              {card.valueNote ? (
                <span
                  className={`${noteTone} font-bold text-sm mb-1`}
                  aria-label={card.valueNote}
                >
                  {card.valueNote}
                </span>
              ) : null}
            </div>

            {card.id === "class-average" ? (
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "84.2%" }}
                />
              </div>
            ) : null}

            {card.id === "assignments-graded" ? (
              <div className="flex gap-1 mt-6 w-40 mx-auto">
                <div className="h-1.5 flex-1 bg-green-700 rounded-full" />
                <div className="h-1.5 flex-1 bg-green-700 rounded-full" />
                <div className="h-1.5 flex-1 bg-green-700 rounded-full" />
                <div className="h-1.5 flex-1 bg-slate-200 rounded-full" />
              </div>
            ) : null}

            {card.id === "active-students" ? (
              <div className="mt-6 flex -space-x-2 items-center">
                {studentsPreview.slice(0, 3).map((url, idx) => (
                  <div
                    key={`${url}-${idx}`}
                    className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt="Student"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[8px] text-white font-bold">
                  +25
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
