import CurriculumModuleCard from "./CurriculumModuleCard";
import { curriculumModulesMock } from "./mockData";

export default function CurriculumModules() {
  return (
    <div className="flex flex-col gap-8">
      {curriculumModulesMock.map((module) => (
        <CurriculumModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}
