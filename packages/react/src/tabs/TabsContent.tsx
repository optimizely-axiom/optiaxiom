import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";

export type TabsContentProps = ExcludeProps<
  BoxProps<typeof RadixTabs.TabsContent>,
  "forceMount"
>;

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
