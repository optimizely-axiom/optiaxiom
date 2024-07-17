import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Checkbox.css";
import { IconChecked } from "./icons-svg/IconChecked";
import { IconIndeterminate } from "./icons-svg/IconIndeterminate";

type CheckboxProps = BoxProps<
  typeof RadixCheckbox.Root,
  {
    endDecorator?: ReactNode;
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    { children, className, disabled, endDecorator, readonly, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <ControlBase
        disabled={disabled}
        endDecorator={
          endDecorator && (
            <Box asChild ml="lg">
              {endDecorator}
            </Box>
          )
        }
        label={children}
        readonly={readonly}
        ref={ref}
        {...sprinkleProps}
      >
        <Box asChild {...styles.checkbox()}>
          <RadixCheckbox.Root {...restProps}>
            <Box asChild {...styles.indicator()}>
              <RadixCheckbox.Indicator>
                <Box asChild {...styles.iconChecked()}>
                  <IconChecked />
                </Box>
                <Box asChild {...styles.iconIndeterminate()}>
                  <IconIndeterminate />
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
