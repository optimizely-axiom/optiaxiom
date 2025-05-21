import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Cover } from "../cover";
import { IconUpRightFromSquare } from "../icons/IconUpRightFromSquare";
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
                    <IconUpRightFromSquare />
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
