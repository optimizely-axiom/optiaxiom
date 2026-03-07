import { theme } from "@optiaxiom/globals";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { Box } from "../box";
import * as styles from "./ProteusChart.css";
import { ProteusChartTooltipContent } from "./ProteusChartTooltipContent";

type Series = {
  color?: string;
  dataKey: string;
  labelKey?: string;
  name?: string;
};

const DEFAULT_COLORS = ["#096DD9", "#E59700", "#38C56C", "#D1D8DE"];

const getColor = (series: Series, index: number) =>
  series.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];

export const ProteusChart = ({
  data,
  series,
  xAxisKey,
}: {
  data: Record<string, unknown>[];
  series: Series[];
  type: "bar";
  xAxisKey?: string;
}) => {
  return (
    <Box asChild {...styles.chart()}>
      <ResponsiveContainer aspect={16 / 9} width="100%">
        <BarChart data={data} margin={{ top: 20 }}>
          <CartesianGrid
            stroke="#E0E0E0"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey={xAxisKey}
            tick={{ fill: theme.colors["fg.secondary"] }}
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip content={ProteusChartTooltipContent} cursor={false} />
          {series.map((s, i) => (
            <Bar
              dataKey={s.dataKey}
              fill={getColor(s, i)}
              key={s.dataKey}
              name={s.name ?? s.dataKey}
              radius={[4, 4, 0, 0]}
            >
              {s.labelKey && (
                <LabelList
                  dataKey={s.labelKey}
                  fill={theme.colors["fg.secondary"]}
                  offset={12}
                  position="top"
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

ProteusChart.displayName = "@optiaxiom/react/ProteusChart";
