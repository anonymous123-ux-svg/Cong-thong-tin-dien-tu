"use client";

import Image from "next/image";
import { MoreVertical, Users } from "lucide-react";

import type { ClassListMember, MemberRole, MemberTag } from "./types";

function tagClassName(tag: MemberTag) {
  if (tag.tone === "success") return "bg-green-100 text-green-700";
  if (tag.tone === "danger") return "bg-red-100 text-red-600";
  return "bg-indigo-100 text-indigo-600";
}

function activityDotClassName(tone: ClassListMember["activity"]["tone"]) {
  return tone === "online" ? "bg-green-500" : "bg-gray-300";
}

export default function MembersTable({
  members,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRoleChange,
  onStatusToggle,
  onMemberClick,
}: {
  members: ClassListMember[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onRoleChange: (id: string, role: MemberRole) => void;
  onStatusToggle: (id: string) => void;
  onMemberClick: (id: string) => void;
}) {
  const allSelected =
    members.length > 0 && members.every((m) => selectedIds.has(m.id));
  const someSelected = members.some((m) => selectedIds.has(m.id));

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full border-collapse bg-white text-left">
        <thead>
          <tr className="bg-white text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <th className="w-12 px-6 py-4">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (!el) return;
                  el.indeterminate = !allSelected && someSelected;
                }}
                onChange={(e) => onToggleSelectAll(e.target.checked)}
                aria-label="Select all members"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/20"
              />
            </th>
            <th className="px-6 py-4">Name &amp; Tag</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4">Progress</th>
            <th className="px-6 py-4">Activity</th>
            <th className="px-6 py-4" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {members.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-16">
                <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    No members found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your filters, or invite new members to this
                    class.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            members.map((member) => {
              const selected = selectedIds.has(member.id);
              const progressBarColor =
                member.progressPct < 50
                  ? "accent-red-500"
                  : "accent-indigo-600";

              return (
                <tr
                  key={member.id}
                  onClick={() => onMemberClick(member.id)}
                  className={`group cursor-pointer transition-colors hover:bg-gray-50/50 ${selected ? "bg-indigo-50/30" : ""}`}
                >
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      checked={selected}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onToggleSelect(member.id)}
                      aria-label={`Select ${member.name}`}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/20"
                    />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={member.avatarUrl}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {member.name}
                        </p>
                        {member.tag ? (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${tagClassName(member.tag)}`}
                          >
                            {member.tag.label}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {member.email}
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={member.role}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        onRoleChange(member.id, e.target.value as MemberRole)
                      }
                      className="cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-gray-700 focus:ring-0"
                      aria-label={`Role for ${member.name}`}
                    >
                      <option value="Student">Student</option>
                      <option value="TA">TA</option>
                      <option value="Lecturer">Lecturer</option>
                    </select>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStatusToggle(member.id);
                        }}
                        aria-label={`Toggle status for ${member.name}`}
                        className={
                          member.isActive
                            ? "relative h-5 w-10 cursor-pointer rounded-full bg-green-500 transition-all"
                            : "relative h-5 w-10 cursor-pointer rounded-full bg-gray-300 transition-all"
                        }
                      >
                        <span
                          className={
                            member.isActive
                              ? "absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                              : "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                          }
                        />
                      </button>
                    </div>
                  </td>

                  <td className="min-w-40 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <progress
                        value={member.progressPct}
                        max={100}
                        aria-label={`Progress for ${member.name}`}
                        className={`h-1.5 w-full overflow-hidden rounded-full bg-gray-100 ${progressBarColor}`}
                      />
                      <span
                        className={
                          member.progressPct < 50
                            ? "text-xs font-bold text-red-500"
                            : "text-xs font-bold text-gray-700"
                        }
                      >
                        {member.progressPct}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${activityDotClassName(member.activity.tone)}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-gray-500">
                        {member.activity.label}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`More actions for ${member.name}`}
                      className="cursor-pointer text-gray-300 transition-colors group-hover:text-indigo-500"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
