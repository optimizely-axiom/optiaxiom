import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Cover } from "../cover";
import { IconUpRightFromSquare } from "../icons/IconUpRightFromSquare";
import { decorateChildren } from "../utils";
import * as styles from "./Link.css";

const Slot = createSlot("@optiaxiom/react/Link");

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
    /**
     * Whether to expand and fill up the whole area of the parent which has `position: relative`.
     */
    overlay?: "inset" | boolean;
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
      overlay,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.link({ appearance }, className)} {...boxProps}>
        <Cover asChild disabled={!overlay} inset={overlay === "inset"}>
          <Comp
            aria-disabled={disabled}
            data-disabled={disabled ? "" : undefined}
            data-overlay={overlay ? "" : undefined}
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
