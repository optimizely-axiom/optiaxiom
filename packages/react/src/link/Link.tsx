import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import { IconUpRight } from "./IconUpRight";
import * as styles from "./Link.css";

type LinkProps = BoxProps<
  "a",
  {
    disabled?: boolean;
    external?: boolean;
  } & styles.LinkVariants
>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className,
      disabled,
      external,
      href,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.link({ variant }, className)} {...sprinkleProps}>
        <a
          aria-disabled={disabled}
          data-disabled={disabled}
          href={href}
          ref={ref}
          {...(external && { rel: "noopener noreferrer", target: "_blank" })}
          {...restProps}
        >
          {children}
          {external && (
            <Box asChild ml="4">
              <IconUpRight />
            </Box>
          )}
        </a>
      </Box>
    );
  },
);

Link.displayName = "@optiaxiom/react/Link";
