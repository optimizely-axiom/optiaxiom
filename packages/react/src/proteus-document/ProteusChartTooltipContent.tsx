import type { TooltipContentProps } from "recharts";

import { Box } from "../box";
import { Group } from "../group";
import * as styles from "./ProteusChartTooltipContent.css";

export function ProteusChartTooltipContent({
  active,
  label,
  payload,
}: TooltipContentProps<number | string, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <Box {...styles.tooltip()}>
      {label && <Box fontWeight="500">{label}</Box>}
      <div>
        {payload
          .filter((item) => item.type !== "none")
          .map((item) => (
            <Box
              alignItems="center"
              display="flex"
              gap="8"
              justifyContent="space-between"
              key={item.dataKey}
            >
              <Group gap="8">
                <Box
                  flex="none"
                  rounded="xs"
                  size="10"
                  style={{ backgroundColor: item.color }}
                />
                <Box color="fg.tertiary">{item.name ?? item.dataKey}</Box>
              </Group>
              <Box {...styles.value()}>
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </Box>
            </Box>
          ))}
      </div>
    </Box>
  );
}
