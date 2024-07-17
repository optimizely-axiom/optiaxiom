import * as RadixSwitch from "@radix-ui/react-switch";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Switch.css";

type SwitchProps = BoxProps<
  typeof RadixSwitch.Root,
  {
    endDecorator?: ReactNode;
    readonly?: boolean;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      children,
      className,
      disabled,
      endDecorator,
      readonly,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <ControlBase
        disabled={disabled}
        endDecorator={
          endDecorator && (
            <Box asChild ml="48" pl={size === "lg" ? "4" : undefined}>
              {endDecorator}
            </Box>
          )
        }
        label={children}
        readonly={readonly}
        ref={ref}
        {...sprinkleProps}
      >
        <Box asChild {...styles.root()}>
          <RadixSwitch.Root {...restProps}>
            <Box asChild {...styles.thumb({ size })}>
              <RadixSwitch.Thumb />
            </Box>
          </RadixSwitch.Root>
        </Box>
      </ControlBase>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
