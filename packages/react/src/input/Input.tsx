import { forwardRef } from "react";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import { fallbackSpan } from "../utils";
import * as styles from "./Input.css";

type InputProps = InputBaseProps<
  "input",
  {
    children?: never;
  } & styles.InputVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      appearance = "default",
      endDecorator,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
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
          <input ref={ref} />
        </Box>
      </InputBase>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
