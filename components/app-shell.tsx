"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@stackframe/stack";
import { BarChart3, Menu, Package, Plus, Settings, X } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
] as const;

function NavLinks({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      <div className="text-sm font-semibold text-gray-400 uppercase">Inventory</div>
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={
              "flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors " +
              (isActive
                ? "bg-purple-100 text-gray-800 dark:bg-purple-900 dark:text-white"
                : "hover:bg-gray-800 text-gray-300")
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppShell({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route changes (e.g. back/forward, programmatic nav).
  useEffect(() => {
    // This is intentional: we want the mobile drawer to close when navigation happens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-20 h-14 bg-gray-900 text-white">
        <div className="h-full px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="w-5 h-5" />
            <span>Inventory App</span>
          </Link>

          <div className="shrink-0">
            <UserButton />
          </div>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-7 h-7" />
            <span className="text-lg font-semibold">
              <Link href="/dashboard">Inventory App</Link>
            </span>
          </div>
        </div>

        <NavLinks currentPath={currentPath} />

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <UserButton showUserInfo />
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gray-900 text-white p-6">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BarChart3 className="w-6 h-6" />
                <span>Inventory App</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <NavLinks currentPath={currentPath} onNavigate={() => setOpen(false)} />

            <div className="mt-8 pt-6 border-t border-gray-700">
              <UserButton showUserInfo />
            </div>
          </aside>
        </div>
      )}

      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">{children}</main>
    </div>
  );
}
