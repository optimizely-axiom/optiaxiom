import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./TabsList.css";

type TabsProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixTabs.TabsList>
>;

export const TabsList = forwardRef<HTMLDivElement, TabsProps>(
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
