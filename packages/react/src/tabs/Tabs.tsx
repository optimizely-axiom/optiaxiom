import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Tabs.css";

type TabsProps = BoxProps<typeof RadixTabs.Root>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.tabs()} {...sprinkleProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          {children}
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
