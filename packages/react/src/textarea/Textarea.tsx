import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<"textarea">,
  ComponentPropsWithRef<typeof Box>,
  {
    bottomSection?: ReactNode;
    disabled?: boolean;
    error?: boolean;
    resize?: "auto" | "none" | "vertical";
    topSection?: ReactNode;
  }
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      bottomSection,
      className,
      disabled,
      error,
      placeholder,
      resize = "auto",
      rows,
      size,
      topSection,
      ...props
    },
    ref,
  ) => {
    const Component = resize !== "none" ? TextareaAutosize : "textarea";

    return (
      <Box
        aria-invalid={error}
        {...styles.wrapper()}
        data-disabled={disabled}
        {...props}
        style={{
          resize: resize !== "auto" ? "vertical" : "none",
        }}
      >
        {topSection && <Box>{topSection}</Box>}
        <Box asChild {...styles.textarea({}, String(className))}>
          <Box
            asChild
            style={{
              resize: "none",
            }}
          >
            <Component placeholder={placeholder} ref={ref}></Component>
          </Box>
        </Box>
        {bottomSection && <Box>{bottomSection}</Box>}
      </Box>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
