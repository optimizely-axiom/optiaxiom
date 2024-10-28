import { theme } from "@optiaxiom/globals";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Text } from "../text";
import { useTooltipContext } from "../tooltip-context";
import { Transition } from "../transition";
import * as styles from "./TooltipContent.css";

type TooltipContentProps = BoxProps<typeof RadixTooltip.Content>;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      align = "center",
      arrowPadding = 6,
      children,
      className,
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const { open } = useTooltipContext("TooltipContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixTooltip.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box asChild {...styles.content({}, className)} {...props}>
                <RadixTooltip.Content
                  align={align}
                  arrowPadding={arrowPadding}
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
