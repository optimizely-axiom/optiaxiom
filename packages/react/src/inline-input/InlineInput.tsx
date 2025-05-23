import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
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

export const InlineInput = forwardRef<HTMLDivElement, InlineInputProps>(
  (
    {
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
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/InlineInput",
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: valueProp,
    });

    const editorRef = useRef<HTMLDivElement>(null);
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
      <Box ref={ref} {...styles.input({}, className)} {...props}>
        <Box
          aria-multiline={multiline}
          aria-readonly={disabled}
          contentEditable={!disabled && "plaintext-only"}
          data-placeholder={placeholder ?? label}
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
          ref={editorRef}
          role="textbox"
          spellCheck="true"
          {...(label && { "aria-label": label })}
          {...styles.editor({ empty: !value?.length })}
        />
      </Box>
    );
  },
);

InlineInput.displayName = "@optiaxiom/react/InlineInput";

function getText(element: HTMLElement) {
  const text = element.innerText;
  if (text.endsWith("\n")) {
    return text.slice(0, -1);
  }
  return text;
}
