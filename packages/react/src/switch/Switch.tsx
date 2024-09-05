import * as RadixSwitch from "@radix-ui/react-switch";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ControlBase } from "../control-base";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import * as styles from "./Switch.css";

type SwitchProps = BoxProps<
  typeof RadixSwitch.Root,
  {
    endDecorator?: ReactNode;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  ({ children, className, endDecorator, id, size = "md", ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <ControlBase
        control={
          <Box asChild {...styles.root()}>
            <RadixSwitch.Root {...restProps}>
              <Box asChild {...styles.thumb({ size })}>
                <RadixSwitch.Thumb />
              </Box>
            </RadixSwitch.Root>
          </Box>
        }
        endDecorator={endDecorator}
        id={id}
        ref={ref}
        {...styles.container({}, className)}
        {...sprinkleProps}
      >
        <Tooltip auto content={children}>
          <Text as="span" truncate>
            {children}
          </Text>
        </Tooltip>
      </ControlBase>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
