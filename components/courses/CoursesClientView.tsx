"use client";

import { useMemo, useState } from "react";

import CourseGrid from "./CourseGrid";
import CoursesTable from "./CoursesTable";
import CoursesToolbar from "./CoursesToolbar";
import Pagination from "./Pagination";
import type { Course } from "./types";

const TABLE_PAGE_SIZE = 10;

type Props = {
  courses: Course[];
};

export default function CoursesClientView({ courses }: Props) {
  const [tab, setTab] = useState<"All" | "Drafts" | "Published" | "Archived">(
    "All",
  );
  const [category, setCategory] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const handleTabChange = (value: typeof tab) => {
    setTab(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const categories = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesTab =
        tab === "All"
          ? true
          : tab === "Drafts"
            ? course.publishStatus === "Draft"
            : tab === "Published"
              ? course.publishStatus === "Published"
              : course.publishStatus === "Archived";

      const matchesCategory =
        category === "All" ? true : course.category === category;

      return matchesTab && matchesCategory;
    });
  }, [courses, tab, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / TABLE_PAGE_SIZE));

  const tableRows = useMemo(() => {
    const start = (page - 1) * TABLE_PAGE_SIZE;
    return filtered.slice(start, start + TABLE_PAGE_SIZE);
  }, [filtered, page]);

  const featured = useMemo(() => {
    const featuredCourses = filtered.filter((c) => c.featured);
    return (featuredCourses.length ? featuredCourses : filtered).slice(0, 3);
  }, [filtered]);

  return (
    <div className="space-y-6">
      <CoursesToolbar
        tab={tab}
        onTabChange={handleTabChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        view={view}
        onViewChange={setView}
        categories={categories}
      />

      <div className="space-y-6">
        <CourseGrid courses={featured} view={view} />

        <div>
          <CoursesTable courses={tableRows} />
          <Pagination
            page={Math.min(page, totalPages)}
            pageSize={TABLE_PAGE_SIZE}
            totalItems={filtered.length}
            totalPages={totalPages}
            onPageChange={(next) =>
              setPage(Math.max(1, Math.min(totalPages, next)))
            }
          />
        </div>
      </div>
    </div>
  );
}
