import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxFooter } from "../listbox-footer";

type CommandFooterProps = ComponentPropsWithoutRef<typeof ListboxFooter>;

export const CommandFooter = forwardRef<HTMLDivElement, CommandFooterProps>(
  (props, ref) => <ListboxFooter ref={ref} {...props} />,
);

CommandFooter.displayName = "@optiaxiom/react/CommandFooter";
