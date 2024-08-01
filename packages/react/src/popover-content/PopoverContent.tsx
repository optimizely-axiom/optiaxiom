import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef, useContext } from "react";

import { AnimatePresence } from "../animate-presence";
import { type BoxProps } from "../box";
import { Paper } from "../paper";
import { PopoverContext } from "../popover-context";
import { theme } from "../styles";
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
    const { open } = useContext(PopoverContext);

    return (
      <AnimatePresence>
        {open && (
          <RadixPopover.Portal>
            <Transition duration="sm">
              <Paper asChild {...styles.content({}, className)} {...props}>
                <RadixPopover.Content
                  align={align}
                  ref={ref}
                  sideOffset={sideOffset}
                >
                  {children}

                  {withArrow && (
                    <RadixPopover.Arrow asChild>
                      <svg
                        fill={theme.colors["surface"]}
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
              </Paper>
            </Transition>
          </RadixPopover.Portal>
        )}
      </AnimatePresence>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
