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
    /**
     * Control the size of the label and description.
     */
    size?: "md" | "sm";
  }
>;

export const CheckboxContent = forwardRef<
  HTMLInputElement,
  CheckboxContentProps
>(({ children, description, size = "md", ...props }, ref) => {
  return (
    <ToggleInputContent fontSize={size} ref={ref} {...props}>
      {children && (
        <ToggleInputLabel fontWeight={size === "sm" ? "400" : "500"}>
          {children}
        </ToggleInputLabel>
      )}

      {description && (
        <ToggleInputDescription>{description}</ToggleInputDescription>
      )}
    </ToggleInputContent>
  );
});

CheckboxContent.displayName = "@optiaxiom/react/CheckboxContent";
