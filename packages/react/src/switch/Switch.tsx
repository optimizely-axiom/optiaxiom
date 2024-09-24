import * as RadixSwitch from "@radix-ui/react-switch";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import * as styles from "./Switch.css";

type SwitchProps = BoxProps<
  typeof RadixSwitch.Root,
  {
    description?: ReactNode;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  ({ children, className, description, id, size = "md", ...props }, ref) => {
    return (
      <ControlBase
        control={
          <Box asChild {...styles.root()}>
            <RadixSwitch.Root>
              <Box asChild {...styles.thumb({ size })}>
                <RadixSwitch.Thumb />
              </Box>
            </RadixSwitch.Root>
          </Box>
        }
        description={description}
        id={id}
        ref={ref}
        {...styles.container({}, className)}
        {...props}
      >
        <Tooltip auto content={children}>
          <Text asChild truncate>
            <span>{children}</span>
          </Text>
        </Tooltip>
      </ControlBase>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
