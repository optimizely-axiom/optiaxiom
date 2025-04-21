import { type ComponentPropsWithoutRef } from "react";

import { Popover } from "../popover";

type MenuPopoverProps = ComponentPropsWithoutRef<typeof Popover>;

export function MenuPopover(props: MenuPopoverProps) {
  return <Popover modal {...props} />;
}

MenuPopover.displayName = "@optiaxiom/react/MenuPopover";
