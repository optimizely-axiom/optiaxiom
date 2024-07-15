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
  ({ variant = "default", ...props }, ref) => {
    return (
      <InputBase asChild {...props}>
        <Box asChild {...styles.input({ variant })}>
          <input ref={ref} />
        </Box>
      </InputBase>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
