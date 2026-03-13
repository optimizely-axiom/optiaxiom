import { theme } from "@optiaxiom/globals";
import { Box } from "@optiaxiom/react";
import { get } from "jsonpointer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import * as styles from "./ProteusChart.css";
import { ProteusChartTooltipContent } from "./ProteusChartTooltipContent";

type Series = {
  dataKey: string;
  name?: string;
};

const DEFAULT_COLORS = ["#096DD9", "#E59700", "#38C56C", "#D1D8DE"];

const getColor = (index: number) =>
  DEFAULT_COLORS[index % DEFAULT_COLORS.length];

export const ProteusChart = ({
  data,
  series,
  type,
  xAxisKey,
}: {
  data: Record<string, unknown>[];
  series: Series[];
  type: "bar" | "line";
  xAxisKey?: string;
}) => {
  const ChartComponent = type === "bar" ? BarChart : LineChart;
  const Chart = type === "bar" ? Bar : Line;
  return (
    <Box asChild {...styles.chart()}>
      <ResponsiveContainer aspect={16 / 9} width="100%">
        <ChartComponent data={data}>
          <CartesianGrid
            stroke="#E0E0E0"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey={(row: Record<string, unknown>) => get(row, "/" + xAxisKey)}
            minTickGap={32}
            padding={{ left: 16, right: 16 }}
            tick={{ fill: theme.colors["fg.secondary"] }}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            axisLine={{ stroke: "#CBD5E1" }}
            minTickGap={32}
            tick={{ fill: theme.colors["fg.secondary"] }}
            tickFormatter={(value) =>
              new Intl.NumberFormat(undefined, {
                compactDisplay: "short",
                notation: "compact",
              }).format(value)
            }
            tickMargin={8}
            width="auto"
          />
          <Tooltip content={ProteusChartTooltipContent} cursor={false} />
          {series.map((s, i) => (
            <Chart
              dataKey={(row: Record<string, unknown>) =>
                get(row, "/" + s.dataKey) as number
              }
              dot={false}
              fill={getColor(i)}
              key={i}
              name={s.name ?? s.dataKey}
              radius={type === "bar" ? 4 : undefined}
              type="natural"
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </Box>
  );
};

ProteusChart.displayName = "@optiaxiom/react/ProteusChart";
