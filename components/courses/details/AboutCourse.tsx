import { BadgeCheck, Terminal } from "lucide-react";

export default function AboutCourse() {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">
        About this Course
      </h3>

      <p className="text-slate-600 leading-relaxed text-lg mb-6">
        This course pushes beyond the basics of multi-layer perceptrons into the
        cutting-edge of transformer architectures, attention mechanisms, and
        generative modeling. Designed for post-graduate students and industry
        practitioners, we focus on the mathematical rigor and implementation of
        state-of-the-art models.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-2xl">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-slate-700">
            Graduate Level Certification
          </span>
        </div>
        <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-2xl">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-slate-700">
            20+ Hands-on Lab Assignments
          </span>
        </div>
      </div>
    </section>
  );
}
