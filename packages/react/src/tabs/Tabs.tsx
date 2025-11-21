import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Tabs.css";

export type TabsProps = BoxProps<typeof RadixTabs.Root>;

/**
 * Set of content sections to be displayed one at a time.
 *
 * @group Tabs
 * @since 0.1.0
 *
 * @example
 * <Tabs onValueChange={setValue} value={value}>
 *   <TabsList>
 *     <TabsTrigger value="first">First</TabsTrigger>
 *     <TabsTrigger value="second">Second</TabsTrigger>
 *     <TabsTrigger value="third">Third</TabsTrigger>
 *   </TabsList>
 *
 *   <TabsContent py="16" value="first">
 *     This is first content
 *   </TabsContent>
 *
 *   <TabsContent py="16" value="second">
 *     This is second content
 *   </TabsContent>
 *
 *   <TabsContent py="16" value="third">
 *     This is third content
 *   </TabsContent>
 * </Tabs>
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.tabs({}, className)} {...boxProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          {children}
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
