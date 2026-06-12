import ClassesHeader from "./ClassesHeader";
import ClassesDirectoryClient from "./ClassesDirectoryClient";
import { CLASSES_DIRECTORY_ITEMS } from "./mockData";
import { MessageSquareText } from "lucide-react";

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <ClassesHeader
          title="Classes"
          subtitle="Manage your academic cohorts, view detailed student rosters, and coordinate curriculum delivery across departments."
        />

        <ClassesDirectoryClient items={CLASSES_DIRECTORY_ITEMS} />
      </div>

      <div className="fixed bottom-8 right-8 z-40">
        <button
          type="button"
          aria-label="Open chat"
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-indigo-700 active:scale-95"
        >
          <MessageSquareText className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
