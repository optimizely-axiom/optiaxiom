import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { VisuallyHidden } from "../visually-hidden";
import { useToggleInputContext } from "./ToggleInputContext";
import * as styles from "./ToggleInputHiddenInput.css";

export type ToggleInputHiddenInputProps = ExtendProps<
  ComponentPropsWithoutRef<"input">,
  {
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

  return (
    <VisuallyHidden>
      <input
        aria-describedby={descriptionId}
        aria-labelledby={labelId}
        className={clsx(className, styles.className)}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        ref={ref}
        type="checkbox"
        {...props}
      />
    </VisuallyHidden>
  );
});

ToggleInputHiddenInput.displayName = "@optiaxiom/react/ToggleInputHiddenInput";
