import * as RadixRadio from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type RadioGroupProps = BoxProps<typeof RadixRadio.RadioGroup>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild gap="sm" {...sprinkleProps}>
        <RadixRadio.RadioGroup ref={ref} {...restProps}>
          {children}
        </RadixRadio.RadioGroup>
      </Flex>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
