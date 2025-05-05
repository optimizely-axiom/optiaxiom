import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { MenuContent } from "../menu";

export type SpotlightContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const SpotlightContent = forwardRef<
  HTMLDivElement,
  SpotlightContentProps
>((props, ref) => {
  return <MenuContent aria-label="Quick search" ref={ref} {...props} />;
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
