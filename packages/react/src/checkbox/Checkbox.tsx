import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { type BoxProps } from "../box";
import { CheckboxContent } from "../checkbox-content";
import { CheckboxControl } from "../checkbox-control";
import { CheckboxRoot } from "../checkbox-root";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";

type CheckboxProps = BoxProps<
  typeof ToggleInputHiddenInput,
  Pick<ComponentPropsWithoutRef<typeof CheckboxContent>, "description"> &
    Pick<ComponentPropsWithoutRef<typeof CheckboxControl>, "indeterminate">
>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, description, indeterminate, ...props }, ref) => {
    return (
      <CheckboxRoot description={!!description} ref={ref} {...props}>
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
