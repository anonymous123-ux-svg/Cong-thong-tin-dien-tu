import { CLASS_ITEMS, LECTURES } from "./mockData";
import CourseCard from "./CourseCard";
import InsightsCard from "./InsightsCard";
import UpcomingLectures from "./UpcomingLectures";

export default function ClassDashboardClient() {
  const classes = CLASS_ITEMS;

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <CourseCard item={classes[0]} />
      </div>

      <div className="lg:col-span-1">
        <CourseCard item={classes[1]} />
      </div>

      <div className="lg:col-span-1">
        <InsightsCard />
      </div>

      <div className="lg:col-span-1">
        <CourseCard item={classes[2]} />
      </div>

      <div className="lg:col-span-2">
        <UpcomingLectures lectures={LECTURES} />
      </div>
    </section>
  );
}
