import * as RadixSlider from "@radix-ui/react-slider";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
type SliderRangeProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixSlider.Range>
>;

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixSlider.Range ref={ref} {...props}>
          {children}
        </RadixSlider.Range>
      </Flex>
    );
  },
);

SliderRange.displayName = "@optiaxiom/react/SliderRange";
