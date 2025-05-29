import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Checkbox } from "../checkbox";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./CardCheckbox.css";
import { useCardContext } from "./CardContext";

export type CardCheckboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Checkbox>,
  "description"
>;

export const CardCheckbox = forwardRef<HTMLInputElement, CardCheckboxProps>(
  ({ className, onChange, ...props }, ref) => {
    const labelPrefixId = useId();
    const { labelId } = useCardContext("@optiaxiom/react/CardCheckbox");

    const [checked, setChecked] = useControllableState({
      caller: "@optiaxiom/react/CardCheckbox",
      defaultProp: props.defaultChecked,
      prop: props.checked,
    });

    return (
      <>
        <VisuallyHidden id={labelPrefixId}>
          Check to {checked ? "unselect" : "select"}
        </VisuallyHidden>
        <Checkbox
          aria-labelledby={clsx(labelPrefixId, labelId)}
          onChange={(event) => {
            onChange?.(event);
            setChecked(event.target.checked);
          }}
          ref={ref}
          {...styles.checkbox({}, className)}
          {...props}
        />
      </>
    );
  },
);

CardCheckbox.displayName = "@optiaxiom/react/CardCheckbox";
