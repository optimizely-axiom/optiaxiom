import { Slot } from "@radix-ui/react-slot";
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
        rows?: never;
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
  ({ asChild, children, className, resize = "none", ...props }, ref) => {
    const CompAuto = asChild ? Slot : TextareaAutosize;
    const CompManual = asChild ? Slot : "textarea";

    return (
      <InputBase
        size="lg"
        {...styles.wrapper({ resize }, className)}
        {...props}
      >
        <Box asChild {...styles.textarea()}>
          {resize === "auto" ? (
            <CompAuto
              minRows={"minRows" in props ? props.minRows : 3}
              ref={ref}
            >
              {children}
            </CompAuto>
          ) : (
            <CompManual ref={ref} rows={"rows" in props ? props.rows : 3}>
              {children}
            </CompManual>
          )}
        </Box>
      </InputBase>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
