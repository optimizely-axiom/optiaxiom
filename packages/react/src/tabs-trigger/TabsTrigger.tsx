import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, useContext } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { TabsContext } from "../tabs-context";
import * as styles from "./TabsTrigger.css";

type TabsTriggerProps = BoxProps<typeof RadixTabs.Trigger>;

export const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  ({ children, ...props }, ref) => {
    const { appearance } = useContext(TabsContext);

    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        ref={ref}
        {...styles.trigger({ appearance })}
        {...sprinkleProps}
      >
        <RadixTabs.Trigger {...restProps}>
          <Flex {...styles.content({ appearance })}>{children}</Flex>
        </RadixTabs.Trigger>
      </Box>
    );
  },
);

TabsTrigger.displayName = "@optiaxiom/react/TabsTrigger";
