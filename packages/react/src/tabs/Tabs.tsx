import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import { TabsContextProvider } from "../tabs-context";
import * as styles from "./Tabs.css";

type TabsProps = BoxProps<
  typeof RadixTabs.Root,
  { appearance?: "primary" | "secondary" }
>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ appearance = "primary", children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.tabs({}, className)} {...sprinkleProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          <TabsContextProvider appearance={appearance}>
            {children}
          </TabsContextProvider>
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
