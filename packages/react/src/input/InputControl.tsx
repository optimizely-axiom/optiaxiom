import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createSlot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ChangeEvent, type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useFieldContext } from "../field/internals";
import { useSurface } from "../surface";
import { useDebouncedTrack } from "../surface/internals";
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
       * Whether to show the input error state. Automatically set when used
       * inside a Field component with an error prop.
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

/**
 * @group InputRoot
 */
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

    const surface = useSurface("property");
    const { track } = surface ?? {};
    const debouncedTrack = useDebouncedTrack(
      typeof props.value === "string" ? props.value : props.defaultValue,
    );

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
          onBlur={(event) => {
            restProps.onBlur?.(
              event as React.FocusEvent<HTMLInputElement> &
                React.FocusEvent<HTMLTextAreaElement>,
            );
            track?.({ name: "blurred" });
          }}
          onChange={(event) => {
            onChange?.(
              event as ChangeEvent<HTMLInputElement> &
                ChangeEvent<HTMLTextAreaElement>,
            );
            if (
              event.target instanceof HTMLInputElement ||
              event.target instanceof HTMLTextAreaElement
            ) {
              const newValue = event.target.value;
              onValueChange?.(newValue);

              debouncedTrack?.(newValue);
            }
          }}
          onFocus={(event) => {
            restProps.onFocus?.(
              event as React.FocusEvent<HTMLInputElement> &
                React.FocusEvent<HTMLTextAreaElement>,
            );
            track?.({ name: "focused" });
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
