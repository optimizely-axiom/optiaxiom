import { createSlot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Spinner } from "../spinner";
import { Transition, TransitionGroup } from "../transition";
import { decorateChildren, type ExtendProps } from "../utils";
import * as styles from "./ButtonRoot.css";

const Slot = createSlot("@optiaxiom/react/ButtonRoot");

const appearances = {
  danger: { intent: "danger", variant: "strong" },
  "danger-outline": { intent: "danger", variant: "outline" },
  default: { intent: "neutral", variant: "outline" },
  inverse: { intent: "neutral", variant: "strong" },
  primary: { intent: "primary", variant: "strong" },
  "primary-opal": { intent: "primary", variant: "opal" },
  subtle: { intent: "neutral", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

export type ButtonRootProps<
  T extends ElementType = "button",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    Omit<NonNullable<styles.ButtonVariants>, "intent" | "variant"> & {
      /**
       * Control the appearance by selecting between the different button types.
       */
      appearance?: keyof typeof appearances;
      /**
       * Whether the button is disabled.
       */
      disabled?: boolean;
      /**
       * Whether to show loading spinner inside the button.
       */
      loading?: boolean;
    },
    P
  >
>;

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      disabled,
      loading,
      size = "md",
      square,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { boxProps, restProps } = extractBoxProps(props);

    const { intent, variant } = appearances[appearance];

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...styles.buttonBase(
          {
            intent,
            size,
            square: Boolean(square),
            variant,
          },
          className,
        )}
        {...boxProps}
      >
        <Comp disabled={disabled} ref={ref} {...restProps}>
          {decorateChildren({ asChild, children }, (children) => (
            <>
              <TransitionGroup open={loading}>
                <Transition>
                  <Spinner
                    appearance={
                      variant === "strong" || variant === "opal"
                        ? "inverse"
                        : "default"
                    }
                    aria-hidden="true"
                    {...styles.spinner()}
                  />
                </Transition>
              </TransitionGroup>

              {children}
            </>
          ))}
        </Comp>
      </Box>
    );
  },
);

ButtonRoot.displayName = "@optiaxiom/react/ButtonRoot";
