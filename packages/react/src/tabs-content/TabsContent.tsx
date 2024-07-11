import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";

type TabsContentProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
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
