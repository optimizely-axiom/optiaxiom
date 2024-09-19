import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { InputBase, type InputBaseProps } from "../input-base";
import { TextareaAutosize } from "../textarea-autosize";

type TextareaProps = InputBaseProps<
  typeof TextareaAutosize,
  {
    children?: never;
    /**
     * Limits the height of the textarea when `resize=auto` is used.
     */
    maxRows?: ComponentPropsWithRef<typeof TextareaAutosize>["maxRows"];
    resize?: ComponentPropsWithRef<typeof TextareaAutosize>["resize"];
    size?: never;
  }
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : TextareaAutosize;

    return (
      <InputBase flexDirection="column" size="lg" {...props}>
        <Comp ref={ref} rows={props.rows ?? 3}>
          {children}
        </Comp>
      </InputBase>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
