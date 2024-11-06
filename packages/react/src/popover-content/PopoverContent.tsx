import { theme } from "@optiaxiom/globals";
import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { ListboxBase, type ListboxBaseProps } from "../listbox-base";
import { usePopoverContext } from "../popover-context";

type PopoverContentProps = ListboxBaseProps<
  typeof RadixPopover.Content,
  {
    withArrow?: boolean;
  }
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ align = "start", children, sideOffset = 2, withArrow, ...props }, ref) => {
    const { open } = usePopoverContext("PopoverContent");

    return (
      <ListboxBase open={open} p="sm" provider="popover" {...props}>
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
      </ListboxBase>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
