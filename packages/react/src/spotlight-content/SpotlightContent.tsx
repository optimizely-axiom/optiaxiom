import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxContent } from "../combobox-content";

type SpotlightContentProps = ComponentPropsWithoutRef<typeof ComboboxContent>;

export const SpotlightContent = forwardRef<
  HTMLDivElement,
  SpotlightContentProps
>((props, ref) => {
  return <ComboboxContent aria-label="Quick search" ref={ref} {...props} />;
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
