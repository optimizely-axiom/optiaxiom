import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { IconCheck } from "../icons/IconCheck";
import { IconMinus } from "../icons/IconMinus";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Checkbox.css";

type CheckboxProps = BoxProps<
  typeof RadixCheckbox.Root,
  {
    endDecorator?: ReactNode;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, className, endDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <ControlBase
        endDecorator={
          endDecorator && (
            <Box asChild ml="lg">
              {endDecorator}
            </Box>
          )
        }
        label={children}
        ref={ref}
        {...sprinkleProps}
      >
        <Box asChild {...styles.checkbox()}>
          <RadixCheckbox.Root {...restProps}>
            <Box asChild {...styles.indicator()}>
              <RadixCheckbox.Indicator>
                <Box asChild {...styles.iconChecked()}>
                  <IconCheck />
                </Box>
                <Box asChild {...styles.iconIndeterminate()}>
                  <IconMinus />
                </Box>
              </RadixCheckbox.Indicator>
            </Box>
          </RadixCheckbox.Root>
        </Box>
      </ControlBase>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
