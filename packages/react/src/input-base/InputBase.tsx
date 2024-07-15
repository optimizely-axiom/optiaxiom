import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./InputBase.css";

type InputBaseProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  {
    disabled?: boolean;
    endDecorator?: ReactNode;
    error?: boolean;
    startDecorator?: ReactNode;
  } & styles.WrapperVariants
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
      <Box
        aria-disabled={disabled}
        aria-invalid={error}
        data-disabled={disabled}
        data-invalid={error}
        {...styles.wrapper({ size }, className)}
        {...sprinkleProps}
      >
        {startDecorator && (
          <Flex gap="0" mr="8">
            {startDecorator}
          </Flex>
        )}
        <Box asChild {...styles.input()}>
          <Comp id={id} readOnly={disabled} ref={ref} {...restProps} />
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

InputBase.displayName = "@optiaxiom/react/InputBase";
