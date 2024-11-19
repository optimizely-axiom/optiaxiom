import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxGroup } from "../listbox-group";

type CommandGroupProps = ComponentPropsWithoutRef<typeof ListboxGroup>;

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  (props, ref) => <ListboxGroup ref={ref} {...props} />,
);

CommandGroup.displayName = "@optiaxiom/react/CommandGroup";
