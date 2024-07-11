import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useRef,
} from "react";

import type { ExtendProps } from "../utils";

import { AnimatePresence } from "../animate-presence";
import { Box } from "../box";
import { Text } from "../text";
import { Transition } from "../transition";

type TooltipProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  ComponentPropsWithRef<typeof RadixTooltip.Content>,
  {
    /**
     * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
     */
    auto?: boolean;
    children: ReactNode;
    content?: ReactNode;
    defaultOpen?: boolean;
    delayDuration?: ComponentPropsWithRef<
      typeof RadixTooltip.Provider
    >["delayDuration"];
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    withArrow?: boolean;
  }
>;

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  (
    {
      auto,
      children,
      content,
      defaultOpen,
      delayDuration,
      onOpenChange,
      open: openProp,
      withArrow,
      z = "popover",
      ...props
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [open, setOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange:
        onOpenChange ??
        ((flag) => {
          if (auto && flag && innerRef.current) {
            const { offsetWidth, scrollWidth } = innerRef.current;

            if (offsetWidth >= scrollWidth) {
              return;
            }
          }

          setOpen(flag);
        }),
      prop: openProp,
    });

    return (
      <RadixTooltip.Provider delayDuration={delayDuration}>
        <RadixTooltip.Root onOpenChange={setOpen} open={open}>
          <RadixTooltip.Trigger asChild ref={ref}>
            {children}
          </RadixTooltip.Trigger>

          <AnimatePresence>
            {open && (
              <RadixTooltip.Portal forceMount>
                <Transition type="pop">
                  <RadixTooltip.Content asChild sideOffset={5} {...props}>
                    <Box
                      bg="dark.600"
                      color="white"
                      px="6"
                      py="4"
                      rounded="sm"
                      z={z}
                    >
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
