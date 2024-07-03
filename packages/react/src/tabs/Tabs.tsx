import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./Tabs.css";

type TabItem = {
  content: ReactNode;
  name: string;
};

type TabsProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  ComponentPropsWithRef<typeof RadixTabs.Root>,
  {
    items: TabItem[];
  }
>;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ items, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild>
        <RadixTabs.Root {...props} ref={ref}>
          <Flex asChild flexDirection="row">
            <RadixTabs.List>
              {items.map((item) => (
                <Box asChild key={item.name} m="0" p="0" {...styles.trigger()}>
                  <RadixTabs.Trigger value={item.name}>
                    {item.name}
                  </RadixTabs.Trigger>
                </Box>
              ))}
            </RadixTabs.List>
          </Flex>
          {items.map((item) => (
            <Box asChild key={item.name} {...styles.content()}>
              <RadixTabs.Content value={item.name}>
                {item.content}
              </RadixTabs.Content>
            </Box>
          ))}
        </RadixTabs.Root>
      </Flex>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
