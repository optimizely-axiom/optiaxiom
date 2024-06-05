import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";

type ProgressBarProps = ComponentPropsWithRef<typeof ProgressPrimitive.Root>;

export const ProgressBar = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>((props, ref) => {
  const widthPercentage = ((props.value ?? 0) / (props.max ?? 100)) * 100;

  return (
    <Box asChild border="1" h="6" overflow="hidden" w="1/2">
      <ProgressPrimitive.Root ref={ref} {...props}>
        <Box
          asChild
          bg="bg.brand.solid"
          h="full"
          rounded="md"
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
