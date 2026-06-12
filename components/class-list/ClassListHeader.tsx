"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LineChart, Plus } from "lucide-react";
import { useState } from "react";

import type { ClassListHeaderData } from "./types";
import AddMemberModal from "./AddMemberModal";
import InviteMembersModal from "./InviteMembersModal";

export default function ClassListHeader({
  data,
}: {
  data: ClassListHeaderData;
}) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <>
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Link
            href="/class/classes"
            className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Classes
          </Link>

          <h1 className="mb-2 text-[2.75rem] font-bold leading-tight tracking-tight text-gray-900 sm:text-[3.5rem]">
            {data.title}
          </h1>

          <div className="flex items-center gap-3">
            <Image
              src={data.leadInstructorAvatarUrl}
              alt={`Lead Instructor ${data.leadInstructorName}`}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-500">
              Lead Instructor:{" "}
              <span className="font-bold text-indigo-600">
                {data.leadInstructorName}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            Export
          </button>
          <button
            type="button"
            onClick={() => setInviteOpen(true)}
            className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            Invite
          </button>

          <Link
            href={`/analytics/classes/${data.classId}`}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-600 bg-transparent px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
          >
            <LineChart className="h-4 w-4" />
            View Analytics
          </Link>

          <button
            type="button"
            onClick={() => setAddMemberOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </header>

      <InviteMembersModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        classId={data.classId}
        classTitle={data.title}
      />

      <AddMemberModal
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        classTitle={data.title}
        currentMembers={data.membersCount}
      />
    </>
  );
}
