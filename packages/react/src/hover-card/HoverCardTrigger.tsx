import * as RadixHoverCard from "@radix-ui/react-hover-card";
import * as RadixPopper from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useHoverCardAnchorContext } from "./HoverCardContext";
import * as styles from "./HoverCardTrigger.css";
import { useHoverCardScope } from "./useHoverCardScope";

export type HoverCardTriggerProps = BoxProps<typeof RadixHoverCard.Trigger>;

const useDetachedPopperScope = RadixPopper.createPopperScope();

/**
 * @group HoverCard
 */
export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(({ children, className, ...props }, ref) => {
  const { boxProps, restProps } = extractBoxProps(props);

  const { anchorRef } = useHoverCardAnchorContext(
    "@optiaxiom/react/HoverCardTrigger",
  );
  const { __scopeHoverCard } = useHoverCardScope(undefined);
  const { __scopePopper: detachedScope } = useDetachedPopperScope(undefined);

  const trigger = (scope: typeof __scopeHoverCard) => (
    <Box asChild {...styles.trigger({}, className)} {...boxProps}>
      <RadixHoverCard.Trigger
        ref={ref}
        {...restProps}
        {...{ __scopeHoverCard: scope }}
      >
        {children}
      </RadixHoverCard.Trigger>
    </Box>
  );

  if (!anchorRef) {
    return trigger(__scopeHoverCard);
  }

  /**
   * The trigger registers itself as the card's anchor every time it renders,
   * so it gets a Popper of its own and the card anchors to `anchorRef`.
   */
  return (
    <>
      <RadixPopper.Anchor
        virtualRef={anchorRef}
        {...{ __scopePopper: __scopeHoverCard }}
      />

      <RadixPopper.Root {...{ __scopePopper: detachedScope }}>
        {trigger({ ...__scopeHoverCard, ...detachedScope })}
      </RadixPopper.Root>
    </>
  );
});

HoverCardTrigger.displayName = "@optiaxiom/react/HoverCardTrigger";
