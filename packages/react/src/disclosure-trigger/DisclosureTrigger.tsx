import * as RadixCollapsible from "@radix-ui/react-collapsible";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Box, type BoxProps } from "../box";
import { Cover } from "../cover";
import { useDisclosureContext } from "../disclosure-context";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import * as styles from "./DisclosureTrigger.css";

type DisclosureTriggerProps = BoxProps<
  "div",
  Pick<ComponentPropsWithoutRef<typeof Cover>, "overlay"> & {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    chevronPosition?: "end" | "start";
  }
>;

export const DisclosureTrigger = forwardRef<
  HTMLDivElement,
  DisclosureTriggerProps
>(
  (
    {
      addonAfter,
      addonBefore,
      chevronPosition = "start",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    useDisclosureContext("DisclosureTrigger");

    return (
      <Flex ref={ref} {...styles.trigger({}, className)} {...props}>
        {addonBefore}

        <Flex
          asChild
          flexDirection="row"
          fontWeight="inherit"
          gap="4"
          rounded="md"
          textAlign="start"
          w="full"
        >
          <Cover asChild overlay>
            <RadixCollapsible.Trigger>
              {chevronPosition === "start" && (
                <Box asChild {...styles.icon({ chevronPosition })}>
                  <IconAngleRight />
                </Box>
              )}
              <Box flex="1">{children}</Box>
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
