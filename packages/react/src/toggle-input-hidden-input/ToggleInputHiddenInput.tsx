import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { useToggleInputContext } from "../toggle-input-context";
import * as styles from "./ToggleInputHiddenInput.css";

type ToggleInputHiddenInputProps = ExtendProps<
  ComponentPropsWithoutRef<"input">,
  {
    onCheckedChange?: (checked: boolean) => void;
  }
>;

export const ToggleInputHiddenInput = forwardRef<
  HTMLInputElement,
  ToggleInputHiddenInputProps
>(({ className, onChange, onCheckedChange, ...props }, ref) => {
  const { descriptionId, labelId } = useToggleInputContext(
    "ToggleInputHiddenInput",
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
