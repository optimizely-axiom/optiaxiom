import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";

type ProgressBarProps = ExtendProps<
  ComponentPropsWithRef<typeof ProgressPrimitive.Root>,
  Pick<ComponentPropsWithRef<typeof Box>, "w">
>;

export const ProgressBar = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ w = "2/3", ...props }, ref) => {
  const widthPercentage = ((props.value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box asChild border="1" h="6" overflow="hidden" w={w}>
      <ProgressPrimitive.Root ref={ref} {...props}>
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
      </ProgressPrimitive.Root>
    </Box>
  );
});

ProgressBar.displayName = "@optiaxiom/react/ProgressBar";
