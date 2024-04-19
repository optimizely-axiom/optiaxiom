import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ComponentProps, type ReactNode, forwardRef } from "react";

import { Box } from "../box";
import { Text } from "../text";

type TooltipProps = {
  children: ReactNode;
  content?: ReactNode;
  withArrow?: boolean;
} & ComponentProps<typeof RadixTooltip.Content>;

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, content, withArrow, ...props }, ref) => {
    return (
      <RadixTooltip.Provider>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger asChild ref={ref}>
            {children}
          </RadixTooltip.Trigger>

          <RadixTooltip.Portal forceMount>
            <RadixTooltip.Content asChild sideOffset={5} {...props}>
              <Box
                background="dark.600"
                borderRadius="sm"
                color="white"
                paddingX={0.75}
                paddingY={0.5}
              >
                <Text size="sm">{content}</Text>
                {withArrow && <RadixTooltip.Arrow />}
              </Box>
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

Tooltip.displayName = "@optiaxiom/react/Tooltip";
