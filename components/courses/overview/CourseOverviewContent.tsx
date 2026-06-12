import Image from "next/image";
import { CheckCircle2, ChevronDown, PlayCircle } from "lucide-react";

type CurriculumItem = {
  title: string;
  meta: string;
  variant?: "default" | "active";
};

type Props = {
  about: string[];
  learningOutcomes: string[];
  curriculum: CurriculumItem[];
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
  };
};

export default function CourseOverviewContent({
  about,
  learningOutcomes,
  curriculum,
  instructor,
}: Props) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-semibold text-2xl font-semibold mb-6 text-slate-800">
          About this course
        </h2>
        <div className="font-normal text-slate-500 space-y-4 leading-relaxed max-w-prose text-base">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-2xl font-semibold mb-6 text-slate-800">
          What you&apos;ll learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningOutcomes.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2
                className="h-5 w-5 text-indigo-500 mt-0.5"
                aria-hidden="true"
              />
              <span className="font-normal text-sm text-slate-500">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-2xl font-semibold mb-6 text-slate-800">
          Course Curriculum
        </h2>

        <div className="space-y-4">
          {curriculum.map((m) => {
            if (m.variant === "active") {
              return (
                <div
                  key={m.title}
                  className="bg-white rounded-xl p-5 shadow-[0_20_40px_rgba(21,28,39,0.04)] border border-indigo-100 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                  <div className="flex justify-between items-center cursor-pointer pl-2">
                    <div>
                      <h3 className="font-semibold text-lg font-medium text-indigo-600">
                        {m.title}
                      </h3>
                      <p className="font-normal text-xs text-slate-500 mt-1">
                        {m.meta}
                      </p>
                    </div>

                    <PlayCircle
                      className="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={m.title}
                className="bg-white rounded-xl p-5 shadow-[0_20_40px_rgba(21,28,39,0.02)] transition-colors hover:bg-slate-50 border border-transparent"
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-lg font-medium text-slate-800">
                      {m.title}
                    </h3>
                    <p className="font-normal text-xs text-slate-500 mt-1">
                      {m.meta}
                    </p>
                  </div>
                  <ChevronDown
                    className="h-5 w-5 text-slate-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h2 className="font-semibold text-xl font-semibold mb-6 text-slate-800">
          Your Instructor
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Image
            alt={instructor.name}
            src={instructor.avatarUrl}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-lg font-semibold text-slate-800">
              {instructor.name}
            </h3>
            <p className="font-medium text-xs uppercase tracking-wider text-indigo-600 mb-3">
              {instructor.title}
            </p>
            <p className="font-normal text-sm text-slate-500 leading-relaxed max-w-prose">
              {instructor.bio}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
