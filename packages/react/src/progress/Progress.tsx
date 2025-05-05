import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Progress.css";

export type ProgressProps = BoxProps<typeof ProgressPrimitive.Root> &
  styles.ProgressVariants;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, intent = "primary", ...props }, ref) => {
    const widthPercentage =
      ((props.value ?? 0) / (props.max ?? DEFAULT_MAX)) * 100;
    const isValidValue =
      typeof props.value !== "undefined" &&
      props.value !== null &&
      props.value >= 0 &&
      props.value <= (props.max ?? DEFAULT_MAX);

    return (
      <Box asChild {...styles.progress({}, className)} {...props}>
        <ProgressPrimitive.Root ref={ref}>
          {isValidValue && (
            <Box
              asChild
              style={{
                width: `${widthPercentage}%`,
              }}
              {...styles.indicator({
                intent,
              })}
            >
              <ProgressPrimitive.Indicator />
            </Box>
          )}
        </ProgressPrimitive.Root>
      </Box>
    );
  },
);

const DEFAULT_MAX = 100;
Progress.displayName = "@optiaxiom/react/Progress";
