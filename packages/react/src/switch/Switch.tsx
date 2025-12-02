import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import {
  ToggleInput,
  ToggleInputContent,
  ToggleInputControl,
  ToggleInputDescription,
  ToggleInputHiddenInput,
  ToggleInputLabel,
} from "../toggle-input";
import * as styles from "./Switch.css";

export type SwitchProps = BoxProps<
  typeof ToggleInputHiddenInput,
  styles.SwitchVariants & {
    /**
     * Add secondary text after the label.
     */
    description?: ReactNode;
  }
>;

/**
 * Control to allow toggling between checked and not checked state.
 *
 * @category form
 * @since 0.1.0
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, className, description, size = "md", ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <ToggleInput {...styles.root({}, className)} {...boxProps}>
        <ToggleInputHiddenInput
          ref={ref}
          role="switch"
          {...styles.input()}
          {...restProps}
        />

        <ToggleInputControl {...styles.control()}>
          <Box {...styles.thumb({ size })}></Box>
        </ToggleInputControl>

        {(children || description) && (
          <ToggleInputContent pt={size === "lg" ? "2" : "0"}>
            {children && <ToggleInputLabel>{children}</ToggleInputLabel>}

            {description && (
              <ToggleInputDescription>{description}</ToggleInputDescription>
            )}
          </ToggleInputContent>
        )}
      </ToggleInput>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
