import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { CheckboxCheck } from "../icons/CheckboxCheck";
import { IconMinus } from "../icons/IconMinus";
import { extractSprinkles } from "../sprinkles";
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
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <ToggleInput
        description={!!description}
        {...styles.checkbox({}, className)}
        {...sprinkleProps}
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
