import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { InputBase, type InputBaseProps } from "../input-base";
import { TextareaAutosize } from "../textarea-autosize";

type TextareaProps = InputBaseProps<
  typeof TextareaAutosize,
  {
    children?: never;
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
