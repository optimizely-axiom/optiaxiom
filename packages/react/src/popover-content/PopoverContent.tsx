import { theme } from "@optiaxiom/globals";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import type { BoxProps } from "../box";

import { ModalProvider } from "../modal-context";
import { OverlayListbox } from "../overlay-listbox";
import { usePopoverContext } from "../popover-context";
import { TransitionGroup } from "../transition-group";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";

type PopoverContentProps = ExcludeProps<
  BoxProps<
    typeof RadixPopover.Content,
    Pick<ComponentPropsWithoutRef<typeof OverlayListbox>, "maxH" | "minW"> & {
      /**
       * Whether to show an arrow.
       */
      withArrow?: boolean;
    }
  >,
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "forceMount"
  | "hideWhenDetached"
  | "sticky"
  | "updatePositionStrategy"
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { align = "start", children, sideOffset = 2, withArrow, ...props },
    outerRef,
  ) => {
    const { open, presence, setPresence } = usePopoverContext(
      "@optiaxiom/react/PopoverContent",
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <TransitionGroup
        onPresenceChange={setPresence}
        open={open}
        presence={presence}
      >
        <RadixPopover.Portal forceMount>
          <OverlayListbox
            asChild
            onBlur={onReactSelectInputBlur}
            p="16"
            provider="popover"
            {...props}
          >
            <RadixPopover.Content
              align={align}
              ref={ref}
              sideOffset={sideOffset}
            >
              <ModalProvider shardRef={innerRef}>{children}</ModalProvider>

              {withArrow && (
                <RadixPopover.Arrow asChild>
                  <svg
                    fill={theme.colors["bg.default"]}
                    height={4}
                    preserveAspectRatio="none"
                    stroke={theme.colors["border.secondary"]}
                    viewBox="0 0 30 10"
                    width={8}
                  >
                    <polygon points="0,0 30,0 15,10" />
                    <polyline
                      points="0,0 15,10 30,0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                  </svg>
                </RadixPopover.Arrow>
              )}
            </RadixPopover.Content>
          </OverlayListbox>
        </RadixPopover.Portal>
      </TransitionGroup>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
