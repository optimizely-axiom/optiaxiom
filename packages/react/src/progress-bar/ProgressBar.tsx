import type { ComponentPropsWithRef } from "react";

import * as Progress from "@radix-ui/react-progress";
import React from "react";

import { Box } from "../box";
import {
  type Recipe,
  progressIndicatorRecipe,
  progressRootRecipe,
} from "./ProgressBar.recipe";

type ProgressBarProps = ComponentPropsWithRef<typeof Progress.Root> & Recipe;

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof Progress.Root>,
  ProgressBarProps
>(({ size = "default", variant = "default", ...props }, ref) => {
  const widthPercentage = ((props.value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box {...progressRootRecipe({ size, variant })} asChild>
      <Progress.Root ref={ref} {...props}>
        <Box
          {...progressIndicatorRecipe({ variant })}
          asChild
          style={{ width: `${widthPercentage}%` }}
        >
          <Progress.Indicator />
        </Box>
      </Progress.Root>
    </Box>
  );
});

ProgressBar.displayName = "@optiaxiom/react/ProgressBar";
