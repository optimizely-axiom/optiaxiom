import * as RadixSlider from "@radix-ui/react-slider";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
type SliderProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixSlider.Root>
>;

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixSlider.Root ref={ref} {...props}>
          {children}
        </RadixSlider.Root>
      </Flex>
    );
  },
);

Slider.displayName = "@optiaxiom/react/Slider";
