import ClassDetailSidebar from "@/components/class-detail/ClassDetailSidebar";
import ClassHero from "@/components/class-detail/ClassHero";
import ClassTabs from "@/components/class-detail/ClassTabs";
import { CLASS_DETAIL } from "@/components/class-detail/mockData";
import OverviewTab from "@/components/class-detail/OverviewTab";
import RosterTab from "@/components/class-detail/RosterTab";
import type { ClassDetailTabKey } from "@/components/class-detail/types";
import { redirect } from "next/navigation";

function parseTab(tab: string | string[] | undefined): ClassDetailTabKey {
  const value = Array.isArray(tab) ? tab[0] : tab;
  if (value === "roster" || value === "schedule") return value;
  return "overview";
}

export default async function ClassDetailPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTab = parseTab(resolvedSearchParams?.tab);

  if (activeTab === "schedule") {
    redirect("/class/schedule");
  }

  return (
    <div className="min-h-screen">
      <ClassHero detail={CLASS_DETAIL} />

      <div className="grid grid-cols-12 gap-10 px-4 py-10 sm:px-8 lg:px-12">
        <div className="col-span-12 lg:col-span-8">
          <ClassTabs activeTab={activeTab} />

          {activeTab === "overview" ? (
            <OverviewTab detail={CLASS_DETAIL} />
          ) : activeTab === "roster" ? (
            <RosterTab />
          ) : null}
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ClassDetailSidebar detail={CLASS_DETAIL} />
        </div>
      </div>
    </div>
  );
}
