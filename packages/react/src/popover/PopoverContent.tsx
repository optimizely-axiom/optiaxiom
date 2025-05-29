import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import type { BoxProps } from "../box";

import { ModalProvider } from "../modal";
import { ModalListbox } from "../modal/internals";
import { Portal } from "../portal";
import { TransitionGroup } from "../transition";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";
import { usePopoverContext } from "./PopoverContext";

export type PopoverContentProps = ExcludeProps<
  BoxProps<
    typeof RadixPopover.Content,
    Pick<ComponentPropsWithoutRef<typeof ModalListbox>, "maxH" | "minW">
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
  ({ align = "start", children, sideOffset = 4, ...props }, outerRef) => {
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
        <Portal asChild>
          <ModalListbox
            asChild
            onBlur={onReactSelectInputBlur}
            p="16"
            {...props}
          >
            <RadixPopover.Content
              align={align}
              collisionPadding={16}
              ref={ref}
              sideOffset={sideOffset}
            >
              <ModalProvider shardRef={innerRef}>{children}</ModalProvider>
            </RadixPopover.Content>
          </ModalListbox>
        </Portal>
      </TransitionGroup>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
