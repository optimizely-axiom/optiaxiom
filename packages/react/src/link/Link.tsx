import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconUpRightFromSquare } from "../icons/IconUpRightFromSquare";
import { extractSprinkles } from "../sprinkles";
import { decorateChildren } from "../utils";
import * as styles from "./Link.css";

type LinkProps = BoxProps<
  "a",
  styles.LinkVariants & {
    /**
     * Whether to show disabled state and disable interactions.
     */
    disabled?: boolean;
    /**
     * Show an external link icon and sets the correct rel/target attributes.
     */
    external?: boolean;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      disabled,
      external,
      href,
      overlay,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        {...styles.link({ appearance, overlay }, className)}
        {...sprinkleProps}
      >
        <Comp
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
          {decorateChildren({ asChild, children }, (children) => (
            <>
              {children}

              {external && (
                <Box asChild {...styles.icon()}>
                  <IconUpRightFromSquare />
                </Box>
              )}
            </>
          ))}
        </Comp>
      </Box>
    );
  },
);

Link.displayName = "@optiaxiom/react/Link";
