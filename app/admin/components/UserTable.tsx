"use client";

import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { deleteUser } from "@/lib/actions/admin";
import Toast from "@/components/ui/Toast";
import Button from "@/components/ui/Button";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  const [viewUser, setViewUser] = useState<User | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;

    startTransition(async () => {
      try {
        await deleteUser(id);
        showToast(`Deleted user ${email} successfully.`, "success");
      } catch (error: any) {
        showToast(error.message || "Failed to delete user.", "error");
      }
    });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* User Info Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setViewUser(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-sm font-bold">close</span>
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500 text-3xl">account_circle</span>
              User Details
            </h2>
            <div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">User ID</p>
                <p className="text-sm font-mono text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 break-all">{viewUser.id}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-base font-bold text-slate-800">{viewUser.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
                <span className={`inline-block mt-1 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase ${
                  viewUser.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' :
                  viewUser.role === 'LECTURER' ? 'bg-purple-100 text-purple-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  {viewUser.role}
                </span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setViewUser(null)}>Đóng</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-8 py-5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                User
              </th>
              <th className="text-left px-6 py-5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Role
              </th>
              <th className="text-left px-6 py-5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-indigo-50/30 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      {user.email.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-800">
                        {user.email.split('@')[0]}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${
                    user.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' :
                    user.role === 'LECTURER' ? 'bg-purple-100 text-purple-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setViewUser(user)}
                      className="w-9 h-9 rounded-full bg-slate-50 text-indigo-500 hover:text-white hover:bg-indigo-500 flex items-center justify-center transition-all"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(user.id, user.email)}
                      disabled={isPending}
                      className="w-9 h-9 rounded-full bg-slate-50 text-rose-500 hover:text-white hover:bg-rose-500 flex items-center justify-center transition-all disabled:opacity-50"
                      title="Delete User"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}