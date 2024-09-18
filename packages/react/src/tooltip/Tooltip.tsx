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
import { theme } from "../theme";
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
      <RadixTooltip.Root
        delayDuration={delayDuration}
        onOpenChange={
          openProp === undefined
            ? (flag) => {
                if (auto && flag && innerRef.current) {
                  let truncated = false;

                  const elements: Element[] = [innerRef.current];
                  while (!truncated && elements.length) {
                    const element = elements.shift();
                    if (!(element instanceof HTMLElement)) {
                      continue;
                    }
                    const { offsetWidth, scrollWidth } = element;

                    if (offsetWidth < scrollWidth) {
                      truncated = true;
                      break;
                    }

                    elements.push(...element.children);
                  }

                  if (!truncated) {
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
              ? (event) => {
                  event.preventDefault();
                  setOpen(true);
                }
              : undefined
          }
          ref={ref}
        >
          {children}
        </RadixTooltip.Trigger>

        <AnimatePresence>
          {open && (
            <RadixTooltip.Portal forceMount>
              <Transition duration="sm" type="pop">
                <Box
                  asChild
                  bg="bg.neutral.inverse"
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
                            if (
                              innerRef.current?.contains(
                                event.target as Node | null,
                              )
                            )
                              event.preventDefault();
                          }
                        : undefined
                    }
                    sideOffset={5}
                  >
                    <Text fontSize="sm">{content}</Text>
                    {withArrow && (
                      <RadixTooltip.Arrow
                        fill={theme.colors["neutral.900"]}
                        height={4}
                        width={8}
                      />
                    )}
                  </RadixTooltip.Content>
                </Box>
              </Transition>
            </RadixTooltip.Portal>
          )}
        </AnimatePresence>
      </RadixTooltip.Root>
    );
  },
);

Tooltip.displayName = "@optiaxiom/react/Tooltip";
