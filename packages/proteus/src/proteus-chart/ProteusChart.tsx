import { Box, theme } from "@optiaxiom/react";
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

export type ProteusChartProps = {
  /**
   * Chart data records, either inline, a ProteusValue reference, or a
   * ProteusZip transformation
   */
  data: Record<string, unknown>[];
  /**
   * Chart layout direction
   */
  layout?: "horizontal" | "vertical";
  /**
   * Data series configuration
   */
  series: Series[];
  /**
   * Chart type
   */
  type: "bar" | "line";
  /**
   * Key in data records for x-axis labels
   */
  xAxisKey?: string;
};

export const ProteusChart = ({
  data,
  layout = "horizontal",
  series,
  type,
  xAxisKey,
}: ProteusChartProps) => {
  const isVertical = layout === "vertical";
  const ChartComponent = type === "bar" ? BarChart : LineChart;
  const Chart = type === "bar" ? Bar : Line;
  const CategoryAxis = isVertical ? YAxis : XAxis;
  const ValueAxis = isVertical ? XAxis : YAxis;
  return (
    <Box asChild {...styles.chart()}>
      <ResponsiveContainer aspect={16 / 9} width="100%">
        <ChartComponent data={data} layout={layout}>
          <CartesianGrid
            stroke="#E0E0E0"
            strokeDasharray="4 4"
            vertical={false}
          />
          <CategoryAxis
            axisLine={false}
            dataKey={(row: Record<string, unknown>) => get(row, "/" + xAxisKey)}
            padding={{ left: 16, right: 16 }}
            tick={{ fill: theme.colors["fg.secondary"] }}
            tickLine={false}
            tickMargin={8}
            type="category"
            width={isVertical ? "auto" : undefined}
          />
          <ValueAxis
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
            type="number"
            width={isVertical ? undefined : "auto"}
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

ProteusChart.displayName = "@optiaxiom/proteus/ProteusChart";
