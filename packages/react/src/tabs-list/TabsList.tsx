import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, useContext } from "react";

import { Box, type BoxProps } from "../box";
import { TabsContext } from "../tabs-context";
import * as styles from "./TabsList.css";

type TabsListProps = BoxProps<typeof RadixTabs.List>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, ...props }, ref) => {
    const { appearance } = useContext(TabsContext);

    return (
      <Box asChild {...styles.list({ appearance })}>
        <RadixTabs.List ref={ref} {...props}>
          {children}
        </RadixTabs.List>
      </Box>
    );
  },
);

TabsList.displayName = "@optiaxiom/react/TabsList";
