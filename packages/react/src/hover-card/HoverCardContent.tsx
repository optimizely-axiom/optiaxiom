import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { forwardRef, useRef } from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { Paper } from "../paper";
import { Portal } from "../portal";
import { Transition, TransitionGroup } from "../transition";
import { useHoverCardContext } from "./HoverCardContext";

export type HoverCardContentProps = ExcludeProps<
  BoxProps<typeof RadixHoverCard.Content>,
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "forceMount"
  | "hideWhenDetached"
  | "sticky"
  | "updatePositionStrategy"
>;

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    { align = "start", asChild, children, sideOffset = 4, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { open, presence, setPresence } = useHoverCardContext(
      "@optiaxiom/react/HoverCardContent",
    );

    return (
      <TransitionGroup
        onPresenceChange={setPresence}
        open={open}
        presence={presence}
      >
        <Portal asChild>
          <Transition duration="sm">
            <Paper
              asChild
              display="flex"
              flexDirection="column"
              fontSize="md"
              gap="2"
              maxW="xs"
              p="16"
              role="dialog"
              {...props}
            >
              <RadixHoverCard.Content
                align={align}
                asChild={asChild}
                forceMount
                ref={ref}
                sideOffset={sideOffset}
              >
                {children}
              </RadixHoverCard.Content>
            </Paper>
          </Transition>
        </Portal>
      </TransitionGroup>
    );
  },
);

HoverCardContent.displayName = "@optiaxiom/react/HoverCardContent";
