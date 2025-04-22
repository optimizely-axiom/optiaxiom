import { theme } from "@optiaxiom/globals";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Text } from "../text";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./TooltipContent.css";
import { useTooltipContext } from "./TooltipContext";

type TooltipContentProps = ExcludeProps<
  BoxProps<typeof RadixTooltip.Content>,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "forceMount"
  | "hideWhenDetached"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ align = "center", children, className, side = "top", ...props }, ref) => {
    const { open } = useTooltipContext("@optiaxiom/react/TooltipContent");

    return (
      <TransitionGroup open={open}>
        <RadixTooltip.Portal forceMount>
          <Transition duration="sm" type="pop">
            <Box asChild {...styles.content({}, className)} {...props}>
              <RadixTooltip.Content
                align={align}
                arrowPadding={6}
                ref={ref}
                side={side}
                sideOffset={5}
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
      </TransitionGroup>
    );
  },
);

TooltipContent.displayName = "@optiaxiom/react/TooltipContent";
