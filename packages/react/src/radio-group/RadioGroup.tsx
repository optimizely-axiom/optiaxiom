import * as RadixRadio from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type RadioGroupProps = BoxProps<typeof RadixRadio.RadioGroup>;

const mapDirectionToOrientation = {
  column: "vertical",
  row: "horizontal",
} as const;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, flexDirection = "column", ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild flexDirection={flexDirection} gap="sm" {...sprinkleProps}>
        <RadixRadio.RadioGroup
          orientation={
            flexDirection === "row" || flexDirection === "column"
              ? mapDirectionToOrientation[flexDirection]
              : undefined
          }
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
