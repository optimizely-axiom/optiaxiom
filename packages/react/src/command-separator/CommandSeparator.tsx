import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxSeparator } from "../listbox-separator";

type CommandSeparatorProps = ComponentPropsWithoutRef<typeof ListboxSeparator>;

export const CommandSeparator = forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>((props, ref) => <ListboxSeparator ref={ref} {...props} />);

CommandSeparator.displayName = "@optiaxiom/react/CommandSeparator";
