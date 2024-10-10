import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { usePopoverContext } from "../popover-context";
import { theme } from "../theme";
import { Transition } from "../transition";
import * as styles from "./PopoverContent.css";

type PopoverContentProps = BoxProps<
  typeof RadixPopover.Content,
  {
    withArrow?: boolean;
  }
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      align = "start",
      children,
      className,
      sideOffset = 2,
      withArrow,
      ...props
    },
    ref,
  ) => {
    const { open } = usePopoverContext("PopoverContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixPopover.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({}, className)} {...props}>
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
              </Box>
            </Transition>
          </RadixPopover.Portal>
        )}
      </AnimatePresence>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
