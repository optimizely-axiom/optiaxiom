import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";

type TabsProps = BoxProps<"div", ComponentPropsWithRef<typeof RadixTabs.Root>>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixTabs.Root ref={ref} {...props}>
          {children}
        </RadixTabs.Root>
      </Flex>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
