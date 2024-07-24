import * as RadixTabs from "@radix-ui/react-tabs";
import { Children, type ComponentPropsWithRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<
  "div",
  ComponentPropsWithRef<typeof RadixTabs.Trigger>
>;

export const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex asChild ref={ref}>
        <RadixTabs.Trigger {...styles.triggerWrap()} {...props}>
          {Children.map(children, (child) => (
            <Box {...styles.trigger()}>{child}</Box>
          ))}
        </RadixTabs.Trigger>
      </Flex>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
