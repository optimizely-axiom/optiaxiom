import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./Input.css";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  {
    disabled?: boolean;
    endDecorator?: ReactNode;
    error?: boolean;
    startDecorator?: ReactNode;
  } & styles.WrapperVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      endDecorator,
      error,
      id,
      size = "md",
      startDecorator,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box
        aria-disabled={disabled}
        aria-invalid={error}
        data-disabled={disabled}
        data-invalid={error}
        {...styles.wrapper({ size, variant }, className)}
        {...sprinkleProps}
      >
        {startDecorator && (
          <Flex gap="0" mr="8">
            {startDecorator}
          </Flex>
        )}
        <Box asChild {...styles.input({ variant })}>
          <input id={id} readOnly={disabled} ref={ref} {...restProps} />
        </Box>
        {endDecorator && (
          <Flex gap="0" ml="8">
            {endDecorator}
          </Flex>
        )}
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
