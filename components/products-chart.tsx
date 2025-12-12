"use client";

import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  week: string;
  products: number;
}

export default function ProductChart({ data }: { data: ChartData[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
          <XAxis
            dataKey="week"
            stroke={isDark ? "#d1d5db" : "#666"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? "#d1d5db" : "#666"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 2 }}
            activeDot={{ fill: "#8b5cf6", r: 4 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "white",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: isDark ? "#e5e7eb" : "#111827",
            }}
            labelStyle={{
              color: isDark ? "#e5e7eb" : "#374151",
              fontWeight: "500",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}