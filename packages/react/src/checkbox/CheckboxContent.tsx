import { forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import {
  ToggleInputContent,
  ToggleInputDescription,
  ToggleInputHiddenInput,
  ToggleInputLabel,
} from "../toggle-input";

export type CheckboxContentProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    /**
     * Add secondary text after the label.
     */
    description?: ReactNode;
  }
>;

export const CheckboxContent = forwardRef<
  HTMLInputElement,
  CheckboxContentProps
>(({ children, description, ...props }, ref) => {
  return (
    <ToggleInputContent ref={ref} {...props}>
      {children && <ToggleInputLabel>{children}</ToggleInputLabel>}

      {description && (
        <ToggleInputDescription>{description}</ToggleInputDescription>
      )}
    </ToggleInputContent>
  );
});

CheckboxContent.displayName = "@optiaxiom/react/CheckboxContent";
