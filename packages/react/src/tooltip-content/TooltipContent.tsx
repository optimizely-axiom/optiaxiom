import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef, useRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Text } from "../text";
import { useTooltipContext } from "../tooltip-context";
import { Transition } from "../transition";
import * as styles from "./TooltipContent.css";

type TooltipContentProps = BoxProps<typeof RadixTooltip.Content>;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    { align = "center", children, className, sideOffset = 2, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { keepOpenOnActivation, open, side, theme } =
      useTooltipContext("Tooltip");

    return (
      <AnimatePresence>
        {open && (
          <RadixTooltip.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({ theme }, className)} {...props}>
                <RadixTooltip.Content
                  align={align}
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
                  ref={ref}
                  side={side}
                  sideOffset={sideOffset}
                >
                  <Text fontSize="sm">{children}</Text>
                  <RadixTooltip.Arrow asChild>
                    <svg
                      height={4}
                      preserveAspectRatio="none"
                      viewBox="0 0 30 10"
                      width={8}
                      {...styles.arrow({ theme })}
                    >
                      <polygon points="0,0 30,0 15,10" />
                      <polyline
                        points="0,0 15,10 30,0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </RadixTooltip.Arrow>
                </RadixTooltip.Content>
              </Box>
            </Transition>
          </RadixTooltip.Portal>
        )}
      </AnimatePresence>
    );
  },
);

TooltipContent.displayName = "@optiaxiom/react/TooltipContent";
