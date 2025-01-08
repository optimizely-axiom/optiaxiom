import { theme } from "@optiaxiom/globals";
import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { MenuListbox } from "../menu-listbox";
import { usePopoverContext } from "../popover-context";
import { TransitionGroup } from "../transition-group";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";

type PopoverContentProps = ExcludeProps<
  BoxProps<
    typeof RadixPopover.Content,
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW"> & {
      /**
       * Whether to show an arrow.
       */
      withArrow?: boolean;
    }
  >,
  | "alignOffset"
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
  ({ align = "start", children, sideOffset = 2, withArrow, ...props }, ref) => {
    const { open } = usePopoverContext("PopoverContent");

    return (
      <TransitionGroup open={open}>
        <RadixPopover.Portal forceMount>
          <MenuListbox
            asChild
            onBlur={onReactSelectInputBlur}
            p="12"
            provider="popover"
            {...props}
          >
            <RadixPopover.Content
              align={align}
              ref={ref}
              sideOffset={sideOffset}
            >
              {children}

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
          </MenuListbox>
        </RadixPopover.Portal>
      </TransitionGroup>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
