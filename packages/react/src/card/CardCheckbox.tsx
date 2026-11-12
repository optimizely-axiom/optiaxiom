import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { Checkbox } from "../checkbox";
import { useMessages } from "../locale";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./CardCheckbox.css";
import { useCardContext } from "./CardContext";

export type CardCheckboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof Checkbox>,
  "description"
>;

/**
 * Selects its card.
 *
 * Takes its accessible name from the `CardHeader` title, after the default
 * "Check to select" or "Check to unselect" message. Pass `aria-label` or
 * `aria-labelledby` to name it yourself.
 *
 * @extends Checkbox
 * @group Card
 */
export const CardCheckbox = forwardRef<HTMLInputElement, CardCheckboxProps>(
  ({ className, onChange, ...props }, ref) => {
    const labelPrefixId = useId();
    const messages = useMessages();
    const { labelId } = useCardContext("@optiaxiom/react/CardCheckbox");

    const [checked, setChecked] = useControllableState({
      caller: "@optiaxiom/react/CardCheckbox",
      defaultProp: props.defaultChecked,
      prop: props.checked,
    });

    return (
      <>
        {!props["aria-label"] && (
          <VisuallyHidden id={labelPrefixId}>
            {checked
              ? messages["Check to unselect"]
              : messages["Check to select"]}
          </VisuallyHidden>
        )}
        <Checkbox
          aria-labelledby={
            props["aria-label"] ? undefined : clsx(labelPrefixId, labelId)
          }
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
