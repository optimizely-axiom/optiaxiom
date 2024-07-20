import {
  type ElementType,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { useFieldContext } from "../field-context";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { type ExtendProps, fallbackSpan } from "../utils";
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
      error: errorProp,
      readOnly,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { error, id, required } = useFieldContext({ error: errorProp });
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex
        data-disabled={disabled ? "" : undefined}
        data-invalid={error ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        {startDecorator && <Text asChild>{fallbackSpan(startDecorator)}</Text>}

        <Box
          aria-disabled={disabled}
          aria-invalid={error}
          asChild
          data-disabled={disabled ? "" : undefined}
          data-invalid={error ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          {...styles.input({ size })}
        >
          {cloneElement(children, {
            disabled,
            id,
            readOnly,
            ref,
            required,
            ...restProps,
          })}
        </Box>

        {endDecorator && <Text asChild>{fallbackSpan(endDecorator)}</Text>}
      </Flex>
    );
  },
);

InputBase.displayName = "@optiaxiom/react/InputBase";
