import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import clsx from "clsx";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { useFieldContext } from "../field/internals";
import { useFieldLabelTrigger } from "../hooks";
import * as styles from "./InlineInput.css";

export type InlineInputProps = BoxProps<
  "div",
  {
    /**
     * The initial input value in uncontrolled mode.
     */
    defaultValue?: string;
    /**
     * Whether the input is disabled and in read only mode.
     */
    disabled?: boolean;
    /**
     * The label and placeholder of the input.
     */
    label: string;
    /**
     * Whether to allow multiple lines of text.
     */
    multiline?: boolean;
    /**
     * Handler that is called when the input value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Provide a custom placeholder instead of using the label when input has no value.
     */
    placeholder?: string;
    /**
     * The input value in controlled mode.
     */
    value?: string;
  }
>;

/**
 * Seamless textbox for capturing user input with completely customizable visual styles.
 *
 * @category form
 * @since 0.6.0
 * @experimental
 */
export const InlineInput = forwardRef<HTMLDivElement, InlineInputProps>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultValue = "",
      disabled,
      label,
      multiline,
      onValueChange,
      placeholder,
      value: valueProp,
      ...props
    },
    outerRef,
  ) => {
    const { ariaProps, restProps } = extractAriaProps(props);
    const { descriptionId, error, errorId, inputId } = useFieldContext(
      "@optiaxiom/react/InlineInput",
    );

    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/InlineInput",
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: valueProp,
    });

    const editorRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(editorRef, outerRef);
    const labelId = useFieldLabelTrigger(editorRef, ariaLabelledBy);
    useEffect(() => {
      if (!editorRef.current) {
        return;
      }

      const clippedValue =
        multiline || !value?.includes("\n")
          ? value
          : value?.slice(0, value.indexOf("\n"));
      if (getText(editorRef.current) !== clippedValue) {
        if (document.activeElement === editorRef.current) {
          const selection = window.getSelection();
          if (!selection) {
            return;
          }

          selection.getRangeAt(0).selectNodeContents(editorRef.current);
          document.execCommand("insertHTML", false, clippedValue);
        } else {
          editorRef.current.innerText = clippedValue ?? "null";
        }
      }
    }, [multiline, value]);

    return (
      <Box {...styles.input({}, className)} {...restProps}>
        <Box
          aria-describedby={
            errorId || descriptionId ? clsx(errorId, descriptionId) : undefined
          }
          aria-invalid={error ? true : undefined}
          aria-labelledby={labelId}
          aria-multiline={multiline}
          aria-readonly={disabled}
          contentEditable={!disabled && "plaintext-only"}
          data-placeholder={placeholder ?? label}
          id={inputId}
          onInput={(event) => {
            setValue(getText(event.currentTarget));
          }}
          onKeyDown={(event) => {
            if (!multiline && event.key === "Enter") {
              event.preventDefault();
            }
          }}
          onPaste={(event) => {
            const value = event.clipboardData.getData("text");
            if (!multiline && value.includes("\n")) {
              event.preventDefault();

              const clippedValue = value.slice(0, value.indexOf("\n"));
              document.execCommand("insertHTML", false, clippedValue);
              setValue(getText(event.currentTarget));
            }
          }}
          ref={ref}
          role="textbox"
          spellCheck="true"
          {...(label && { "aria-label": label })}
          {...styles.editor({ empty: !value?.length })}
          {...ariaProps}
        />
      </Box>
    );
  },
);

InlineInput.displayName = "@optiaxiom/react/InlineInput";

/**
 * Splits off `aria-*` props for the textbox. The rest stay on the wrapper,
 * where consumers' handlers and `data-*` have always landed.
 */
function extractAriaProps<P extends Record<string, unknown>>(props: P) {
  const ariaProps: Record<string, unknown> = {};
  const restProps: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(props)) {
    if (name.startsWith("aria-")) {
      ariaProps[name] = value;
    } else {
      restProps[name] = value;
    }
  }
  return { ariaProps, restProps: restProps as Omit<P, `aria-${string}`> };
}

function getText(element: HTMLElement) {
  const text = element.innerText;
  if (text.endsWith("\n")) {
    return text.slice(0, -1);
  }
  return text;
}
