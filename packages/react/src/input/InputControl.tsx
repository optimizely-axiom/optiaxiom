import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createSlot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ChangeEvent, type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useFieldContext } from "../field/internals";
import { useInputContext } from "./InputContext";
import * as styles from "./InputControl.css";

const Slot = createSlot("@optiaxiom/react/InputControl");

export type InputControlProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    styles.ControlVariants & {
      /**
       * Whether the input is disabled.
       */
      disabled?: boolean;
      /**
       * Whether to show the input error state.
       */
      error?: boolean;
      /**
       * Handler that is called when the value changes.
       */
      onValueChange?: (value: string) => void;
    },
    P
  >
>;

export const InputControl = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputControlProps
>(
  (
    {
      asChild,
      children,
      className,
      error: errorProp,
      onChange,
      onValueChange,
      size = "md",
      ...props
    },
    outerRef,
  ) => {
    const Comp = (asChild ? Slot : "input") as typeof Slot;

    const disabled = props.disabled;
    const readOnly = props.readOnly;

    const { descriptionId, error, errorId, inputId } = useFieldContext(
      "@optiaxiom/react/InputControl",
    );
    const { boxProps, restProps } = extractBoxProps(props);

    const { inputRef } = useInputContext("@optiaxiom/react/InputControl");
    const ref = useComposedRefs(inputRef, outerRef);

    return (
      <Box
        aria-describedby={
          errorId || descriptionId ? clsx(errorId, descriptionId) : undefined
        }
        aria-disabled={disabled}
        aria-invalid={error || errorProp ? true : undefined}
        asChild
        data-disabled={disabled ? "" : undefined}
        data-invalid={error || errorProp ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...styles.control({ size }, className)}
        {...boxProps}
      >
        <Comp
          id={inputId}
          onChange={(event) => {
            onChange?.(
              event as ChangeEvent<HTMLInputElement> &
                ChangeEvent<HTMLTextAreaElement>,
            );
            if (
              event.target instanceof HTMLInputElement ||
              event.target instanceof HTMLTextAreaElement
            ) {
              onValueChange?.(event.target.value);
            }
          }}
          ref={ref}
          {...restProps}
        >
          {children}
        </Comp>
      </Box>
    );
  },
);

InputControl.displayName = "@optiaxiom/react/InputControl";
