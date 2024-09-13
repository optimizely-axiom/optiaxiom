import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import { fallbackSpan } from "../utils";
import * as styles from "./Input.css";

type InputProps = InputBaseProps<"input", NonNullable<styles.InputVariants>>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      endDecorator,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";

    return (
      <InputBase
        endDecorator={
          endDecorator && (
            <Box asChild {...styles.decorator({ position: "end", size })}>
              {fallbackSpan(endDecorator)}
            </Box>
          )
        }
        size={size}
        startDecorator={
          startDecorator && (
            <Box asChild {...styles.decorator({ position: "start", size })}>
              {fallbackSpan(startDecorator)}
            </Box>
          )
        }
        {...props}
      >
        <Box asChild {...styles.input({ appearance })}>
          <Comp ref={ref}>{children}</Comp>
        </Box>
      </InputBase>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
