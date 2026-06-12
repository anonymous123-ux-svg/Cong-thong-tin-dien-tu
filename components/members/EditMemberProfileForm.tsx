import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ChevronDown,
  GraduationCap,
  Landmark,
  User,
} from "lucide-react";

import type { ClassListMember } from "@/components/class-list/types";

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-indigo-500/5">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-bold uppercase tracking-wider text-gray-500"
    >
      {children}
    </label>
  );
}

export default function EditMemberProfileForm({
  member,
  backHref,
}: {
  member: ClassListMember;
  backHref: string;
}) {
  const fullNameId = "edit-member-full-name";
  const emailId = "edit-member-email";
  const phoneId = "edit-member-phone";
  const roleId = "edit-member-role";
  const statusId = "edit-member-status";
  const staffId = "edit-member-staff-id";
  const departmentId = "edit-member-department";
  const yearId = "edit-member-year";

  const displayName =
    member.id === "elena-rodriguez" ? `Dr. ${member.name}` : member.name;

  return (
    <form className="space-y-8" aria-label="Edit member profile form">
      <SectionCard
        icon={<User className="h-5 w-5" aria-hidden="true" />}
        title="Basic Information"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center md:col-span-1">
            <div className="group relative mb-4 inline-block h-32 w-32">
              <div className="h-full w-full overflow-hidden rounded-xl bg-gray-100 ring-4 ring-white shadow-md">
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-indigo-600/40 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Update photo"
              >
                <Camera className="h-8 w-8 text-white" aria-hidden="true" />
              </button>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Update Photo
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor={fullNameId}>Full Name</FieldLabel>
              <input
                id={fullNameId}
                type="text"
                defaultValue={displayName}
                className="w-full rounded-xl border-none bg-indigo-50 px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor={emailId}>Email Address</FieldLabel>
              <input
                id={emailId}
                type="email"
                defaultValue={member.email}
                className="w-full rounded-xl border-none bg-indigo-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <FieldLabel htmlFor={phoneId}>Phone Number</FieldLabel>
              <input
                id={phoneId}
                type="tel"
                defaultValue={"+1 (555) 012-3456"}
                className="w-full rounded-xl border-none bg-indigo-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        icon={<GraduationCap className="h-5 w-5" aria-hidden="true" />}
        title="Academic Role & Status"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <FieldLabel htmlFor={roleId}>Academic Role</FieldLabel>
            <div className="relative">
              <select
                id={roleId}
                defaultValue={member.role}
                className="w-full appearance-none rounded-xl border-none bg-indigo-50 px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="Lecturer">Lecturer</option>
                <option value="Student">Student</option>
                <option value="TA">TA</option>
                <option value="Professor">Professor</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor={statusId}>Account Status</FieldLabel>
            <div className="flex items-center rounded-xl bg-indigo-50 px-4 py-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id={statusId}
                  type="checkbox"
                  defaultChecked={member.isActive}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:inset-s-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
                <span className="ms-3 text-sm font-medium text-gray-700">
                  {member.isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor={staffId}>Student/Staff ID</FieldLabel>
            <input
              id={staffId}
              type="text"
              defaultValue={"AC-2024-8890"}
              className="w-full rounded-xl border-none bg-indigo-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        icon={<Landmark className="h-5 w-5" aria-hidden="true" />}
        title="Department & Program"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor={departmentId}>Department</FieldLabel>
            <div className="relative">
              <select
                id={departmentId}
                defaultValue={"Department of Artificial Intelligence"}
                className="w-full appearance-none rounded-xl border-none bg-indigo-50 px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option>Department of Artificial Intelligence</option>
                <option>Neuroscience & Cognitive Science</option>
                <option>Philosophy of Mind</option>
                <option>Quantitative Economics</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor={yearId}>Enrollment Year</FieldLabel>
            <input
              id={yearId}
              type="number"
              defaultValue={2021}
              className="w-full rounded-xl border-none bg-indigo-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
      </SectionCard>

      <footer className="flex flex-col items-center justify-end gap-4 border-t border-gray-100 pt-8 sm:flex-row">
        <Link
          href={backHref}
          className="w-full cursor-pointer rounded-full border-2 border-transparent px-8 py-3 text-center font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 sm:w-auto"
        >
          Cancel
        </Link>

        <button
          type="button"
          className="w-full cursor-pointer rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 sm:w-auto"
        >
          Save Changes
        </button>
      </footer>
    </form>
  );
}
