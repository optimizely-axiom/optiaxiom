import { theme } from "@optiaxiom/globals";
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
    { align = "center", children, className, sideOffset = 5, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { keepOpenOnActivation, open } = useTooltipContext("TooltipContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixTooltip.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({}, className)} {...props}>
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
                  sideOffset={sideOffset}
                >
                  <Text fontSize="sm">{children}</Text>

                  <RadixTooltip.Arrow
                    fill={theme.colors["bg.default.inverse"]}
                    height={4}
                    width={8}
                  />
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
