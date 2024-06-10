import clsx from "clsx";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import { Box } from "../box";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./Input.css";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  {
    disabled?: boolean;
    error?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  } & styles.WrapperVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      error,
      id,
      leftSection,
      rightSection,
      size = "md",
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
        className={clsx(
          styles.wrapper({
            size,
            variant,
          }),
          className,
        )}
        data-disabled={disabled}
        data-invalid={error}
        {...sprinkleProps}
      >
        {leftSection && (
          <Box flex="none" mr="8">
            {leftSection}
          </Box>
        )}
        <Box
          asChild
          className={styles.input({
            variant,
          })}
        >
          <input id={id} readOnly={disabled} ref={ref} {...restProps} />
        </Box>
        {rightSection && (
          <Box flex="none" ml="8">
            {rightSection}
          </Box>
        )}
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
