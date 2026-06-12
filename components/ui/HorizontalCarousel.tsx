"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  titleIcon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  scrollerClassName?: string;
};

function getScrollState(element: HTMLDivElement | null) {
  if (!element) return { canLeft: false, canRight: false };

  const maxLeft = element.scrollWidth - element.clientWidth;
  const left = element.scrollLeft;

  return {
    canLeft: left > 0,
    canRight: left < maxLeft - 1,
  };
}

function getScrollStep(element: HTMLDivElement | null) {
  if (!element) return 320;
  return Math.max(240, Math.round(element.clientWidth * 0.85));
}

export default function HorizontalCarousel({
  title,
  titleIcon,
  action,
  children,
  className,
  scrollerClassName,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [{ canLeft, canRight }, setScrollState] = useState(() => ({
    canLeft: false,
    canRight: false,
  }));

  const updateScrollState = useCallback(() => {
    const nextState = getScrollState(scrollerRef.current);
    setScrollState((prev) =>
      prev.canLeft === nextState.canLeft && prev.canRight === nextState.canRight
        ? prev
        : nextState,
    );
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
    const element = scrollerRef.current;
    if (!element) return;

    element.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const scrollByDirection = useCallback(
    (direction: -1 | 1) => {
      const element = scrollerRef.current;
      if (!element) return;

      scrollBy(direction * getScrollStep(element));
    },
    [scrollBy],
  );

  return (
    <section className={cn("min-w-0", className)}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          {titleIcon}
          {title}
        </h2>

        <div className="flex items-center gap-2">
          {action}

          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByDirection(-1)}
            disabled={!canLeft}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#3D52A0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByDirection(1)}
            disabled={!canRight}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#3D52A0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "-mx-4 flex gap-6 overflow-x-auto px-4 pb-6 no-scrollbar sm:mx-0 sm:px-0",
          scrollerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
