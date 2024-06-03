import type { ComponentPropsWithRef } from "react";

import * as Progress from "@radix-ui/react-progress";
import React from "react";

import { Box } from "../box";
import { type Recipe, recipe } from "./ProgressBar.recipe";

type ProgressBarProps = ComponentPropsWithRef<typeof Progress.Root> & Recipe;

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof Progress.Root>,
  ProgressBarProps
>(({ value, ...props }, ref) => {
  const widthPercentage = ((value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box asChild {...recipe(props)}>
      <Progress.Root ref={ref} {...props}>
        <Box asChild bg="bg.brand.solid" h="full" rounded="md" transition="all">
          <Progress.Indicator style={{ width: `${widthPercentage}%` }} />
        </Box>
      </Progress.Root>
    </Box>
  );
});

ProgressBar.displayName = "@optiaxiom/react/ProgressBar";
