import * as RadixSlider from "@radix-ui/react-slider";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
type SliderThumbProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixSlider.Thumb>
>;

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixSlider.Thumb ref={ref} {...props}>
          {children}
        </RadixSlider.Thumb>
      </Flex>
    );
  },
);

SliderThumb.displayName = "@optiaxiom/react/SliderThumb";
