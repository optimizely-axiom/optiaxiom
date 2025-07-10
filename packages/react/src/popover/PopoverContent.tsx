import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { ModalListbox } from "../modal/internals";
import { Portal } from "../portal";
import { TransitionGroup } from "../transition";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";
import { PopoverContentImpl } from "./PopoverContentImpl";
import { usePopoverContext } from "./PopoverContext";
import { usePopoverScope } from "./usePopoverScope";

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
  (
    {
      align = "start",
      asChild,
      children,
      onCloseAutoFocus,
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const { open, presence, setPresence } = usePopoverContext(
      "@optiaxiom/react/PopoverContent",
    );

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
              asChild
              collisionPadding={16}
              data-state={presence ? "open" : "closed"}
              forceMount
              onCloseAutoFocus={(event) => {
                onCloseAutoFocus?.(event);
                if (event.defaultPrevented) {
                  return;
                }

                if (document.activeElement !== document.body) {
                  /**
                   * In case we open a dialog from a popover that has an <input
                   * autoFocus /> - or we shift the focus away programmatically
                   * in some other way we need to handle that case and prevent
                   * shifting focus back to the trigger.
                   */
                  event.preventDefault();
                }
              }}
              ref={ref}
              sideOffset={sideOffset}
              {...usePopoverScope(undefined)}
            >
              <PopoverContentImpl asChild={asChild}>
                {children}
              </PopoverContentImpl>
            </RadixPopover.Content>
          </ModalListbox>
        </Portal>
      </TransitionGroup>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
