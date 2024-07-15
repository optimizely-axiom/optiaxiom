import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { InputBase } from "../input-base";
import { type ExtendProps } from "../utils";
import * as styles from "./Input.css";

type InputProps = ExtendProps<
  ComponentPropsWithRef<typeof InputBase>,
  NonNullable<styles.InputVariants>
>;

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
