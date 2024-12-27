import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type TabsContentProps = BoxProps<typeof RadixTabs.TabsContent>;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, ...props }, ref) => {
    return (
      <Box asChild flex="1" ref={ref} {...props}>
        <RadixTabs.TabsContent value={value}>{children}</RadixTabs.TabsContent>
      </Box>
    );
  },
);

TabsContent.displayName = "@optiaxiom/react/TabsContent";
