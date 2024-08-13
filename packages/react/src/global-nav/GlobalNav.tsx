import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./GlobalNav.css";

type GlobalNavProps = BoxProps<
  "nav",
  {
    endDecorator?: ReactNode;
  }
>;

export const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  ({ children, className, endDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex {...styles.wrapper()}>
        <Box asChild {...styles.nav({}, className)} {...sprinkleProps}>
          <nav
            aria-label="Global Navigation"
            ref={ref}
            role="navigation"
            {...restProps}
          >
            {children}
          </nav>
        </Box>
        {endDecorator}
      </Flex>
    );
  },
);

GlobalNav.displayName = "@optiaxiom/react/GlobalNav";
