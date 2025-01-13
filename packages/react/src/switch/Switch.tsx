import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { ToggleInput } from "../toggle-input";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputControl } from "../toggle-input-control";
import { ToggleInputDescription } from "../toggle-input-description";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";
import * as styles from "./Switch.css";

type SwitchProps = BoxProps<
  typeof ToggleInputHiddenInput,
  styles.SwitchVariants & {
    /**
     * Add helper text after the label.
     */
    description?: ReactNode;
  }
>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, className, description, size = "md", ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <ToggleInput
        description={!!description}
        {...styles.root({}, className)}
        {...boxProps}
      >
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
