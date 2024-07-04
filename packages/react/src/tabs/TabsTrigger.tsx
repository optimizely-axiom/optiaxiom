import * as RadixTabs from "@radix-ui/react-tabs";
import { Children, type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./Tabs.css";

type TabsTriggerProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixTabs.TabsTrigger>
>;

export const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex asChild ref={ref}>
        <RadixTabs.Trigger {...props} {...styles.triggerWrap()}>
          {Children.map(children, (child) => (
            <Box mr="24" py="6" {...styles.trigger()}>
              {child}
            </Box>
          ))}
        </RadixTabs.Trigger>
      </Flex>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
