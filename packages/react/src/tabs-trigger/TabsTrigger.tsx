import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<typeof RadixTabs.Trigger>;

export const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild ref={ref} {...styles.trigger()} {...sprinkleProps}>
        <RadixTabs.Trigger {...restProps}>
          <Flex {...styles.content()}>{children}</Flex>
        </RadixTabs.Trigger>
      </Box>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
