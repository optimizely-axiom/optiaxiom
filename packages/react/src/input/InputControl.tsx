import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createSlot } from "@radix-ui/react-slot";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import clsx from "clsx";
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useFieldContext } from "../field/internals";
import { useTimeout } from "../hooks";
import { useSurface } from "../surface";
import { useDebouncedTrack } from "../surface/internals";
import { useInputContext } from "./InputContext";
import * as styles from "./InputControl.css";

const Slot = createSlot("@optiaxiom/react/InputControl");

const countableTypes = new Set([
  "email",
  "password",
  "search",
  "tel",
  "text",
  "url",
]);

export type InputControlProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    styles.ControlVariants & {
      /**
       * The initial value of the input, when uncontrolled.
       */
      defaultValue?: ComponentPropsWithoutRef<
        "input" | "textarea"
      >["defaultValue"];
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
       * The maximum number of characters allowed in a text input or textarea.
       * Wrap it in a `Field` with `showCount` to show the character count.
       */
      maxLength?: ComponentPropsWithoutRef<"input" | "textarea">["maxLength"];
      /**
       * The name of the form control element.
       */
      name?: ComponentPropsWithoutRef<"input" | "textarea">["name"];
      /**
       * Handler that is called when the value changes.
       */
      onValueChange?: (value: string) => void;
      /**
       * The placeholder text to use when control has no value.
       */
      placeholder?: ComponentPropsWithoutRef<
        "input" | "textarea"
      >["placeholder"];
      /**
       * Whether selecting this input is required.
       */
      required?: ComponentPropsWithoutRef<"input" | "textarea">["required"];
      /**
       * The value of the input. Use with `onValueChange` to control it.
       */
      value?: ComponentPropsWithoutRef<"input" | "textarea">["value"];
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

    const { countId, descriptionId, error, errorId, inputId, onCountChange } =
      useFieldContext("@optiaxiom/react/InputControl");
    const { boxProps, restProps } = extractBoxProps(props);

    const { inputRef } = useInputContext("@optiaxiom/react/InputControl");
    const ref = useComposedRefs(inputRef, outerRef);

    // Browsers ignore `maxLength` on other input types.
    const { type } = restProps as ComponentPropsWithoutRef<"input">;
    const maxLength =
      type === undefined || countableTypes.has(type)
        ? restProps.maxLength
        : undefined;
    const controlled = props.value !== undefined;
    const { clear, start } = useTimeout();
    useLayoutEffect(() => {
      const input = inputRef.current;
      if (!input || !onCountChange || maxLength === undefined) {
        return;
      }

      const sync = () =>
        onCountChange({ length: input.value.length, maxLength });
      sync();

      // `reset` fires before the form restores the values.
      const onReset = () => start(sync);
      const form = input.form;
      form?.addEventListener("reset", onReset);
      return () => {
        clear();
        form?.removeEventListener("reset", onReset);
        onCountChange(undefined);
      };
    }, [clear, inputRef, maxLength, onCountChange, start]);
    useLayoutEffect(() => {
      if (controlled && maxLength !== undefined) {
        onCountChange?.({
          length: inputRef.current?.value.length ?? 0,
          maxLength,
        });
      }
    }, [controlled, inputRef, maxLength, onCountChange, props.value]);

    const surface = useSurface("property");
    const { track } = surface ?? {};
    const debouncedTrack = useDebouncedTrack(
      "property",
      typeof props.value === "string" ? props.value : props.defaultValue,
    );

    return (
      <Box
        aria-describedby={
          errorId || descriptionId || (countId && maxLength !== undefined)
            ? clsx(errorId, descriptionId, maxLength !== undefined && countId)
            : undefined
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
              // A controlled parent may reject the change, so its count
              // follows `value` instead.
              if (!controlled && maxLength !== undefined) {
                onCountChange?.({ length: newValue.length, maxLength });
              }

              if (!surface?.manualSuggestion) {
                debouncedTrack?.(newValue);
              }
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
