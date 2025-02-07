import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Box } from "../box";
import { useCardContext } from "../card-context";
import { Checkbox } from "../checkbox";
import { CheckboxControl } from "../checkbox-control";
import { CheckboxRoot } from "../checkbox-root";

type CardCheckboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Checkbox>,
  "description"
>;

export const CardCheckbox = forwardRef<HTMLInputElement, CardCheckboxProps>(
  ({ children, indeterminate, onChange, ...props }, ref) => {
    const labelPrefixId = useId();
    const { labelId } = useCardContext("CardCheckbox");

    const [checked, setChecked] = useControllableState({
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
