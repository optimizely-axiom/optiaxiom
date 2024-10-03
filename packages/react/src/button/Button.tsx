import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  type ElementType,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
} from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Spinner } from "../spinner";
import { extractSprinkles } from "../sprinkles";
import { Transition } from "../transition";
import { type ExtendProps, fallbackSpan } from "../utils";
import * as styles from "./Button.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "neutral", variant: "outline" },
  inverse: { colorScheme: "neutral", variant: "solid" },
  primary: { colorScheme: "primary", variant: "solid" },
  subtle: { colorScheme: "neutral", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

export type ButtonProps<
  T extends ElementType = "button",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      addonAfter?: ReactNode;
      addonBefore?: ReactNode;
      appearance?: keyof typeof appearances;
      children?: ReactNode;
      disabled?: boolean;
      icon?: ReactNode;
      iconPosition?: "end" | "start";
      loading?: boolean;
    } & Omit<styles.ButtonVariants, "colorScheme" | "iconOnly" | "variant">,
    P
  >
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      addonAfter,
      addonBefore,
      appearance = "default",
      asChild,
      children,
      className,
      disabled,
      icon,
      iconPosition = "start",
      loading,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const presetProps = appearances[appearance];
    const colorScheme = presetProps.colorScheme;
    const variant = presetProps.variant;
    let isIconOnly = Boolean(!children && icon);

    if (asChild) {
      const newElement = isValidElement(children) ? children : null;
      isIconOnly = Boolean(!newElement?.props.children && icon);
      children = newElement
        ? cloneElement(
            newElement,
            undefined,
            isIconOnly ? (
              <Box asChild {...styles.icon()}>
                {icon}
              </Box>
            ) : (
              <Flex asChild {...styles.label()}>
                {fallbackSpan(newElement.props.children)}
              </Flex>
            ),
          )
        : children;
    } else {
      children = isIconOnly ? (
        <Box asChild {...styles.icon()}>
          {icon}
        </Box>
      ) : (
        <Flex asChild {...styles.label()}>
          {fallbackSpan(children)}
        </Flex>
      );
    }
    if (icon && !isIconOnly) {
      if (iconPosition === "start") {
        addonBefore = (
          <Box asChild {...styles.icon()}>
            {icon}
          </Box>
        );
      } else if (iconPosition === "end") {
        addonAfter = (
          <Box asChild {...styles.icon()}>
            {icon}
          </Box>
        );
      }
    }

    const isIconMissingAriaLabel = isIconOnly && !props["aria-label"];
    useEffect(() => {
      if (isIconMissingAriaLabel) {
        console.error(
          `Icon only \`Button\` requires an \`aria-label\` for the component to be accessible for screen reader users.`,
        );
      }
    }, [isIconMissingAriaLabel]);

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...styles.button(
          {
            colorScheme,
            iconOnly: isIconOnly,
            size,
            variant,
          },
          className,
        )}
        {...sprinkleProps}
      >
        <Comp disabled={disabled || loading} ref={ref} {...restProps}>
          <AnimatePresence>
            {loading && (
              <Transition duration="sm">
                <Box aria-hidden="true" {...styles.spinner()}>
                  <Spinner
                    colorScheme={variant === "solid" ? "inverse" : "default"}
                  />
                </Box>
              </Transition>
            )}
          </AnimatePresence>

          {addonBefore && (
            <Box asChild {...styles.addon()}>
              {fallbackSpan(addonBefore)}
            </Box>
          )}

          <Slottable>{children}</Slottable>

          {addonAfter && (
            <Box asChild {...styles.addon()}>
              {fallbackSpan(addonAfter)}
            </Box>
          )}
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
