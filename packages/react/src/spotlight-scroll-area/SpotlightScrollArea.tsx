import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandScrollArea } from "../command-scroll-area";

type SpotlightScrollAreaProps = ComponentPropsWithoutRef<
  typeof CommandScrollArea
>;

export const SpotlightScrollArea = forwardRef<
  HTMLDivElement,
  SpotlightScrollAreaProps
>((props, ref) => <CommandScrollArea gap="xs" ref={ref} {...props} />);

SpotlightScrollArea.displayName = "@optiaxiom/react/SpotlightScrollArea";
