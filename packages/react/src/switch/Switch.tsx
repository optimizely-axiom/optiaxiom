import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { ToggleInput } from "../toggle-input";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputControl } from "../toggle-input-control";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";
import * as styles from "./Switch.css";

type SwitchProps = BoxProps<
  typeof ToggleInputHiddenInput,
  styles.SwitchVariants & {
    /**
     * Control whether to show the helper text before or after the switch.
     */
    labelPosition?: "end" | "start";
  }
>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { children, className, labelPosition = "end", size = "md", ...props },
    ref,
  ) => {
    const { boxProps, restProps } = extractBoxProps(props);

    const labelContent = children && (
      <ToggleInputContent pt={size === "lg" ? "2" : "0"}>
        <ToggleInputLabel>{children}</ToggleInputLabel>
      </ToggleInputContent>
    );

    return (
      <ToggleInput {...styles.root({}, className)} {...boxProps}>
        <ToggleInputHiddenInput
          ref={ref}
          role="switch"
          {...styles.input()}
          {...restProps}
        />

        {labelPosition === "start" && labelContent}

        <ToggleInputControl {...styles.control()}>
          <Box {...styles.thumb({ size })}></Box>
        </ToggleInputControl>

        {labelPosition === "end" && labelContent}
      </ToggleInput>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
