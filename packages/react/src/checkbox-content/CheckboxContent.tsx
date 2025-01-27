import { forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputDescription } from "../toggle-input-description";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";

type CheckboxContentProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    /**
     * Add helper text after the label.
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
