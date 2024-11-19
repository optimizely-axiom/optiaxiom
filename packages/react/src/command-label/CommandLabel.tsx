import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxLabel } from "../listbox-label";

type CommandLabelProps = ComponentPropsWithoutRef<typeof ListboxLabel>;

export const CommandLabel = forwardRef<HTMLDivElement, CommandLabelProps>(
  (props, ref) => <ListboxLabel ref={ref} {...props} />,
);

CommandLabel.displayName = "@optiaxiom/react/CommandLabel";
