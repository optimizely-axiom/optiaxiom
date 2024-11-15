import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Badge } from "../badge";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./Indicator.css";

type IndicatorProps = BoxProps<
  typeof Badge,
  {
    content?: ReactNode;
    disabled?: boolean;
    offset?: boolean;
    ping?: boolean;
    position?: "bottom-right" | "top-right";
  }
>;

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      asChild,
      children,
      content,
      disabled,
      intent,
      offset = true,
      ping,
      position = "top-right",
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <Flex {...styles.indicator()}>
        <Slot ref={ref} {...props}>
          {children}
        </Slot>

        {!disabled && (
          <Box {...styles.floating({ offset, position })}>
            {ping && (
              <Badge
                aria-hidden="true"
                asChild={asChild}
                intent={intent}
                variant={variant}
                {...styles.badge({ offset, ping: true })}
              >
                {content}
              </Badge>
            )}

            <Badge
              asChild={asChild}
              intent={intent}
              variant={variant}
              {...styles.badge({ offset })}
            >
              {content}
            </Badge>
          </Box>
        )}
      </Flex>
    );
  },
);

Indicator.displayName = "@optiaxiom/react/Indicator";
