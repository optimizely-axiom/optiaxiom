import { type ComponentPropsWithRef, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { InputBase } from "../input-base";
import * as styles from "./Textarea.css";

type TextareaProps = ExtendProps<
  ComponentPropsWithRef<typeof TextareaAutosize>,
  ComponentPropsWithRef<typeof InputBase>,
  NonNullable<styles.WrapperVariants>
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = "none", rows = 3, ...props }, ref) => {
    const Component = resize === "auto" ? TextareaAutosize : "textarea";

    return (
      <InputBase asChild {...styles.wrapper({ resize }, className)} {...props}>
        <Box asChild {...styles.textarea({})}>
          <Component ref={ref} rows={rows} />
        </Box>
      </InputBase>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
