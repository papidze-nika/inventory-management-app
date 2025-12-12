"use client";

import { useTheme } from "next-themes";
import { useId } from "react";

type ThemeChoice = "light" | "dark" | "system";

export default function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const groupId = useId();

  const currentTheme = (theme ?? "system") as ThemeChoice;

  const options: Array<{
    value: ThemeChoice;
    title: string;
    description: string;
  }> = [
    {
      value: "system",
      title: "System",
      description: `Match your OS setting (currently: ${resolvedTheme ?? "—"}).`,
    },
    { value: "light", title: "Light", description: "Always use light theme." },
    { value: "dark", title: "Dark", description: "Always use dark theme." },
  ];

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Theme
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const checked = currentTheme === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={`${groupId}-${opt.value}`}
              className={
                "cursor-pointer rounded-lg border p-4 transition-colors " +
                (checked
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950/40"
                  : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800")
              }
            >
              <div className="flex items-start gap-3">
                <input
                  id={`${groupId}-${opt.value}`}
                  type="radio"
                  name={groupId}
                  value={opt.value}
                  checked={checked}
                  onChange={() => setTheme(opt.value)}
                  className="mt-1"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {opt.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {opt.description}
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
