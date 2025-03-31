import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command-listbox";

type SpotlightListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const SpotlightListbox = forwardRef<
  HTMLDivElement,
  SpotlightListboxProps
>((props, ref) => <CommandListbox gap="8" ref={ref} {...props} />);

SpotlightListbox.displayName = "@optiaxiom/react/SpotlightListbox";
