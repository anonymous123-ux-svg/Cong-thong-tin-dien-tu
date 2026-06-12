import { auth } from "@/auth";
import SettingsForm from "./SettingsForm";

export default async function StudentSettingsPage() {
  const session = await auth();
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile and account information.</p>
      </header>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <SettingsForm user={session?.user} />
      </div>
    </div>
  );
}
