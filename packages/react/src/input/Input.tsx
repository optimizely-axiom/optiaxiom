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
    isDisabled?: boolean;
    isInvalid?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  } & styles.WrapperVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      defaultValue,
      id,
      isDisabled,
      isInvalid,
      leftSection,
      placeholder,
      rightSection,
      size = "md",
      type,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box
        aria-disabled={isDisabled}
        aria-invalid={isInvalid}
        className={clsx(
          styles.wrapper({
            size,
            variant,
          }),
          className,
        )}
        data-disabled={isDisabled}
        data-invalid={isInvalid}
        {...sprinkleProps}
      >
        {leftSection && (
          <Box flex="none" mr="8">
            {leftSection}
          </Box>
        )}
        <Box
          asChild
          className={clsx(
            styles.input({
              variant,
            }),
          )}
        >
          <input
            defaultValue={defaultValue}
            id={id}
            placeholder={placeholder}
            readOnly={isDisabled}
            ref={ref}
            type={type}
            {...restProps}
          />
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
