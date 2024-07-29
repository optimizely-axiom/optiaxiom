import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type TabsContentProps = BoxProps<typeof RadixTabs.TabsContent>;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild flex="1" ref={ref} {...sprinkleProps}>
        <RadixTabs.TabsContent {...restProps}>{children}</RadixTabs.TabsContent>
      </Box>
    );
  },
);

TabsContent.displayName = "@optiaxiom/react/TabsContent";
