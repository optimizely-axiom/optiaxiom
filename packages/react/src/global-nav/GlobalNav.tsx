import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./GlobalNav.css";

type GlobalNavProps = BoxProps<"nav">;

export const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  ({ children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.globalNav({}, className)} {...sprinkleProps}>
        <nav
          aria-label="Global Navigation"
          ref={ref}
          role="navigation"
          {...restProps}
        >
          {children}
        </nav>
      </Box>
    );
  },
);

GlobalNav.displayName = "@optiaxiom/react/GlobalNav";
