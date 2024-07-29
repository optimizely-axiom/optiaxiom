import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<typeof RadixTabs.Trigger>;

export const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild ref={ref} {...styles.trigger()} {...sprinkleProps}>
        <RadixTabs.Trigger {...restProps}>{children}</RadixTabs.Trigger>
      </Flex>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
