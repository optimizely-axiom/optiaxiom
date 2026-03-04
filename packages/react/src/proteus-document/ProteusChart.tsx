import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useProteusValue } from "./useProteusValue";

type CartesianChartProps = {
  chartData: Record<string, unknown>[];
  height?: number;
  series: Series[];
  width?: number;
  xAxisKey?: string;
};

type Series = { color?: string; dataKey: string; name?: string };

const DEFAULT_COLORS = [
  "var(--ax-colors-bg-accent)",
  "var(--ax-colors-bg-success)",
  "var(--ax-colors-bg-warning)",
  "var(--ax-colors-bg-error)",
];

const getColor = (series: Series, index: number) =>
  series.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];

const cartesianElements = (xAxisKey?: string) => [
  <CartesianGrid key="grid" strokeDasharray="3 3" />,
  <XAxis angle={-45} dataKey={xAxisKey} height={70} key="x" textAnchor="end" />,
  <YAxis key="y" />,
  <Tooltip key="tooltip" />,
  <Legend key="legend" verticalAlign="top" />,
];

const ProteusBarChart = ({
  chartData,
  height,
  series,
  width,
  xAxisKey,
}: CartesianChartProps) => (
  <BarChart data={chartData} height={height} width={width}>
    {cartesianElements(xAxisKey)}
    {series.map((s, i) => (
      <Bar
        dataKey={s.dataKey}
        fill={getColor(s, i)}
        key={s.dataKey}
        name={s.name ?? s.dataKey}
      />
    ))}
  </BarChart>
);

const ProteusLineChart = ({
  chartData,
  height,
  series,
  width,
  xAxisKey,
}: CartesianChartProps) => (
  <LineChart data={chartData} height={height} width={width}>
    {cartesianElements(xAxisKey)}
    {series.map((s, i) => (
      <Line
        dataKey={s.dataKey}
        key={s.dataKey}
        name={s.name ?? s.dataKey}
        stroke={getColor(s, i)}
        type="monotone"
      />
    ))}
  </LineChart>
);

const ProteusAreaChart = ({
  chartData,
  height,
  series,
  width,
  xAxisKey,
}: CartesianChartProps) => (
  <AreaChart data={chartData} height={height} width={width}>
    {cartesianElements(xAxisKey)}
    {series.map((s, i) => (
      <Area
        dataKey={s.dataKey}
        fill={getColor(s, i)}
        key={s.dataKey}
        name={s.name ?? s.dataKey}
        stroke={getColor(s, i)}
        type="monotone"
      />
    ))}
  </AreaChart>
);

const ProteusPieChart = ({
  chartData,
  height,
  series,
  width,
  xAxisKey,
}: CartesianChartProps) => (
  <PieChart height={height} width={width}>
    <Tooltip />
    <Legend verticalAlign="top" />
    {series.map((s) => (
      <Pie
        data={chartData}
        dataKey={s.dataKey}
        key={s.dataKey}
        name={s.name ?? s.dataKey}
        nameKey={xAxisKey}
      >
        {chartData.map((_, index) => (
          <Cell
            fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            key={index}
          />
        ))}
      </Pie>
    ))}
  </PieChart>
);

const CHART_COMPONENTS = {
  area: ProteusAreaChart,
  bar: ProteusBarChart,
  line: ProteusLineChart,
  pie: ProteusPieChart,
};

export const ProteusChart = ({
  data,
  height = 300,
  path,
  series,
  type,
  xAxisKey,
}: {
  data?: Record<string, unknown>[];
  height?: number;
  path?: string;
  series: Series[];
  type: "area" | "bar" | "line" | "pie";
  xAxisKey?: string;
}) => {
  const resolvedData = useProteusValue(path ?? "");
  const chartData = data ?? (Array.isArray(resolvedData) ? resolvedData : []);

  const ChartComponent = CHART_COMPONENTS[type];

  return (
    <ResponsiveContainer height={height} width="100%">
      <ChartComponent
        chartData={chartData}
        series={series}
        xAxisKey={xAxisKey}
      />
    </ResponsiveContainer>
  );
};

ProteusChart.displayName = "@optiaxiom/react/ProteusChart";
