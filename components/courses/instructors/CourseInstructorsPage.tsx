import FeaturedInstructorCard from "./FeaturedInstructorCard";
import AssistantInstructorCard from "./AssistantInstructorCard";
import GuestLecturerCard from "./GuestLecturerCard";
import { instructorsMock } from "./mockData";

type Props = {
  courseId: string;
  courseTitle: string;
};

export default function CourseInstructorsPage({ courseTitle }: Props) {
  const lead = instructorsMock.find((instructor) => instructor.kind === "lead");
  const assistants = instructorsMock.filter(
    (instructor) => instructor.kind === "assistant",
  );
  const guest = instructorsMock.find(
    (instructor) => instructor.kind === "guest",
  );

  return (
    <div className="w-full max-w-7xl space-y-12 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
      <header className="space-y-4">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            Instructors
          </h1>
          <p className="max-w-[70ch] text-base text-gray-500">
            Connect with the experts guiding your journey through {courseTitle}.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {lead ? <FeaturedInstructorCard instructor={lead} /> : null}
        {assistants.map((assistant) => (
          <AssistantInstructorCard key={assistant.id} instructor={assistant} />
        ))}
        {guest ? <GuestLecturerCard instructor={guest} /> : null}
      </section>
    </div>
  );
}
