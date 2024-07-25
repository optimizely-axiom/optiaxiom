import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useRef,
} from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Text } from "../text";
import { Transition } from "../transition";

type TooltipProps = BoxProps<
  typeof RadixTooltip.Content,
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
    keepOpenOnActivation?: boolean;
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
      keepOpenOnActivation,
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
      onChange: onOpenChange,
      prop: openProp,
    });

    return (
      <RadixTooltip.Provider delayDuration={delayDuration}>
        <RadixTooltip.Root
          onOpenChange={
            openProp === undefined
              ? (flag) => {
                  if (auto && flag && innerRef.current) {
                    const { offsetWidth, scrollWidth } = innerRef.current;

                    if (offsetWidth >= scrollWidth) {
                      return;
                    }
                  }

                  setOpen(flag);
                  onOpenChange?.(flag);
                }
              : setOpen
          }
          open={open}
        >
          <RadixTooltip.Trigger
            asChild
            onClick={
              keepOpenOnActivation
                ? (event) => event.preventDefault()
                : undefined
            }
            ref={ref}
          >
            {children}
          </RadixTooltip.Trigger>

          <AnimatePresence>
            {open && (
              <RadixTooltip.Portal forceMount>
                <Transition type="pop">
                  <Box
                    asChild
                    bg="neutral.900"
                    color="white"
                    px="12"
                    py="8"
                    rounded="md"
                    z={z}
                    {...props}
                  >
                    <RadixTooltip.Content
                      onPointerDownOutside={
                        keepOpenOnActivation
                          ? (event: CustomEvent) => {
                              if (event.target === innerRef.current)
                                event.preventDefault();
                            }
                          : undefined
                      }
                      sideOffset={5}
                    >
                      <Text fontSize="sm">{content}</Text>
                      {withArrow && <RadixTooltip.Arrow height={4} width={8} />}
                    </RadixTooltip.Content>
                  </Box>
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
