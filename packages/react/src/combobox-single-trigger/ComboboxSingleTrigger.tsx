import { forwardRef } from "react";

import { type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { ComboboxTrigger } from "../combobox-trigger";
import { MenuButton } from "../menu-button";

type ComboboxSingleTriggerProps = ButtonProps<typeof ComboboxTrigger>;

export const ComboboxSingleTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxSingleTriggerProps
>(({ title, ...props }, ref) => {
  const { value } = useComboboxContext("Combobox");
  return (
    <ComboboxTrigger asChild ref={ref} {...props}>
      <MenuButton>{value || title}</MenuButton>
    </ComboboxTrigger>
  );
});

ComboboxSingleTrigger.displayName = "@optiaxiom/react/ComboboxSingleTrigger";
