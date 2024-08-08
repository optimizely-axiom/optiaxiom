import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import { TabsContext } from "../tabs-context";
import * as styles from "./Tabs.css";

type TabsProps = BoxProps<
  typeof RadixTabs.Root,
  { appearance: "primary" | "secondary" }
>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ appearance = "primary", children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.tabs()} {...sprinkleProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          <TabsContext.Provider value={{ appearance }}>
            {children}
          </TabsContext.Provider>
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
