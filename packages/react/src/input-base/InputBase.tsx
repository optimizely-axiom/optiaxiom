import { Slot } from "@radix-ui/react-slot";
import { type ElementType, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./InputBase.css";

export type InputBaseProps<
  T extends ElementType = "input",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      endDecorator?: ReactNode;
      error?: boolean;
      startDecorator?: ReactNode;
    } & styles.InputVariants,
    P
  >
>;

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      asChild,
      className,
      disabled,
      endDecorator,
      error,
      id,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        aria-disabled={disabled}
        aria-invalid={error}
        data-disabled={disabled ? "" : undefined}
        data-invalid={error ? "" : undefined}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        {startDecorator}

        <Box asChild {...styles.input({ size })}>
          <Comp id={id} readOnly={disabled} ref={ref} {...restProps} />
        </Box>

        {endDecorator}
      </Flex>
    );
  },
);

InputBase.displayName = "@optiaxiom/react/InputBase";
