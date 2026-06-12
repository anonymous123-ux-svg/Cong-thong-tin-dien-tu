"use client";

import { useState } from "react";
import { updateUserProfile, changePassword } from "@/lib/actions/user";
import Toast from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

export default function SettingsForm({ user }: { user: any }) {
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
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

      setMessage({ text: "Cập nhật hồ sơ thành công!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Đã xảy ra lỗi cập nhật.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      {/* Profile Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Profile Information</h3>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">User ID (Read-only)</label>
          <input 
            disabled 
            value={user?.id} 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-6 pt-4">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Change Password</h3>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
          <input 
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            placeholder="Leave blank to keep current"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="New password"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button loading={loading}>Save Changes</Button>
      </div>

      {message && <Toast message={message.text} type={message.type} />}
    </form>
  );
}
