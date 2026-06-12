"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ContinueWatchingItem } from "./data";

function getScrollState(element: HTMLDivElement | null) {
  if (!element) return { canLeft: false, canRight: false };
  const maxLeft = element.scrollWidth - element.clientWidth;
  const left = element.scrollLeft;
  return { canLeft: left > 0, canRight: left < maxLeft - 1 };
}

function getScrollStep(element: HTMLDivElement | null) {
  if (!element) return 320;
  return Math.max(240, Math.round(element.clientWidth * 0.85));
}

export default function ContinueWatchingCarousel({
  items,
}: {
  items: ContinueWatchingItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [{ canLeft, canRight }, setScrollState] = useState(() => ({
    canLeft: false,
    canRight: false,
  }));

  const updateScrollState = useCallback(() => {
    setScrollState(getScrollState(scrollerRef.current));
  }, []);

  useEffect(() => {
    updateScrollState();
    const element = scrollerRef.current;
    if (!element) return;
    const onScroll = () => updateScrollState();
    element.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => {
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateScrollState]);

  const scrollBy = useCallback((delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const scrollByDirection = useCallback(
    (direction: -1 | 1) => {
      const element = scrollerRef.current;
      if (!element) return;
      scrollBy(direction * getScrollStep(element));
    },
    [scrollBy],
  );

  const renderedItems = useMemo(() => items, [items]);

  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-lg font-medium text-slate-900">Continue Watching</h4>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByDirection(-1)}
          disabled={!canLeft}
          className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:text-[#3D52A0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto py-4 px-2"
        >
          {renderedItems.map((item) => {
            if (item.variant === "viewAll") {
              return (
                <button
                  key={item.id}
                  type="button"
                  className="min-w-[280px] shrink-0 cursor-pointer rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-white p-4 text-left opacity-70 transition-opacity hover:opacity-100"
                >
                  <div className="mb-3 flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100">
                    <Video
                      className="h-10 w-10 text-slate-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h5 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h5>
                  <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                className="group min-w-[280px] shrink-0 cursor-pointer rounded-[1.5rem] bg-white p-4 text-left shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}

                  {item.durationLabel ? (
                    <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {item.durationLabel}
                    </span>
                  ) : null}

                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
                </div>

                <h5 className="line-clamp-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                  {item.title}
                </h5>
                <p className="mt-1 mb-2 text-xs text-slate-500">
                  {item.subtitle}
                </p>

                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#3D52A0]"
                    style={{
                      width: `${Math.max(0, Math.min(100, item.progressPercent))}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByDirection(1)}
          disabled={!canRight}
          className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:text-[#3D52A0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
