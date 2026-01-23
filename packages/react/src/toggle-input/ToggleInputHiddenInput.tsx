import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { useSurface } from "../surface";
import { VisuallyHidden } from "../visually-hidden";
import { useToggleInputContext } from "./ToggleInputContext";
import * as styles from "./ToggleInputHiddenInput.css";

export type ToggleInputHiddenInputProps = ExtendProps<
  ComponentPropsWithoutRef<"input">,
  {
    /**
     * The name of the form control element.
     */
    name?: ComponentPropsWithoutRef<"input">["name"];
    /**
     * Handler that is called when the checked state changes.
     */
    onCheckedChange?: (checked: boolean) => void;
  }
>;

export const ToggleInputHiddenInput = forwardRef<
  HTMLInputElement,
  ToggleInputHiddenInputProps
>(({ className, onChange, onCheckedChange, ...props }, ref) => {
  const { descriptionId, labelId } = useToggleInputContext(
    "@optiaxiom/react/ToggleInputHiddenInput",
  );

  const surface = useSurface("property");
  const { track } = surface ?? {};

  return (
    <VisuallyHidden>
      <input
        aria-describedby={descriptionId}
        aria-labelledby={labelId}
        className={clsx(className, styles.className)}
        onChange={(event) => {
          const checked = event.target.checked;
          onChange?.(event);
          onCheckedChange?.(checked);

          track?.({
            checked,
            name: "toggled",
          });
        }}
        ref={ref}
        type="checkbox"
        {...props}
      />
    </VisuallyHidden>
  );
});

ToggleInputHiddenInput.displayName = "@optiaxiom/react/ToggleInputHiddenInput";
