import { createSlot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { extractBoxProps } from "../box";
import { fallbackSpan } from "../utils";
import * as styles from "./Input.css";
import { InputAddon } from "./InputAddon";
import { InputControl, type InputControlProps } from "./InputControl";
import { InputRoot } from "./InputRoot";

const Slot = createSlot("@optiaxiom/react/Input");

export type InputProps = InputControlProps<
  "input",
  Pick<ComponentPropsWithoutRef<typeof InputRoot>, "addonPointerEvents"> &
    styles.InputVariants & {
      /**
       * Display content inside the input at the end.
       */
      addonAfter?: ReactNode;
      /**
       * Display content inside the input at the start.
       */
      addonBefore?: ReactNode;
      /**
       * Control the native input `size` attribute.
       */
      htmlSize?: number;
    }
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
      htmlSize,
      size = "md",
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <InputRoot
        addonPointerEvents={addonPointerEvents}
        style={style}
        {...styles.root({ size }, className)}
        {...boxProps}
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
          <Comp ref={ref} size={htmlSize}>
            {children}
          </Comp>
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
