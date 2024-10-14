import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconAngleRight } from "../icons/IconAngleRight";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./DisclosureTrigger.css";

type DisclosureTriggerProps = BoxProps<
  typeof RadixCollapsible.Trigger,
  {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    chevronPosition?: "end" | "start";
  }
>;

export const DisclosureTrigger = forwardRef<
  HTMLButtonElement,
  DisclosureTriggerProps
>(
  (
    { addonAfter, addonBefore, chevronPosition = "start", children, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const startIcon =
      addonBefore ||
      (chevronPosition === "start" && !addonAfter && <IconAngleRight />);
    const endIcon =
      addonAfter || (chevronPosition === "end" && <IconAngleDown />);

    return (
      <Flex asChild {...styles.trigger()} {...sprinkleProps}>
        <RadixCollapsible.Trigger ref={ref} {...restProps}>
          {startIcon && (
            <Box asChild {...styles.icon({ chevronPosition })}>
              {startIcon}
            </Box>
          )}
          <Box flex="1" px="4">
            {children}
          </Box>
          {endIcon && (
            <Box asChild {...styles.icon({ chevronPosition })}>
              {endIcon}
            </Box>
          )}
        </RadixCollapsible.Trigger>
      </Flex>
    );
  },
);

DisclosureTrigger.displayName = "@optiaxiom/react/DisclosureTrigger";
