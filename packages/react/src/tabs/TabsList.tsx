import { Tabs as RadixTabs } from "radix-ui";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TabsList.css";

type TabsListProps = BoxProps<typeof RadixTabs.List>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box asChild {...styles.list({}, className)} {...props}>
        <RadixTabs.List ref={ref}>{children}</RadixTabs.List>
      </Box>
    );
  },
);

TabsList.displayName = "@optiaxiom/react/TabsList";
