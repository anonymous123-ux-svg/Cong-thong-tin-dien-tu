"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import CreateCourseHeader from "@/components/courses/create-course/CreateCourseHeader";
import CourseThumbnailCard from "@/components/courses/create-course/CourseThumbnailCard";
import EnrollmentCard from "@/components/courses/create-course/EnrollmentCard";
import GeneralInformationCard from "@/components/courses/create-course/GeneralInformationCard";
import LivePreviewCard from "@/components/courses/create-course/LivePreviewCard";
import QualityChecklistCard from "@/components/courses/create-course/QualityChecklistCard";
import type {
  CourseLevel,
  CreateCourseFormState,
  EnrollmentType,
} from "./types";

const INITIAL_STATE: CreateCourseFormState = {
  title: "",
  category: "",
  level: "Beginner",
  description: "",
  enrollmentType: "paid",
  price: "",
  coverImageUrl: null,
};

function formatPrice(enrollmentType: EnrollmentType, price: string) {
  if (enrollmentType === "free") return "$0.00";

  const numeric = Number(price);
  if (!Number.isFinite(numeric) || numeric <= 0) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numeric);
}

export default function CreateCourseClientPage() {
  const [state, setState] = useState<CreateCourseFormState>(INITIAL_STATE);

  const priceDisplay = useMemo(
    () => formatPrice(state.enrollmentType, state.price),
    [state.enrollmentType, state.price],
  );

  useEffect(() => {
    return () => {
      if (state.coverImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(state.coverImageUrl);
      }
    };
  }, [state.coverImageUrl]);

  const onPickCover = useCallback((file: File) => {
    setState((prev) => ({
      ...prev,
      coverImageUrl: URL.createObjectURL(file),
    }));
  }, []);

  const onSaveDraft = useCallback(() => {
    // Intentionally minimal: wire up persistence when backend is ready.
  }, []);

  const onContinue = useCallback(() => {
    // Intentionally minimal: wire up navigation + validation when flow is ready.
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <CreateCourseHeader onSaveDraft={onSaveDraft} onContinue={onContinue} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <GeneralInformationCard
            title={state.title}
            category={state.category}
            level={state.level}
            description={state.description}
            onTitleChange={(value) =>
              setState((prev) => ({ ...prev, title: value }))
            }
            onCategoryChange={(value) =>
              setState((prev) => ({ ...prev, category: value }))
            }
            onLevelChange={(value) =>
              setState((prev) => ({ ...prev, level: value as CourseLevel }))
            }
            onDescriptionChange={(value) =>
              setState((prev) => ({ ...prev, description: value }))
            }
          />

          <CourseThumbnailCard
            coverImageUrl={state.coverImageUrl}
            onPickCover={onPickCover}
          />
        </div>

        <div className="space-y-8">
          <EnrollmentCard
            enrollmentType={state.enrollmentType}
            price={state.price}
            onEnrollmentTypeChange={(value) =>
              setState((prev) => ({
                ...prev,
                enrollmentType: value,
                price: value === "free" ? "" : prev.price,
              }))
            }
            onPriceChange={(value) =>
              setState((prev) => ({ ...prev, price: value }))
            }
          />

          <LivePreviewCard
            title={state.title}
            level={state.level}
            priceDisplay={priceDisplay}
            coverImageUrl={state.coverImageUrl}
          />

          <QualityChecklistCard state={state} />
        </div>
      </div>
    </div>
  );
}
