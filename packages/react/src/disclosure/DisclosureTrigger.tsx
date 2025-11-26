import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Cover } from "../cover";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { useDisclosureContext } from "./DisclosureContext";
import * as styles from "./DisclosureTrigger.css";

const Slot = createSlot("@optiaxiom/react/DisclosureTrigger");

export type DisclosureTriggerProps = BoxProps<
  "div",
  {
    /**
     * Display content after the button.
     */
    addonAfter?: ReactNode;
    /**
     * Display content before the button.
     */
    addonBefore?: ReactNode;
    /**
     * Control which side to place the chevron.
     */
    chevronPosition?: "end" | "start";
  }
>;

/**
 * @group Disclosure
 */
export const DisclosureTrigger = forwardRef<
  HTMLDivElement,
  DisclosureTriggerProps
>(
  (
    {
      addonAfter,
      addonBefore,
      asChild,
      chevronPosition = "start",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    useDisclosureContext("@optiaxiom/react/DisclosureTrigger");

    return asChild ? (
      <Slot className={className} ref={ref} {...props}>
        <RadixCollapsible.Trigger asChild>{children}</RadixCollapsible.Trigger>
      </Slot>
    ) : (
      <Flex ref={ref} {...styles.root({}, className)} {...props}>
        {addonBefore}

        <Flex asChild {...styles.trigger()}>
          <Cover asChild>
            <RadixCollapsible.Trigger>
              {chevronPosition === "start" && (
                <Box asChild {...styles.icon({ chevronPosition })}>
                  <IconAngleRight />
                </Box>
              )}
              <Box flex="1" overflow="hidden">
                {children}
              </Box>
              {chevronPosition === "end" && (
                <Box asChild {...styles.icon({ chevronPosition })}>
                  <IconAngleLeft />
                </Box>
              )}
            </RadixCollapsible.Trigger>
          </Cover>
        </Flex>

        {addonAfter}
      </Flex>
    );
  },
);

DisclosureTrigger.displayName = "@optiaxiom/react/DisclosureTrigger";
