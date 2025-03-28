import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { DropdownMenuSubTrigger } from "../dropdown-menu-sub-trigger";

type MenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuSubTrigger
>;

export const DropdownMenuComboboxTrigger = forwardRef<
  HTMLDivElement,
  MenuSubTriggerProps
>((props, ref) => {
  return <DropdownMenuSubTrigger aria-haspopup="dialog" ref={ref} {...props} />;
});

DropdownMenuComboboxTrigger.displayName =
  "@optiaxiom/react/DropdownMenuComboboxTrigger";
