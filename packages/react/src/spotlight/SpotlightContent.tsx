import { useHotkeys } from "@mantine/hooks";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useMessages } from "../locale";
import { MenuContent } from "../menu";
import { useMenuContext } from "../menu/internals";

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

  // Bound here, once per Spotlight, so any number of triggers (or none) share
  // the shortcut. This component stays rendered while the dialog is closed.
  const { open, setOpen } = useMenuContext("@optiaxiom/react/SpotlightContent");
  useHotkeys([["mod+K", () => setOpen(!open)]]);

  return (
    <MenuContent aria-label={messages["Quick search"]} ref={ref} {...props} />
  );
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
