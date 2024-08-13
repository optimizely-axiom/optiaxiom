import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Link } from "../link";
import { extractSprinkles } from "../sprinkles";

type HoverCardTriggerProps = ComponentPropsWithoutRef<
  typeof RadixHoverCard.Trigger
>;

export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixHoverCard.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? children : <Link {...restProps}>{children}</Link>}
    </RadixHoverCard.Trigger>
  );
});

HoverCardTrigger.displayName = "@optiaxiom/react/HoverCardTrigger";
