import { ProfileForm } from "@/components/settings/profile-form";
import { SettingsNav } from "@/components/settings/settings-nav";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <div className="flex gap-12">
        <SettingsNav />
        <ProfileForm />
      </div>
    </div>
  );
}
