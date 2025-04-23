import { Slot as RadixSlot } from "radix-ui";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Icon } from "../icon";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import * as styles from "./Pill.css";

const Slot = RadixSlot.createSlot("@optiaxiom/react/Pill");

type PillProps = BoxProps<"button", styles.PillVariants>;

export const Pill = forwardRef<HTMLButtonElement, PillProps>(
  ({ asChild, children, className, disabled, size = "sm", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        {...styles.pill({ size }, className)}
        {...boxProps}
      >
        <Comp disabled={disabled} ref={ref} {...restProps}>
          <Text truncate>{children}</Text>

          <Icon asChild h="12" ml="auto">
            <IconX />
          </Icon>
        </Comp>
      </Box>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
