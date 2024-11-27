import { Slot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef, type ReactNode, useEffect } from "react";

import { ButtonAddon } from "../button-addon";
import { ButtonBase, type ButtonBaseProps } from "../button-base";
import { ButtonLabel } from "../button-label";
import { ButtonLoadable } from "../button-loadable";
import { Icon } from "../icon";
import { decorateChildren, type ExtendProps, fallbackSpan } from "../utils";

export type ButtonProps<
  T extends ElementType = "button",
  P = unknown,
> = ButtonBaseProps<
  T,
  ExtendProps<
    {
      addonAfter?: ReactNode;
      addonBefore?: ReactNode;
      children?: ReactNode;
      icon?: ReactNode;
      iconPosition?: "end" | "start";
    },
    P
  >
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      addonAfter,
      addonBefore,
      asChild,
      children,
      icon,
      iconOnly,
      iconPosition = "start",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    let isIconOnly = false;
    children = decorateChildren({ asChild, children }, (children) => {
      isIconOnly = Boolean(!children && icon);
      if (icon && !isIconOnly) {
        if (iconPosition === "start") {
          addonBefore = <Icon asChild>{icon}</Icon>;
        } else if (iconPosition === "end") {
          addonAfter = <Icon asChild>{icon}</Icon>;
        }
      }
      return (
        <>
          {addonBefore && (
            <ButtonAddon asChild>{fallbackSpan(addonBefore)}</ButtonAddon>
          )}

          {isIconOnly ? (
            <ButtonLoadable asChild>
              <Icon asChild>{icon}</Icon>
            </ButtonLoadable>
          ) : (
            <ButtonLabel>{children}</ButtonLabel>
          )}

          {addonAfter && (
            <ButtonAddon asChild>{fallbackSpan(addonAfter)}</ButtonAddon>
          )}
        </>
      );
    });

    const isIconMissingAriaLabel = isIconOnly && !props["aria-label"];
    useEffect(() => {
      if (isIconMissingAriaLabel) {
        console.error(
          `Icon only \`Button\` requires an \`aria-label\` for the component to be accessible for screen reader users.`,
        );
      }
    }, [isIconMissingAriaLabel]);

    return (
      <ButtonBase
        asChild
        iconOnly={isIconOnly || iconOnly}
        ref={ref}
        {...props}
        {...((isIconOnly || iconOnly) && {
          justifyContent: "center",
        })}
      >
        <Comp>{children}</Comp>
      </ButtonBase>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
