import { forwardRef } from "react";

import type { ButtonProps } from "../button";

import { useComboboxContext } from "../combobox-context";
import { ComboboxMultiTrigger } from "../combobox-multi-trigger";
import { ComboboxSingleTrigger } from "../combobox-single-trigger";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ButtonProps<
  typeof PopoverTrigger,
  {
    maxDisplayedItems?: number;
    title?: string;
  }
>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, maxDisplayedItems = 2, title, ...props }, ref) => {
  const { mode } = useComboboxContext("Combobox");

  return (
    <PopoverTrigger asChild ref={ref}>
      {asChild ? (
        children
      ) : mode === "single" ? (
        <ComboboxSingleTrigger title={title} {...props} />
      ) : mode === "multiple" ? (
        <ComboboxMultiTrigger
          maxDisplayedItems={maxDisplayedItems}
          title={title}
          {...props}
        />
      ) : (
        children
      )}
    </PopoverTrigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";

export default ComboboxTrigger;
