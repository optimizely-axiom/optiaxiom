import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Checkbox } from "../checkbox";
import { CheckboxContent } from "../checkbox-content";
import { CheckboxControl } from "../checkbox-control";
import { CheckboxRoot } from "../checkbox-root";
import * as styles from "./CardCheckbox.css";

type CardCheckboxProps = ComponentPropsWithoutRef<typeof Checkbox>;

export const CardCheckbox = forwardRef<HTMLInputElement, CardCheckboxProps>(
  ({ children, className, description, indeterminate, ...props }, ref) => {
    return (
      <CheckboxRoot
        description={!!description}
        ref={ref}
        {...styles.root({}, className)}
        {...props}
      >
        <CheckboxControl
          indeterminate={indeterminate}
          shift={Boolean(children)}
          {...styles.control({}, className)}
        />
        <CheckboxContent description={description}>{children}</CheckboxContent>
      </CheckboxRoot>
    );
  },
);

CardCheckbox.displayName = "@optiaxiom/react/CardCheckbox";
