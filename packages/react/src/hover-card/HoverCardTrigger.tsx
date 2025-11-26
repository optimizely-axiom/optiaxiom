import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./HoverCardTrigger.css";

export type HoverCardTriggerProps = BoxProps<typeof RadixHoverCard.Trigger>;

/**
 * @group HoverCard
 */
export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(({ children, className, ...props }, ref) => {
  const { boxProps, restProps } = extractBoxProps(props);

  return (
    <Box asChild {...styles.trigger({}, className)} {...boxProps}>
      <RadixHoverCard.Trigger ref={ref} {...restProps}>
        {children}
      </RadixHoverCard.Trigger>
    </Box>
  );
});

HoverCardTrigger.displayName = "@optiaxiom/react/HoverCardTrigger";
