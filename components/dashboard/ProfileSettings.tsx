"use client";

import { useState } from "react";
import Toast from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { updateUserProfile, changePassword } from "@/lib/actions/user";
import { signOut } from "next-auth/react";

export default function ProfileSettings({ user }: { user: any }) {
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isAdmin = user?.role === "ADMIN";

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    
    setLoading(true);
    setMessage(null);

    try {
      await updateUserProfile(user.id, { email });

      // Handle password change if filled
      if (currentPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          setMessage({ text: "Mật khẩu xác nhận không khớp.", type: "error" });
          setLoading(false);
          return;
        }
        if (!currentPassword || !newPassword) {
          setMessage({ text: "Vui lòng nhập đủ thông tin mật khẩu.", type: "error" });
          setLoading(false);
          return;
        }

        await changePassword(user.id, currentPassword, newPassword);
        
        // Force logout after password change
        setMessage({ text: "Đổi mật khẩu thành công. Đang đăng xuất...", type: "success" });
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 1500);
        return;
      }

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to update profile.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your professional profile and security preferences.</p>
      </header>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <form onSubmit={handleUpdate} className="relative z-10 space-y-10">
          
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500">manage_accounts</span>
            Profile Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Full Name</label>
              <input type="email" disabled className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-5 py-4 text-slate-400 cursor-not-allowed shadow-sm opacity-70" value={user?.email || ""} />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white border border-slate-200/50 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security / Password Section */}
        <div className="space-y-8 mt-12 pt-8 border-t border-slate-100/60">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500">lock</span>
            Security & Password
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Current Password</label>
              <input 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm"
                placeholder="Leave blank to keep current"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm"
                  placeholder="New password"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Confirm New Password</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        </div>

        {user?.role === "ADMIN" && (
          <div className="space-y-8 mt-12 pt-8 border-t border-slate-100/60">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500">admin_panel_settings</span>
              System Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">Secure your admin account</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Enabled</span>
                </div>
                <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Manage 2FA Settings &rarr;</button>
              </div>

              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Active Sessions</h4>
                    <p className="text-sm text-slate-500">Manage your current logins</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">2 Devices</span>
                </div>
                <button type="button" className="text-sm font-bold text-rose-600 hover:text-rose-700">Revoke All Sessions &rarr;</button>
              </div>

              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 md:col-span-2 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">settings_system_daydream</span>
                  System Preferences
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Default Timezone</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>Asia/Ho_Chi_Minh (GMT+7)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide">Notification Level</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm">
                      <option>All System Alerts</option>
                      <option>Critical Errors Only</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-12 pt-8 border-t border-slate-100/60 flex justify-end">
          <Button loading={loading}>Save Changes</Button>
        </div>

        {message && <div className="mt-4"><Toast message={message.text} type={message.type} /></div>}
        </form>
      </div>
    </div>
  );
}
