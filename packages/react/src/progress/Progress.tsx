import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";

type ProgressProps = ExtendProps<
  ComponentPropsWithRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithRef<typeof Box>
>;

export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>((props, ref) => {
  const widthPercentage =
    ((props.value ?? 0) / (props.max ?? DEFAULT_MAX)) * 100;
  const isValidValue =
    props.value &&
    props.value >= 0 &&
    props.value <= (props.max ?? DEFAULT_MAX);

  return (
    <Box asChild h="6" rounded="lg" {...props}>
      <ProgressPrimitive.Root ref={ref}>
        {isValidValue && (
          <Box
            asChild
            bg="bg.brand.solid"
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
});

const DEFAULT_MAX = 100;
Progress.displayName = "@optiaxiom/react/Progress";
