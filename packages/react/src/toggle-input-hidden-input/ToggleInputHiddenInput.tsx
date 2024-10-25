import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import * as styles from "./ToggleInputHiddenInput.css";

type ToggleInputHiddenInputProps = ExtendProps<
  ComponentPropsWithoutRef<"input">,
  {
    onCheckedChange?: (checked: boolean) => void;
    value?: string;
  }
>;

export const ToggleInputHiddenInput = forwardRef<
  HTMLInputElement,
  ToggleInputHiddenInputProps
>(({ className, onChange, onCheckedChange, ...props }, ref) => {
  return (
    <VisuallyHidden>
      <input
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
