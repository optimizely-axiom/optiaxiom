import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxEmpty } from "../listbox-empty";

type CommandEmptyProps = ComponentPropsWithoutRef<typeof ListboxEmpty>;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  (props, ref) => <ListboxEmpty ref={ref} {...props} />,
);

CommandEmpty.displayName = "@optiaxiom/react/CommandEmpty";
