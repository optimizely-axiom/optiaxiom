import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./GlobalNavItem.css";

export type GlobalNavItemProps = BoxProps<
  "div",
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const GlobalNavItem = forwardRef<HTMLDivElement, GlobalNavItemProps>(
  ({ children, endDecorator, startDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild ref={ref} {...styles.item()} {...sprinkleProps}>
        <Box {...restProps}>
          {startDecorator}

          <Box flex="1">{children}</Box>

          {endDecorator}
        </Box>
      </Flex>
    );
  },
);

GlobalNavItem.displayName = "@optiaxiom/react/GlobalNavItem";
