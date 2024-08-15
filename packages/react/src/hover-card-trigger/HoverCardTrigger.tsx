import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useHoverCardContext } from "../hover-card-context";
import { Link } from "../link";
import { extractSprinkles } from "../sprinkles";

type HoverCardTriggerProps = ComponentPropsWithoutRef<
  typeof RadixHoverCard.Trigger
>;

export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { keepOpenOnActivation, setOpen } =
    useHoverCardContext("HoverCardTrigger");
  const { restProps, sprinkleProps } = extractSprinkles(props);

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
      {...sprinkleProps}
    >
      {asChild ? (
        children
      ) : (
        <Link cursor="pointer" {...restProps}>
          {children}
        </Link>
      )}
    </RadixHoverCard.Trigger>
  );
});

HoverCardTrigger.displayName = "@optiaxiom/react/HoverCardTrigger";
