import CategoryGrid from "@/components/task-resources/CategoryGrid";
import FeaturedModuleCard from "@/components/task-resources/FeaturedModuleCard";
import PinnedTasksCard from "@/components/task-resources/PinnedTasksCard";
import RecentDatasetsCard from "@/components/task-resources/RecentDatasetsCard";
import RepositoryStorageCard from "@/components/task-resources/RepositoryStorageCard";
import ResourcesFab from "@/components/task-resources/ResourcesFab";

export default function TaskResourcesPage() {
  return (
    <>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <RecentDatasetsCard />
        <RepositoryStorageCard />
        <CategoryGrid />
        <PinnedTasksCard />
        <FeaturedModuleCard />
      </section>

      <ResourcesFab />
    </>
  );
}
