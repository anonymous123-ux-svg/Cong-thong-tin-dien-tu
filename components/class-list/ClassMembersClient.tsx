"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import BulkActionBar from "./BulkActionBar";
import MemberDetailDrawer from "./MemberDetailDrawer";
import MembersFilters, { type MembersFiltersValue } from "./MembersFilters";
import MembersPagination from "./MembersPagination";
import MembersTable from "./MembersTable";
import type { ClassListMember, MemberRole } from "./types";

const PAGE_SIZE = 10;

function clampProgress(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export default function ClassMembersClient({
  classId,
  basePath,
  restore,
  members,
  totalMembers,
}: {
  classId: string;
  basePath: string;
  restore?: boolean;
  members: ClassListMember[];
  totalMembers?: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<ClassListMember[]>(() =>
    members.map((m) => ({ ...m, progressPct: clampProgress(m.progressPct) })),
  );
  const [filters, setFilters] = useState<MembersFiltersValue>({
    query: "",
    role: "",
    status: "",
    tag: "",
  });
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  const storageKey = useMemo(
    () => `e-learning-ui:class-members:${classId}`,
    [classId],
  );

  const persistReturnState = useCallback(
    (nextActiveMemberId: string | null) => {
      if (typeof window === "undefined") return;
      const payload = {
        filters,
        sortDir,
        page,
        selectedIds: Array.from(selectedIds),
        activeMemberId: nextActiveMemberId,
        scrollY: window.scrollY,
        ts: Date.now(),
      };

      try {
        window.sessionStorage.setItem(storageKey, JSON.stringify(payload));
      } catch {
        // ignore
      }
    },
    [filters, page, selectedIds, sortDir, storageKey],
  );

  useEffect(() => {
    if (!restore) return;
    if (typeof window === "undefined") return;

    let raw: string | null = null;
    try {
      raw = window.sessionStorage.getItem(storageKey);
    } catch {
      raw = null;
    }

    if (!raw) {
      router.replace(basePath, { scroll: false });
      return;
    }

    try {
      const parsed = JSON.parse(raw) as {
        filters?: MembersFiltersValue;
        sortDir?: "asc" | "desc";
        page?: number;
        selectedIds?: string[];
        activeMemberId?: string | null;
        scrollY?: number;
      };

      if (parsed.filters) setFilters(parsed.filters);
      if (parsed.sortDir) setSortDir(parsed.sortDir);
      if (typeof parsed.page === "number") setPage(parsed.page);
      if (Array.isArray(parsed.selectedIds))
        setSelectedIds(new Set(parsed.selectedIds));

      // Restore scroll, then restore the drawer open state.
      const scrollTarget =
        typeof parsed.scrollY === "number" ? parsed.scrollY : 0;
      const restoreActive = parsed.activeMemberId ?? null;

      const raf1 = window.requestAnimationFrame(() => {
        const raf2 = window.requestAnimationFrame(() => {
          window.scrollTo({ top: scrollTarget, left: 0, behavior: "auto" });
          if (restoreActive) setActiveMemberId(restoreActive);
        });
        return () => window.cancelAnimationFrame(raf2);
      });
      // eslint-disable-next-line consistent-return
      return () => window.cancelAnimationFrame(raf1);
    } catch {
      // ignore
    } finally {
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
      router.replace(basePath, { scroll: false });
    }
  }, [basePath, restore, router, storageKey]);

  const activeMember = useMemo(() => {
    if (!activeMemberId) return null;
    return data.find((m) => m.id === activeMemberId) ?? null;
  }, [activeMemberId, data]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return data.filter((m) => {
      if (q) {
        const haystack = `${m.name} ${m.email}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (filters.role && m.role !== filters.role) return false;

      if (filters.status) {
        const active = filters.status === "active";
        if (m.isActive !== active) return false;
      }

      if (filters.tag) {
        if (!m.tag || m.tag.label !== filters.tag) return false;
      }

      return true;
    });
  }, [data, filters]);

  const sorted = useMemo(() => {
    const next = [...filtered];
    next.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return next;
  }, [filtered, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const pageMembers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [page, sorted]);

  const totalForLabel = totalMembers ?? sorted.length;
  const rangeStart = sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd =
    sorted.length === 0 ? 0 : Math.min(page * PAGE_SIZE, totalForLabel);
  const rangeLabel = `Showing ${rangeStart}-${rangeEnd} of ${totalForLabel} members`;

  const selectedCount = selectedIds.size;

  function resetToFirstPage() {
    setPage(1);
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll(checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        for (const m of pageMembers) next.add(m.id);
      } else {
        for (const m of pageMembers) next.delete(m.id);
      }
      return next;
    });
  }

  function updateRole(id: string, role: MemberRole) {
    setData((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  }

  function toggleStatus(id: string) {
    setData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)),
    );
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function deactivateSelected() {
    setData((prev) =>
      prev.map((m) => (selectedIds.has(m.id) ? { ...m, isActive: false } : m)),
    );
    clearSelection();
  }

  function changeRoleSelected(role: MemberRole) {
    setData((prev) =>
      prev.map((m) => (selectedIds.has(m.id) ? { ...m, role } : m)),
    );
    clearSelection();
  }

  const drawerOpen = Boolean(activeMember);

  return (
    <>
      <MembersFilters
        value={filters}
        onChange={(next) => {
          setFilters(next);
          resetToFirstPage();
        }}
        onToggleSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
      />

      <MembersTable
        members={pageMembers}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onRoleChange={updateRole}
        onStatusToggle={toggleStatus}
        onMemberClick={(id) => setActiveMemberId(id)}
      />

      <MembersPagination
        page={page}
        pageCount={pageCount}
        label={rangeLabel}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
        onPage={(p) => setPage(Math.min(pageCount, Math.max(1, p)))}
      />

      <BulkActionBar
        selectedCount={selectedCount}
        onClear={clearSelection}
        onDeactivate={deactivateSelected}
        onChangeRole={changeRoleSelected}
      />

      {drawerOpen ? (
        <MemberDetailDrawer
          key={activeMember?.id ?? "member-drawer"}
          classId={classId}
          onEditProfile={(memberId) => {
            persistReturnState(memberId);
            router.push(`/members/classes/${classId}/members/${memberId}/edit`);
          }}
          open
          member={activeMember}
          onClose={() => setActiveMemberId(null)}
        />
      ) : null}
    </>
  );
}
