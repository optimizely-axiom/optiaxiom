import { useEffect, useRef, useState } from "react";

import { Box } from "../box";
import { Button } from "../button";
import { useCalendarContext } from "./CalendarContext";
import * as styles from "./CalendarGrid.css";

export type CalendarGridProps = {
  /**
   * Handler called when page is navigated.
   */
  onPageChange: (index: number) => void;
  /**
   * Handler called when cell is clicked.
   */
  onValueChange: (index: number) => void;
  /**
   * The cells to display in the grid
   */
  options: Array<number | readonly [short: string, long: string]>;
  /**
   * Currently selected value.
   */
  value: number;
};

const grid = [0, 1, 2].map((row) => [0, 1, 2, 3].map((col) => row * 4 + col));
const intentMap: Record<string, number> = {
  ArrowDown: 4,
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -4,
};

export function CalendarGrid({
  onPageChange,
  onValueChange,
  options,
  value,
}: CalendarGridProps) {
  const { month, view } = useCalendarContext("@optiaxiom/react/CalendarGrid");

  const [highlightedIndex, setHighlightedIndex] = useState(value);
  const cellsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    cellsRef.current[highlightedIndex]?.focus();
  }, [highlightedIndex]);

  const ref = useRef<HTMLDivElement>(null);
  const lastMonthRef = useRef<Date>();
  const lastViewRef = useRef<string>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (lastMonthRef.current && view === lastViewRef.current) {
      ref.current.animate(
        [
          {
            opacity: 0,
            translate: month > lastMonthRef.current ? "20px" : "-20px",
          },
          {
            opacity: 1,
            translate: "0px",
          },
        ],
        {
          duration: 150,
        },
      );
    } else {
      ref.current.animate(
        [
          {
            opacity: 0,
            scale: lastViewRef.current === "year" ? 1.03 : 0.97,
          },
          {
            opacity: 1,
            scale: 1,
          },
        ],
        {
          duration: 150,
        },
      );
    }
    lastMonthRef.current = month;
    lastViewRef.current = view;
  }, [month, view]);

  return (
    <Box key={view} ref={ref} role="grid" {...styles.grid()}>
      {grid.map((row, i) => (
        <Box display="flex" flex="1" gap="2" key={i} role="row">
          {row.map((index, j) => (
            <Box display="flex" flex="1" key={j} role="gridcell">
              <Button
                appearance="subtle"
                aria-label={
                  Array.isArray(options[index]) ? options[index][1] : undefined
                }
                h="auto"
                justifyContent="center"
                onClick={() => {
                  onValueChange(index);
                }}
                onKeyDown={(event) => {
                  let intent = highlightedIndex + (intentMap[event.key] ?? 0);
                  if (intent === highlightedIndex) {
                    return;
                  }

                  if (intent < 0) {
                    onPageChange(-1);
                    intent += 12;
                  } else if (intent >= 12) {
                    onPageChange(1);
                    intent %= 12;
                  }
                  setHighlightedIndex(intent);
                }}
                px="0"
                ref={(node) => (cellsRef.current[index] = node)}
                tabIndex={highlightedIndex === index ? 0 : -1}
                w="full"
              >
                {Array.isArray(options[index])
                  ? options[index][0]
                  : options[index]}
              </Button>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

CalendarGrid.displayName = "@optiaxiom/react/CalendarGrid";
