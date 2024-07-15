import { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Textarea.css";

type TextareaProps =
  | ({ resize: "auto" } & InputBaseProps<typeof TextareaAutosize>)
  | ({ resize: "none" | "vertical" } & InputBaseProps<"textarea">);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      endDecorator,
      error,
      resize = "none",
      size,
      startDecorator,
      style,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <InputBase
        asChild
        endDecorator={endDecorator}
        error={error}
        size={size}
        startDecorator={startDecorator}
        style={style}
        {...styles.wrapper({ resize }, className)}
        {...sprinkleProps}
      >
        <Box asChild {...styles.textarea({})}>
          {resize === "auto" ? (
            <TextareaAutosize minRows={3} ref={ref} {...restProps} />
          ) : (
            <textarea ref={ref} rows={3} {...restProps} />
          )}
        </Box>
      </InputBase>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
