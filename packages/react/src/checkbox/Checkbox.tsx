import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { IconCheck } from "../icons/IconCheck";
import { IconMinus } from "../icons/IconMinus";
import * as styles from "./Checkbox.css";

type CheckboxProps = BoxProps<
  typeof RadixCheckbox.Root,
  {
    description?: ReactNode;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, defaultChecked, description, id, ...props }, ref) => {
    return (
      <ControlBase
        control={
          <Box asChild {...styles.checkbox()}>
            <RadixCheckbox.Root defaultChecked={defaultChecked}>
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
        }
        description={description}
        id={id}
        ref={ref}
        {...props}
      >
        {children}
      </ControlBase>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
