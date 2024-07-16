import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type RadioGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixRadio.RadioGroup>,
  {
    readonly?: boolean;
  }
>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, disabled, readonly, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild gap="sm" {...sprinkleProps}>
        <RadixRadio.RadioGroup
          disabled={disabled || readonly}
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
