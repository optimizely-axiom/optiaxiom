import * as RadixRadio from "@radix-ui/react-radio-group";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import * as styles from "./RadioGroupItem.css";

type RadioGroupItemProps = BoxProps<
  typeof RadixRadio.Item,
  {
    description?: ReactNode;
  }
>;

export const RadioGroupItem = forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ children, description, id, value, ...props }, ref) => {
    return (
      <ControlBase
        control={
          <Box asChild {...styles.item()}>
            <RadixRadio.Item value={value}>
              <Box asChild {...styles.indicator()}>
                <RadixRadio.Indicator />
              </Box>
            </RadixRadio.Item>
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

RadioGroupItem.displayName = "@optiaxiom/react/RadioGroupItem";
