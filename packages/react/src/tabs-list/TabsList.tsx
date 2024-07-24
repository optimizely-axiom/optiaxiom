import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import * as styles from "./TabsList.css";

type TabsListProps = BoxProps<
  "div",
  ComponentPropsWithRef<typeof RadixTabs.List>
>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex asChild {...styles.list()}>
        <RadixTabs.List ref={ref} {...props}>
          {children}
        </RadixTabs.List>
      </Flex>
    );
  },
);

TabsList.displayName = "@optiaxiom/react/TabsList";
