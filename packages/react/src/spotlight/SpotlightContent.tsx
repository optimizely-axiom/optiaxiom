import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useMessages } from "../locale";
import { MenuContent } from "../menu";

export type SpotlightContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

/**
 * @group Spotlight
 */
export const SpotlightContent = forwardRef<
  HTMLDivElement,
  SpotlightContentProps
>((props, ref) => {
  const messages = useMessages();
  return (
    <MenuContent aria-label={messages["Quick search"]} ref={ref} {...props} />
  );
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
