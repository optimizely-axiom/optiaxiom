import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./Input.css";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  { isDisabled?: boolean; isInvalid?: boolean } & styles.InputVariants
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      isDisabled,
      isInvalid,
      placeholder,
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
        asChild
        className={clsx(
          styles.input({
            size,
            variant,
          }),
          className,
        )}
        data-disabled={isDisabled}
        data-invalid={isInvalid}
        {...sprinkleProps}
      >
        <input placeholder={placeholder} ref={ref} type={type} {...restProps} />
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
