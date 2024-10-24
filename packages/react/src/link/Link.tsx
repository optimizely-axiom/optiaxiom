import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconUpRightFromSquare } from "../icons/IconUpRightFromSquare";
import { extractSprinkles } from "../sprinkles";
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
      appearance = "default",
      children,
      className,
      disabled,
      external,
      href,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        {...styles.link({ appearance }, className)}
        {...sprinkleProps}
      >
        <a
          aria-disabled={disabled}
          data-disabled={disabled ? "" : undefined}
          href={href}
          ref={ref}
          {...(external && { rel: "noopener noreferrer", target: "_blank" })}
          {...restProps}
          {...(disabled && {
            href: undefined,
            role: "link",
          })}
        >
          {children}
          {external && (
            <Box asChild {...styles.icon()}>
              <IconUpRightFromSquare />
            </Box>
          )}
        </a>
      </Box>
    );
  },
);

Link.displayName = "@optiaxiom/react/Link";
