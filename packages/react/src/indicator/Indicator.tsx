import { type ReactNode, forwardRef } from "react";

import { Badge } from "../badge";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./Indicator.css";

type IndicatorProps = BoxProps<
  typeof Badge,
  {
    align?: "end" | "start";
    content: ReactNode;
    disabled?: boolean;
  }
>;

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      align = "start",
      asChild,
      children,
      className,
      colorScheme,
      content,
      disabled,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <Flex ref={ref} {...styles.indicator({}, className)} {...props}>
        {!disabled && (
          <Box {...styles.floating({ align })}>
            <Badge
              asChild={asChild}
              colorScheme={colorScheme}
              variant={variant}
              {...styles.badge()}
            >
              {content}
            </Badge>
          </Box>
        )}

        {children}
      </Flex>
    );
  },
);

Indicator.displayName = "@optiaxiom/react/Indicator";
