"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import { UserButton } from "@stackframe/stack";

// Skeleton component for loading states
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`}></div>
  );
}

// Mobile top bar skeleton
function LoadingMobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-20 h-14 bg-gray-900 text-white">
      <div className="h-full px-4 flex items-center justify-between">
        <Skeleton className="h-9 w-9 rounded-lg bg-gray-800" />
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <span className="font-semibold">Inventory App</span>
        </div>
        <Skeleton className="h-9 w-9 rounded-full bg-gray-800" />
      </div>
    </header>
  );
}

// Sidebar component for loading state (desktop)
function LoadingSidebar() {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:block fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>

      <nav className="space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Inventory
        </div>
        {navigation.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300"
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="ml-3">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main content skeleton
function MainContentSkeleton({
  showSidebar = true,
}: {
  showSidebar?: boolean;
}) {
  return (
    <main
      className={
        showSidebar
          ? "md:ml-64 p-4 md:p-8 pt-16 md:pt-8"
          : "p-4 md:p-8"
      }
    >
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Key Metrics skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto mb-1" />
                <div className="flex items-center justify-center">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-3 ml-1 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>

      {/* Bottom Row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock levels skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
          <div className="mt-6 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  const pathname = usePathname();

  // Don't show sidebar on public routes
  const showSidebar = !["/", "/sign-in", "/sign-up"].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {showSidebar && <LoadingMobileHeader />}
      {showSidebar && <LoadingSidebar />}
      <MainContentSkeleton showSidebar={showSidebar} />
    </div>
  );
}
