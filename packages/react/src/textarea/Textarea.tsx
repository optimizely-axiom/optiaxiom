import { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import * as styles from "./Textarea.css";

type TextareaProps =
  | ({ resize: "auto" } & InputBaseProps<
      typeof TextareaAutosize,
      {
        children?: never;
        size?: never;
      }
    >)
  | ({ resize?: "none" | "vertical" } & InputBaseProps<
      "textarea",
      {
        children?: never;
        size?: never;
      }
    >);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = "none", ...props }, ref) => {
    return (
      <InputBase {...styles.wrapper({ resize }, className)} {...props}>
        <Box asChild {...styles.textarea()}>
          {resize === "auto" ? (
            <TextareaAutosize minRows={3} ref={ref} />
          ) : (
            <textarea ref={ref} rows={3} />
          )}
        </Box>
      </InputBase>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
