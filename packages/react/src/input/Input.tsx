import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { InputAddon } from "../input-addon";
import { InputControl, type InputControlProps } from "../input-control";
import { InputRoot } from "../input-root";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./Input.css";

type InputProps = InputControlProps<
  "input",
  {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
  } & Pick<ComponentPropsWithoutRef<typeof InputRoot>, "addonPointerEvents"> &
    styles.InputVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      addonAfter,
      addonBefore,
      addonPointerEvents,
      appearance = "default",
      asChild,
      children,
      className,
      size = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <InputRoot
        addonPointerEvents={addonPointerEvents}
        style={style}
        {...styles.root({ size }, className)}
        {...sprinkleProps}
      >
        {addonBefore && (
          <InputAddon asChild {...styles.addon()}>
            {fallbackSpan(addonBefore)}
          </InputAddon>
        )}

        <InputControl
          asChild
          size={size}
          {...styles.input({ appearance, size })}
          {...restProps}
        >
          <Comp ref={ref}>{children}</Comp>
        </InputControl>

        {addonAfter && (
          <InputAddon asChild {...styles.addon()}>
            {fallbackSpan(addonAfter)}
          </InputAddon>
        )}
      </InputRoot>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
