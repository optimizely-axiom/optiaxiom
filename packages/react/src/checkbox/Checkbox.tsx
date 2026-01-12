import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { type BoxProps } from "../box";
import { SuggestionPopover } from "../suggestion";
import { ToggleInputHiddenInput } from "../toggle-input";
import { CheckboxContent } from "./CheckboxContent";
import { CheckboxControl } from "./CheckboxControl";
import { CheckboxRoot } from "./CheckboxRoot";

export type CheckboxProps = BoxProps<
  typeof ToggleInputHiddenInput,
  Pick<ComponentPropsWithoutRef<typeof CheckboxContent>, "description"> &
    Pick<ComponentPropsWithoutRef<typeof CheckboxControl>, "indeterminate">
>;

/**
 * Basic control to allow selecting one or more items from a set.
 *
 * @since 0.1.0
 * @category form
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, description, indeterminate, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

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

        {props.checked !== undefined && (
          <SuggestionPopover style={{ marginTop: -2 }} />
        )}
      </CheckboxRoot>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
