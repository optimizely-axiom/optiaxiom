import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box } from "../box";
import { Checkbox } from "../checkbox";
import { CheckboxControl } from "../checkbox/CheckboxControl";
import { CheckboxRoot } from "../checkbox/CheckboxRoot";
import { VisuallyHidden } from "../visually-hidden";
import { useCardContext } from "./CardContext";

export type CardCheckboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Checkbox>,
  "description"
>;

export const CardCheckbox = forwardRef<HTMLInputElement, CardCheckboxProps>(
  ({ children, indeterminate, onChange, ...props }, ref) => {
    const labelPrefixId = useId();
    const { labelId } = useCardContext("@optiaxiom/react/CardCheckbox");

    const [checked, setChecked] = useControllableState({
      caller: "@optiaxiom/react/CardCheckbox",
      defaultProp: props.defaultChecked,
      prop: props.checked,
    });

    return (
      <CheckboxRoot
        aria-labelledby={clsx(labelPrefixId, labelId)}
        description={false}
        onChange={(event) => {
          onChange?.(event);
          setChecked(event.target.checked);
        }}
        ref={ref}
        {...props}
      >
        <CheckboxControl
          indeterminate={indeterminate}
          shift={Boolean(children)}
        />
        <VisuallyHidden>
          <Box id={labelPrefixId}>
            Check to {checked ? "unselect" : "select"}
          </Box>
        </VisuallyHidden>
      </CheckboxRoot>
    );
  },
);

CardCheckbox.displayName = "@optiaxiom/react/CardCheckbox";
