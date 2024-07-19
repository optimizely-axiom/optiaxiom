import {
  type ElementType,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./InputBase.css";

export type InputBaseProps<
  T extends ElementType = "input" | "textarea",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      asChild?: never;
      children: ReactElement;
      endDecorator?: ReactNode;
      error?: boolean;
      startDecorator?: ReactNode;
    } & styles.InputVariants,
    P
  >
>;

export const InputBase = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputBaseProps
>(
  (
    {
      children,
      className,
      disabled,
      endDecorator,
      error,
      readOnly,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        data-disabled={disabled ? "" : undefined}
        data-invalid={error ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        {startDecorator}

        <Box
          aria-disabled={disabled}
          aria-invalid={error}
          asChild
          data-disabled={disabled ? "" : undefined}
          data-invalid={error ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          {...styles.input({ size })}
        >
          {cloneElement(children, { disabled, readOnly, ref, ...restProps })}
        </Box>

        {endDecorator}
      </Flex>
    );
  },
);

InputBase.displayName = "@optiaxiom/react/InputBase";
