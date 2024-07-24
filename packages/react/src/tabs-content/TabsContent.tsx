import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type TabsContentProps = BoxProps<
  "div",
  ComponentPropsWithRef<typeof RadixTabs.TabsContent>
>;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild ref={ref}>
        <RadixTabs.TabsContent {...props}>{children}</RadixTabs.TabsContent>
      </Box>
    );
  },
);

TabsContent.displayName = "@optiaxiom/react/TabsContent";
