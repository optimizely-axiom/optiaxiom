import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import {
  MenuContentBase,
  type MenuContentBaseProps,
} from "../menu-content-base";
import { usePopoverContext } from "../popover-context";
import { theme } from "../theme";

type PopoverContentProps = MenuContentBaseProps<
  typeof RadixPopover.Content,
  {
    withArrow?: boolean;
  }
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ align = "start", children, sideOffset = 2, withArrow, ...props }, ref) => {
    const { open } = usePopoverContext("PopoverContent");

    return (
      <MenuContentBase open={open} p="sm" provider="popover" {...props}>
        <RadixPopover.Content align={align} ref={ref} sideOffset={sideOffset}>
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
      </MenuContentBase>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
