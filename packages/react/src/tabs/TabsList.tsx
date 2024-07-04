import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./Tabs.css";

type TabsProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixTabs.TabsList>
>;

export const TabsList = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        asChild
        flexDirection="row"
        overflow="auto"
        {...styles.list()}
        gap="0"
      >
        <RadixTabs.List {...props} ref={ref}>
          {children}
        </RadixTabs.List>
      </Flex>
    );
  },
);

TabsList.displayName = "@optiaxiom/react/TabsList";
