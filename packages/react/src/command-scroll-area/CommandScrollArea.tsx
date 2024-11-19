import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxScrollArea } from "../listbox-scroll-area";

type CommandScrollAreaProps = ComponentPropsWithoutRef<
  typeof ListboxScrollArea
>;

export const CommandScrollArea = forwardRef<
  HTMLDivElement,
  CommandScrollAreaProps
>((props, ref) => <ListboxScrollArea ref={ref} {...props} />);

CommandScrollArea.displayName = "@optiaxiom/react/CommandScrollArea";
