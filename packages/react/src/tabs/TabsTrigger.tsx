import { createSlot } from "@radix-ui/react-slot";
import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import { decorateChildren } from "../utils";
import * as styles from "./TabsTrigger.css";

const Slot = createSlot("@optiaxiom/react/TabsTrigger");

export type TabsTriggerProps = BoxProps<
  typeof RadixTabs.Trigger,
  {
    /**
     * Display content inside the button after `children`.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the button before `children`.
     */
    addonBefore?: ReactNode;
  }
>;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    { addonAfter, addonBefore, asChild, children, className, value, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.trigger({}, className)} {...boxProps}>
        <RadixTabs.Trigger asChild ref={ref} value={value} {...restProps}>
          <Comp>
            {decorateChildren({ asChild, children }, (children) => (
              <Flex {...styles.content()}>
                {addonBefore}

                {children}

                {addonAfter}
              </Flex>
            ))}
          </Comp>
        </RadixTabs.Trigger>
      </Box>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
