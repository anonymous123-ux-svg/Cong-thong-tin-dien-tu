"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MOCK_RESOURCES,
  RESOURCE_CATEGORIES,
  STARRED_MODULES,
} from "./mockData";
import ResourceGrid from "./ResourceGrid";
import ResourcesCategorySidebar from "./ResourcesCategorySidebar";
import ResourcesHeader from "./ResourcesHeader";
import UploadDropzone from "./UploadDropzone";
import type { ResourceCategoryKey, ResourceItem } from "./types";

const INITIAL_VISIBLE_COUNT = 4;
const LOAD_MORE_STEP = 16;

function filterResources(
  resources: ResourceItem[],
  category: ResourceCategoryKey,
) {
  if (category === "all") return resources;
  return resources.filter((r) => r.category === category);
}

export default function ResourcesPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<ResourceCategoryKey>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredResources = useMemo(
    () => filterResources(MOCK_RESOURCES, activeCategory),
    [activeCategory],
  );

  const visibleResources = useMemo(
    () => filteredResources.slice(0, visibleCount),
    [filteredResources, visibleCount],
  );

  const canLoadMore = visibleCount < filteredResources.length;
  const remainingCount = Math.max(0, filteredResources.length - visibleCount);
  const nextLoadCount = Math.min(LOAD_MORE_STEP, remainingCount);

  const handlePickFiles = () => fileInputRef.current?.click();
  const handleFilesSelected = (files: FileList) => {
    if (files.length === 0) return;
  };
  const handleViewResource = (resourceId: string) => {
    router.push(`/class/resources/${resourceId}`);
  };

  return (
    <main
      className="min-h-screen p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: "#F8F9FC" }}
    >
      <div className="mx-auto max-w-7xl">
        <ResourcesHeader onUploadClick={handlePickFiles} />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.currentTarget.files)
              handleFilesSelected(e.currentTarget.files);
            e.currentTarget.value = "";
          }}
        />

        <UploadDropzone
          onPickFiles={handlePickFiles}
          onFilesSelected={handleFilesSelected}
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="sticky top-24">
            <ResourcesCategorySidebar
              categories={RESOURCE_CATEGORIES}
              starredModules={STARRED_MODULES}
              activeCategory={activeCategory}
              onCategoryChange={(next) => {
                setActiveCategory(next);
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
            />
          </div>

          <div className="flex-1">
            <ResourceGrid
              resources={visibleResources}
              onView={handleViewResource}
            />

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                disabled={!canLoadMore}
                onClick={() =>
                  setVisibleCount((c) =>
                    Math.min(c + LOAD_MORE_STEP, filteredResources.length),
                  )
                }
                className="cursor-pointer rounded-full px-8 py-3 text-sm font-bold transition-colors"
                style={
                  canLoadMore
                    ? { backgroundColor: "#EEF2FF", color: "#4338CA" }
                    : {
                        backgroundColor: "#F1F5F9",
                        color: "#94A3B8",
                        cursor: "not-allowed",
                      }
                }
              >
                {canLoadMore
                  ? `Load ${nextLoadCount} more resources (${remainingCount} left)`
                  : "All resources loaded"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
