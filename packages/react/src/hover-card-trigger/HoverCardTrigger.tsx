import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useHoverCardContext } from "../hover-card-context";
import { Link } from "../link";

type HoverCardTriggerProps = BoxProps<typeof RadixHoverCard.Trigger>;

export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(({ asChild, children, cursor = "pointer", ...props }, ref) => {
  const { keepOpenOnActivation, setOpen } =
    useHoverCardContext("HoverCardTrigger");

  return (
    <RadixHoverCard.Trigger
      asChild
      onClick={
        keepOpenOnActivation
          ? (event) => {
              event.preventDefault();
              setOpen(true);
            }
          : undefined
      }
      ref={ref}
      {...props}
    >
      {asChild ? children : <Link cursor={cursor}>{children}</Link>}
    </RadixHoverCard.Trigger>
  );
});

HoverCardTrigger.displayName = "@optiaxiom/react/HoverCardTrigger";
