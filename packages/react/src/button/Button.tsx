import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  cloneElement,
  type ElementType,
  forwardRef,
  isValidElement,
  type ReactNode,
  useEffect,
} from "react";

import { ButtonBase, type ButtonBaseProps } from "../button-base";
import { ButtonLabel } from "../button-label";
import { ButtonLoadable } from "../button-loadable";
import { Icon } from "../icon";
import { type ExtendProps } from "../utils";

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

    let isIconOnly = Boolean(!children && icon);
    if (asChild) {
      const newElement = isValidElement(children) ? children : null;
      isIconOnly = Boolean(!newElement?.props.children && icon);
      children = newElement
        ? cloneElement(
            newElement,
            undefined,
            isIconOnly ? (
              <ButtonLoadable asChild>
                <Icon asChild>{icon}</Icon>
              </ButtonLoadable>
            ) : (
              <ButtonLabel>{newElement.props.children}</ButtonLabel>
            ),
          )
        : children;
    } else {
      children = isIconOnly ? (
        <ButtonLoadable asChild>
          <Icon asChild>{icon}</Icon>
        </ButtonLoadable>
      ) : (
        <ButtonLabel>{children}</ButtonLabel>
      );
    }
    if (icon && !isIconOnly) {
      if (iconPosition === "start") {
        addonBefore = <Icon asChild>{icon}</Icon>;
      } else if (iconPosition === "end") {
        addonAfter = <Icon asChild>{icon}</Icon>;
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
      <ButtonBase
        asChild
        iconOnly={isIconOnly || iconOnly}
        ref={ref}
        {...props}
        {...((isIconOnly || iconOnly) && { justifyContent: "center" })}
      >
        <Comp>
          {addonBefore && (
            <ButtonLoadable asChild>{addonBefore}</ButtonLoadable>
          )}

          <Slottable>{children}</Slottable>

          {addonAfter && <ButtonLoadable asChild>{addonAfter}</ButtonLoadable>}
        </Comp>
      </ButtonBase>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
