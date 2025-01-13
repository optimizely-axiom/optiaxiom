import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { CheckboxCheck } from "../icons/CheckboxCheck";
import { IconMinus } from "../icons/IconMinus";
import { ToggleInput } from "../toggle-input";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputControl } from "../toggle-input-control";
import { ToggleInputDescription } from "../toggle-input-description";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";
import * as styles from "./Checkbox.css";

type CheckboxProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    /**
     * Add helper text after the label.
     */
    description?: ReactNode;
    /**
     * Display a partially checked icon instead of the regular checkmark.
     */
    indeterminate?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, description, indeterminate, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <ToggleInput
        description={!!description}
        {...styles.checkbox({}, className)}
        {...boxProps}
      >
        <ToggleInputHiddenInput ref={ref} {...styles.input()} {...restProps} />

        <ToggleInputControl {...styles.control({ shift: Boolean(children) })}>
          <Box {...styles.indicator()}>
            <Box asChild {...styles.icon()}>
              {indeterminate ? <IconMinus /> : <CheckboxCheck />}
            </Box>
          </Box>
        </ToggleInputControl>

        {(children || description) && (
          <ToggleInputContent>
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

Checkbox.displayName = "@optiaxiom/react/Checkbox";
