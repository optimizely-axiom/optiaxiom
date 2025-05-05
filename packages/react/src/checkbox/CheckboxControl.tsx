import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { CheckboxCheck } from "../icons/CheckboxCheck";
import { IconMinus } from "../icons/IconMinus";
import { ToggleInputControl } from "../toggle-input";
import * as styles from "./CheckboxControl.css";

export type CheckboxControlProps = BoxProps<
  typeof ToggleInputControl,
  {
    /**
     * Display a partially checked icon instead of the regular checkmark.
     */
    indeterminate?: boolean;
    /**
     * Enable this when control has content beside it and needs to be sized
     * according to line-height.
     */
    shift?: boolean;
  }
>;

export const CheckboxControl = forwardRef<
  HTMLInputElement,
  CheckboxControlProps
>(({ className, indeterminate, shift, ...props }, ref) => {
  return (
    <ToggleInputControl
      ref={ref}
      {...styles.control({ shift }, className)}
      {...props}
    >
      <Box {...styles.indicator()}>
        <Box asChild {...styles.icon()}>
          {indeterminate ? <IconMinus /> : <CheckboxCheck />}
        </Box>
      </Box>
    </ToggleInputControl>
  );
});

CheckboxControl.displayName = "@optiaxiom/react/CheckboxControl";
