import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef, useContext } from "react";

import { AnimatePresence } from "../animate-presence";
import { type BoxProps } from "../box";
import { Paper } from "../paper";
import { PopoverContext } from "../popover-context";
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
                  {withArrow && <RadixPopover.Arrow height={4} width={8} />}
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
