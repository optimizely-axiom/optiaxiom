import * as RadixTooltip from "@radix-ui/react-tooltip";
import { AnimatePresence } from "framer-motion";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Text } from "../text";
import { Transition } from "../transition";

type TooltipProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixTooltip.Content>,
  {
    children: ReactNode;
    content?: ReactNode;
    withArrow?: boolean;
  }
>;

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, content, withArrow, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <RadixTooltip.Provider>
        <RadixTooltip.Root onOpenChange={setOpen} open={open}>
          <RadixTooltip.Trigger asChild ref={ref}>
            {children}
          </RadixTooltip.Trigger>

          <AnimatePresence>
            {open && (
              <RadixTooltip.Portal forceMount>
                <Transition type="pop">
                  <RadixTooltip.Content asChild sideOffset={5} {...props}>
                    <Box bg="dark.600" color="white" px="6" py="4" rounded="sm">
                      <Text fontSize="sm">{content}</Text>
                      {withArrow && <RadixTooltip.Arrow />}
                    </Box>
                  </RadixTooltip.Content>
                </Transition>
              </RadixTooltip.Portal>
            )}
          </AnimatePresence>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

Tooltip.displayName = "@optiaxiom/react/Tooltip";
