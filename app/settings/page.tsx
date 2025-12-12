import AppShell from "@/components/app-shell";
import ThemeSelector from "@/components/theme-selector";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  // Ensure user is authenticated before rendering the page.
  await getCurrentUser();

  return (
    <AppShell currentPath="/settings">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Appearance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose how the application looks on this device.
            </p>
          </div>
          <ThemeSelector />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <AccountSettings fullPage />
        </div>
      </div>
    </AppShell>
  );
}
