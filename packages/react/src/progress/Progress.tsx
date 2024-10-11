import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ProgressProps = BoxProps<typeof ProgressPrimitive.Root>;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const widthPercentage =
      ((props.value ?? 0) / (props.max ?? DEFAULT_MAX)) * 100;
    const isValidValue =
      typeof props.value !== "undefined" &&
      props.value !== null &&
      props.value >= 0 &&
      props.value <= (props.max ?? DEFAULT_MAX);

    return (
      <Box asChild bg="border.disabled" h="6" rounded="lg" {...props}>
        <ProgressPrimitive.Root ref={ref}>
          {isValidValue && (
            <Box
              asChild
              bg="bg.accent"
              h="full"
              rounded="lg"
              style={{ width: `${widthPercentage}%` }}
              transition="all"
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
