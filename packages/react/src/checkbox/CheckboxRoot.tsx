import { forwardRef } from "react";

import { type BoxProps, extractBoxProps } from "../box";
import { ToggleInput, ToggleInputHiddenInput } from "../toggle-input";

export type CheckboxRootProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    description?: boolean;
  }
>;

export const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxRootProps>(
  ({ children, description, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <ToggleInput description={!!description} {...boxProps}>
        <ToggleInputHiddenInput ref={ref} {...restProps} />

        {children}
      </ToggleInput>
    );
  },
);

CheckboxRoot.displayName = "@optiaxiom/react/CheckboxRoot";
