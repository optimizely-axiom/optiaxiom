import { type ComponentPropsWithoutRef } from "react";

import { Popover } from "../popover";

export type MenuPopoverProps = ComponentPropsWithoutRef<typeof Popover>;

export function MenuPopover(props: MenuPopoverProps) {
  return <Popover {...props} />;
}

MenuPopover.displayName = "@optiaxiom/react/MenuPopover";
