import { IconArrowUpRightFromSquare } from "@optiaxiom/icons/IconArrowUpRightFromSquare";
import { createSlot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Cover } from "../cover";
import { decorateChildren } from "../utils";
import * as styles from "./Link.css";

const Slot = createSlot("@optiaxiom/react/Link");

export type LinkProps = BoxProps<
  "a",
  styles.LinkVariants & {
    /**
     * Whether to expand and fill up the whole area of the parent which has `position: relative`.
     */
    cover?: "inset" | boolean;
    /**
     * Whether to show disabled state and disable interactions.
     */
    disabled?: boolean;
    /**
     * Shows an external link icon and sets the correct rel/target attributes.
     */
    external?: boolean;
    /**
     * The link href.
     */
    href?: ComponentPropsWithoutRef<"a">["href"];
    /**
     * The link onClick handler. For an action that doesn't navigate, such as
     * opening a dialog, set `asChild` and pass the handler to a child
     * `<button>` instead.
     */
    onClick?: ComponentPropsWithoutRef<"a">["onClick"];
  }
>;

/**
 * Anchor element for creating hyperlinks.
 *
 * For an action styled as a link that doesn't navigate, set `asChild` and
 * wrap a `<button>`: `<Link asChild><button onClick={…}>…</button></Link>`.
 *
 * @category navigation
 * @since 0.1.0
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      cover,
      disabled,
      external,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.link({ appearance }, className)} {...boxProps}>
        <Cover asChild disabled={!cover} inset={cover === "inset"}>
          <Comp
            aria-disabled={disabled}
            data-disabled={disabled ? "" : undefined}
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
                    <IconArrowUpRightFromSquare />
                  </Box>
                )}
              </>
            ))}
          </Comp>
        </Cover>
      </Box>
    );
  },
);

Link.displayName = "@optiaxiom/react/Link";
