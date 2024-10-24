import * as RadixRadio from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { extractSprinkles, mapResponsiveValue } from "../sprinkles";

type RadioGroupProps = BoxProps<typeof RadixRadio.RadioGroup>;

const mapGapToOrientation = {
  column: "sm",
  "column-reverse": "sm",
  row: "md",
  "row-reverse": "md",
} as const;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, flexDirection, orientation, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        asChild
        flexDirection={
          flexDirection ?? (orientation === "vertical" ? "column" : "row")
        }
        gap={mapResponsiveValue(
          flexDirection ?? (orientation === "vertical" ? "column" : "row"),
          (value) => mapGapToOrientation[value],
        )}
        {...sprinkleProps}
      >
        <RadixRadio.RadioGroup
          orientation={orientation}
          ref={ref}
          {...restProps}
        >
          {children}
        </RadixRadio.RadioGroup>
      </Flex>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
