import { Tabs as RadixTabs } from "radix-ui";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<
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
  ({ addonAfter, addonBefore, children, className, value, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.trigger({}, className)} {...boxProps}>
        <RadixTabs.Trigger ref={ref} value={value} {...restProps}>
          <Flex {...styles.content()}>
            {addonBefore}

            {children}

            {addonAfter}
          </Flex>
        </RadixTabs.Trigger>
      </Box>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
