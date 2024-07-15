import { forwardRef } from "react";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import * as styles from "./Input.css";

type InputProps = InputBaseProps<"input", NonNullable<styles.InputVariants>>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      endDecorator,
      size = "md",
      startDecorator,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <InputBase
        asChild
        endDecorator={
          endDecorator && (
            <Box asChild {...styles.decorator({ position: "end", size })}>
              {endDecorator}
            </Box>
          )
        }
        size={size}
        startDecorator={
          startDecorator && (
            <Box asChild {...styles.decorator({ position: "start", size })}>
              {startDecorator}
            </Box>
          )
        }
        {...props}
      >
        <Box asChild {...styles.input({ variant })}>
          <input ref={ref} />
        </Box>
      </InputBase>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
