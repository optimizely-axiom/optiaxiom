import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box } from "../box";
import { InputBase, type InputBaseProps } from "../input-base";
import * as styles from "./Input.css";

type InputProps = InputBaseProps<"input", NonNullable<styles.InputVariants>>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      addonAfter,
      addonBefore,
      appearance = "default",
      asChild,
      children,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";

    return (
      <InputBase
        addonAfter={
          addonAfter && (
            <Box {...styles.addon({ position: "end", size })}>{addonAfter}</Box>
          )
        }
        addonBefore={
          addonBefore && (
            <Box {...styles.addon({ position: "start", size })}>
              {addonBefore}
            </Box>
          )
        }
        size={size}
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
