import type { TooltipContentProps } from "recharts";

import { Box, Group } from "@optiaxiom/react";
import { useRef } from "react";

import { applyFormatter } from "../proteus-document/getProteusValue";
import { useProteusChartContainer } from "./ProteusChartContext";
import * as styles from "./ProteusChartTooltipContent.css";

const OFFSET = 10;

export function ProteusChartTooltipContent({
  active,
  coordinate,
  label,
  payload,
}: TooltipContentProps) {
  const containerRef = useProteusChartContainer();
  const ref = useRef<HTMLDivElement>(null);

  if (!active || !payload?.length) {
    return null;
  }

  const wrapperRect = containerRef?.current
    ?.querySelector(".recharts-wrapper")
    ?.getBoundingClientRect();
  const tooltipRect = ref.current?.getBoundingClientRect();

  const cx = coordinate?.x ?? 0;
  const cy = coordinate?.y ?? 0;
  const th = tooltipRect?.height ?? 0;

  const translateX = cx + OFFSET;
  const translateY = cy - th / 2;

  return (
    <Box
      ref={ref}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${(wrapperRect?.left ?? 0) + translateX + window.scrollX}px, ${(wrapperRect?.top ?? 0) + translateY + window.scrollY}px)`,
      }}
      {...styles.tooltip()}
    >
      {label && <Box fontWeight="500">{label}</Box>}
      <div>
        {payload
          .filter((item) => item.type !== "none")
          .map((item, i) => (
            <Box
              alignItems="center"
              display="flex"
              gap="8"
              justifyContent="space-between"
              key={i}
            >
              <Group gap="8">
                <Box
                  flex="none"
                  rounded="xs"
                  size="10"
                  style={{ backgroundColor: item.color }}
                />
                <Box color="fg.tertiary">
                  {item.name ?? String(item.dataKey)}
                </Box>
              </Group>
              <Box {...styles.value()}>
                {applyFormatter(item.value, "Number") as string}
              </Box>
            </Box>
          ))}
      </div>
    </Box>
  );
}
