import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconUpRight } from "./IconUpRight";
import * as styles from "./Link.css";

type LinkProps = BoxProps<
  "a",
  {
    disabled?: boolean;
    external?: boolean;
    to?: string;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, disabled, external, to, ...props }, ref) => {
    const isExternal = external || (to && to.startsWith("http"));
    const href = to || props.href;

    return (
      <Box asChild {...styles.link({}, className)}>
        <a
          aria-disabled={disabled}
          data-disabled={disabled}
          href={href}
          ref={ref}
          {...(isExternal && { rel: "noopener noreferrer", target: "_blank" })}
          {...props}
        >
          {children}
          <Box ml="4">{isExternal && <IconUpRight />}</Box>
        </a>
      </Box>
    );
  },
);

Link.displayName = "@optiaxiom/react/Link";
