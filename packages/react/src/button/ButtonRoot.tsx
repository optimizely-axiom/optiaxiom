import { createSlot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Spinner } from "../spinner";
import {
  Transition,
  TransitionGlobalConfig,
  TransitionGroup,
} from "../transition";
import { decorateChildren, type ExtendProps } from "../utils";
import * as styles from "./ButtonRoot.css";

const Slot = createSlot("@optiaxiom/react/ButtonRoot");

/**
 * The opal variants animate an inlined video that can't be paused via CSS, so
 * they make visual-regression snapshots (Chromatic) nondeterministic. When
 * animations are globally skipped, fall back to the static non-opal variant.
 */
const staticVariant = {
  "outline-opal": "outline",
} as const;

const appearances = {
  danger: { intent: "danger", variant: "strong" },
  "danger-outline": { intent: "danger", variant: "outline" },
  default: { intent: "neutral", variant: "outline" },
  "default-opal": { intent: "neutral", variant: "outline-opal" },
  inverse: { intent: "neutral", variant: "strong" },
  primary: { intent: "primary", variant: "strong" },
  "primary-opal": { intent: "primary", variant: "strong" },
  subtle: { intent: "neutral", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

export type ButtonRootProps<
  T extends ElementType = "button",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    Omit<NonNullable<styles.ButtonVariants>, "addon" | "intent" | "variant"> & {
      /**
       * Which addons sit alongside the button label. Set internally by `Button`
       * based on the leading/trailing content.
       *
       * @internal
       */
      addon?: NonNullable<styles.ButtonVariants>["addon"];
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
      /**
       * Whether button should have square shape (an icon-only button with no
       * label).
       */
      square?: boolean;
      /**
       * The default behavior of the button.
       */
      type?: "button" | "reset" | "submit" | undefined;
    },
    P
  >
>;

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  (
    {
      addon = "none",
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

    const { intent, variant: resolvedVariant } = appearances[appearance];
    const variant =
      TransitionGlobalConfig.skipAnimations && resolvedVariant in staticVariant
        ? staticVariant[resolvedVariant as keyof typeof staticVariant]
        : resolvedVariant;

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...styles.buttonBase(
          {
            addon: square ? "only" : addon,
            intent,
            size,
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
                      variant === "strong"
                        ? intent === "primary"
                          ? "current"
                          : "inverse"
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
