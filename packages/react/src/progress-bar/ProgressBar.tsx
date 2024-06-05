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
>((props, ref) => {
  const widthPercentage = ((props.value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box {...progressRootRecipe()} asChild>
      <Progress.Root ref={ref} {...props}>
        <Box
          {...progressIndicatorRecipe()}
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
