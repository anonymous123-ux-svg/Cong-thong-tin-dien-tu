"use client";

import CreateClassHeader from "@/components/class-management/create-class/CreateClassHeader";
import CreateClassForm from "@/components/class-management/create-class/CreateClassForm";
import CreateClassSidebar from "@/components/class-management/create-class/CreateClassSidebar";
import CreateClassMobileBottomNav from "@/components/class-management/create-class/CreateClassMobileBottomNav";

export default function CreateClassClientPage() {
  return (
    <>
      <div className="space-y-12">
        <CreateClassHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <CreateClassForm />
          </div>

          <div className="lg:col-span-4">
            <CreateClassSidebar />
          </div>
        </div>
      </div>

      <CreateClassMobileBottomNav />
    </>
  );
}
