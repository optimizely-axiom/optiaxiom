import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Listbox } from "../listbox";

type SpotlightScrollAreaProps = ComponentPropsWithoutRef<typeof Listbox>;

export const SpotlightScrollArea = forwardRef<
  HTMLDivElement,
  SpotlightScrollAreaProps
>((props, ref) => <Listbox gap="8" ref={ref} {...props} />);

SpotlightScrollArea.displayName = "@optiaxiom/react/SpotlightScrollArea";
