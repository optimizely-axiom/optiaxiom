import { Tabs as RadixTabs } from "radix-ui";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Tabs.css";

type TabsProps = BoxProps<typeof RadixTabs.Root>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.tabs({}, className)} {...boxProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          {children}
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
