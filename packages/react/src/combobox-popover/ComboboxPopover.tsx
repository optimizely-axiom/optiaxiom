import { type ComponentPropsWithoutRef } from "react";

import { Popover } from "../popover";

type ComboboxPopoverProps = ComponentPropsWithoutRef<typeof Popover>;

export function ComboboxPopover(props: ComboboxPopoverProps) {
  return <Popover modal {...props} />;
}
ComboboxPopover.displayName = "@optiaxiom/react/ComboboxPopover";
