import type { ComponentPropsWithoutRef } from "react";

import * as Progress from "@radix-ui/react-progress";
import React from "react";

import { Box } from "../box";

type ProgressBarProps = ComponentPropsWithoutRef<typeof Progress.Root>;

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof Progress.Root>,
  ProgressBarProps
>(({ className, value, ...props }, ref) => {
  const widthPercentage = ((value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box
      asChild
      bg="white"
      border="1"
      className={className}
      h="6"
      overflow="hidden"
      position="relative"
      w="1/2"
    >
      <Progress.Root ref={ref} {...props}>
        <Box asChild bg="bg.brand.solid" h="full" rounded="md" transition="all">
          <Progress.Indicator style={{ width: `${widthPercentage}%` }} />
        </Box>
      </Progress.Root>
    </Box>
  );
});

ProgressBar.displayName = "@optiaxiom/react/ProgressBar";
