import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Range.css";

export type RangeProps = BoxProps<typeof SliderPrimitive.Root>;

export const Range = forwardRef<HTMLSpanElement, RangeProps>(
  ({ className, disabled, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...boxProps} {...styles.root({}, className)}>
        <SliderPrimitive.Root
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          ref={ref}
          {...restProps}
        >
          <Box asChild {...styles.track()}>
            <SliderPrimitive.Track>
              <Box asChild {...styles.range()}>
                <SliderPrimitive.Range />
              </Box>
            </SliderPrimitive.Track>
          </Box>

          <Box asChild {...styles.thumb()}>
            <SliderPrimitive.Thumb />
          </Box>
        </SliderPrimitive.Root>
      </Box>
    );
  },
);

Range.displayName = "@optiaxiom/react/Range";
