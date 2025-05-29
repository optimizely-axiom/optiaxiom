import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { type BoxProps } from "../box";
import { ToggleInputHiddenInput } from "../toggle-input";
import { CheckboxContent } from "./CheckboxContent";
import { CheckboxControl } from "./CheckboxControl";
import { CheckboxRoot } from "./CheckboxRoot";

export type CheckboxProps = BoxProps<
  typeof ToggleInputHiddenInput,
  Pick<ComponentPropsWithoutRef<typeof CheckboxContent>, "description"> &
    Pick<ComponentPropsWithoutRef<typeof CheckboxControl>, "indeterminate">
>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, description, indeterminate, ...props }, ref) => {
    return (
      <CheckboxRoot
        aria-checked={indeterminate ? "mixed" : undefined}
        ref={ref}
        {...props}
      >
        <CheckboxControl
          indeterminate={indeterminate}
          shift={Boolean(children)}
        />

        {(children || description) && (
          <CheckboxContent description={description}>
            {children}
          </CheckboxContent>
        )}
      </CheckboxRoot>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
