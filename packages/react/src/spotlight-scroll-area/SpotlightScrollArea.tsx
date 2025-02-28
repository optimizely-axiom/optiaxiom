import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxScrollArea } from "../listbox-scroll-area";

type SpotlightScrollAreaProps = ComponentPropsWithoutRef<
  typeof ListboxScrollArea
>;

export const SpotlightScrollArea = forwardRef<
  HTMLDivElement,
  SpotlightScrollAreaProps
>((props, ref) => <ListboxScrollArea gap="8" ref={ref} {...props} />);

SpotlightScrollArea.displayName = "@optiaxiom/react/SpotlightScrollArea";
