import * as RadixSlider from "@radix-ui/react-slider";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
type SliderTrackProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixSlider.Track>
>;

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixSlider.Track ref={ref} {...props}>
          {children}
        </RadixSlider.Track>
      </Flex>
    );
  },
);

SliderTrack.displayName = "@optiaxiom/react/SliderTrack";
