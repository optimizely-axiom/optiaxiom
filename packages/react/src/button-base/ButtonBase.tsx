import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ElementType, forwardRef, type ReactNode } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Spinner } from "../spinner";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./ButtonBase.css";

const appearances = {
  danger: { intent: "danger", variant: "solid" },
  "danger-outline": { intent: "danger", variant: "outline" },
  default: { intent: "neutral", variant: "outline" },
  inverse: { intent: "neutral", variant: "solid" },
  primary: { intent: "primary", variant: "solid" },
  subtle: { intent: "neutral", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

export type ButtonBaseProps<
  T extends ElementType = "button",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      appearance?: keyof typeof appearances;
      children?: ReactNode;
      disabled?: boolean;
      loading?: boolean;
    } & Omit<NonNullable<styles.ButtonVariants>, "intent" | "variant">,
    P
  >
>;

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      disabled,
      iconOnly,
      loading,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { intent, variant } = appearances[appearance];

    return (
      <Box
        asChild
        cursor={disabled ? "not-allowed" : "pointer"}
        data-disabled={disabled ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...styles.buttonBase(
          {
            iconOnly: Boolean(iconOnly),
            intent,
            size,
            variant,
          },
          className,
        )}
        {...sprinkleProps}
      >
        <Comp disabled={disabled} ref={ref} {...restProps}>
          <AnimatePresence>
            {loading && (
              <Spinner
                appearance={variant === "solid" ? "inverse" : "default"}
                aria-hidden="true"
                size="2xs"
                {...styles.spinner()}
              />
            )}
          </AnimatePresence>

          <Slottable>{children}</Slottable>
        </Comp>
      </Box>
    );
  },
);

ButtonBase.displayName = "@optiaxiom/react/ButtonBase";
